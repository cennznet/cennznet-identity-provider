/* Copyright 2019-2020 Centrality Investments Limited
 *
 * Licensed under the LGPL, Version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * You may obtain a copy of the License at the root of this project source code,
 * or at:
 *     https://centrality.ai/licenses/gplv3.txt
 *     https://centrality.ai/licenses/lgplv3.txt
 */

import { Epic, ofType } from 'redux-observable';
import { switchMap, withLatestFrom, throttleTime } from 'rxjs/operators';

import { SEND_SUBSTRATE_TX } from './actions';
import {
  ISendSubstrateTx,
  ISendSubstrateTxSuccess,
  UPDATE_TRANSACTION_STATUS,
  TransactionStatus,
} from '../../transaction_confirmation_dialog/types';
import { RootState } from '../../../store/rootReducer';
import { Api } from '@cennznet/api';
import { UPDATE_API } from '../../api/actions';
import { chainEpics } from '../../../utils/epicHelper';
import { getKeyringPair } from '../../../utils/keyringPairHelper';

const API_PROVIDER_URL = 'wss://nikau.centrality.me/public/ws';
const TIMEOUT = 1000 * 60;
const API_INIT_TIMEOUT = 1000 * 60 * 60;

export const chainEpic = chainEpics([
  {
    from: SEND_SUBSTRATE_TX.REQUEST,
    to: UPDATE_TRANSACTION_STATUS,
    transform: (payload: any) => {
      return TransactionStatus.Processing;
    },
  },
  {
    from: SEND_SUBSTRATE_TX.SUCCESS,
    to: UPDATE_TRANSACTION_STATUS,
    transform: (payload: any) => {
      return TransactionStatus.Success;
    },
  },
  {
    from: SEND_SUBSTRATE_TX.FAIL,
    to: UPDATE_TRANSACTION_STATUS,
    transform: (payload: any) => {
      return TransactionStatus.Fail;
    },
  },
]);

export const sendSubstrateTxRequestEpic: Epic<ISendSubstrateTx, any, RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType(SEND_SUBSTRATE_TX.REQUEST),
    throttleTime(1000),
    withLatestFrom(state$),
    switchMap(async ([{ payload }, state]) => {
      let api = state.api.api;
      let isInitApi = false;

      if (api === null) {
        if (state.accountImport.wallet === null) {
          throw new Error('no wallet');
        }

        api = await Api.create({ provider: API_PROVIDER_URL, timeout: API_INIT_TIMEOUT });
        const wallet = state.accountImport.wallet;
        api.setSigner(wallet);
        isInitApi = true;
      }
      const keyringPair = await getKeyringPair();
      if (!keyringPair) {
        return {
          type: SEND_SUBSTRATE_TX.FAIL,
        };
      }
      let timeoutID: any;
      try {
        await new Promise((resolve, reject) => {
          timeoutID = setTimeout(() => {
            reject(new Error('Send Timeout'));
          }, TIMEOUT);

          (api as Api).tx.genericAsset
            .transfer(payload.assetID, payload.receiverAddress, payload.amount)
            // @ts-ignore
            .signAndSend(keyringPair, async ({ events, status }: any) => {
              if (status.isFinalized) {
                events = JSON.parse(JSON.stringify(events));
                for (const event of events) {
                  if (
                    event.phase &&
                    (event.phase as any).ApplyExtrinsic &&
                    (event.event.index as any) === '0x0000'
                  ) {
                    resolve();
                  }
                }
                reject(new Error(`Transaction is finalized but fail`));
              } else if (status.isInvalid) {
                reject(new Error(`Invalid transaction`));
              } else if (status.toString() === 'Future') {
                reject(new Error(`Nonce is too high`));
              }
            })
            .catch(async err => {
              reject(err);
            });
        });

        clearTimeout(timeoutID);

        return {
          type: SEND_SUBSTRATE_TX.SUCCESS,
          payload: {
            isInitApi,
            api,
          },
        };
      } catch (err) {
        clearTimeout(timeoutID);
        return {
          type: SEND_SUBSTRATE_TX.FAIL,
        };
      }
    }),
  );

export const updateApiEpic: Epic<ISendSubstrateTxSuccess, any, RootState> = (action$, state$) =>
  action$.pipe(
    ofType(SEND_SUBSTRATE_TX.SUCCESS),
    switchMap(async ({ payload }) => {
      if (payload.isInitApi) {
        return {
          type: UPDATE_API,
          payload: {
            api: payload.api,
          },
        };
      }
      return {
        type: 'empty',
      };
    }),
  );

export default [...chainEpic, sendSubstrateTxRequestEpic, updateApiEpic];
