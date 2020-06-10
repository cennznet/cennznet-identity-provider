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
import { switchMap, throttleTime } from 'rxjs/operators';

import { RootState } from '../../store/rootReducer';
import {
  IMPORT_ACCOUNT_BY_PHRASE,
  IImportAccountByPhraseAction,
  ImportAccountStatus,
  UPDATE_IMPORT_ACCOUNT_STATUS,
  IMPORT_ACCOUNT_SUCCESS,
} from './types';
import { createKeyring } from '../../utils/createKeyring';
import { createWallet } from '../../utils/createWallet';
import { formatAccountPhrase } from '../../utils/accountFormat';
import { saveAccountPhrase, cleanAccountPhrase } from '../../utils/keychainHelper';
import * as actions from '../../utils/routerActionHelper';

export const importAccountFromPhraseEpic: Epic<
  IImportAccountByPhraseAction,
  any,
  RootState
> = action$ =>
  action$.pipe(
    ofType(IMPORT_ACCOUNT_BY_PHRASE),
    throttleTime(1000),
    switchMap(async ({ payload }) => {
      const { phrase } = payload;

      try {
        await saveAccountPhrase(phrase);
        const { keyring, address } = await createKeyring(formatAccountPhrase(phrase));
        const wallet = await createWallet(keyring);

        actions.navigateTo('navigator');

        return {
          type: IMPORT_ACCOUNT_SUCCESS,
          payload: {
            address,
            keyring,
            wallet,
          },
        };
      } catch (err) {
        await cleanAccountPhrase();
        return {
          type: UPDATE_IMPORT_ACCOUNT_STATUS,
          payload: {
            importAccountStatus: ImportAccountStatus.Fail,
          },
        };
      }
    }),
  );

export default [importAccountFromPhraseEpic];
