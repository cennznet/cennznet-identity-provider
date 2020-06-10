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

import { sendSubstrateTxRequestEpic, updateApiEpic, chainEpic } from '../epics';
import { Subject } from 'rxjs';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Api } from '@cennznet/api';
import { sendSubstrateTx, SEND_SUBSTRATE_TX } from '../actions';
import {
  ISubstrateTxDetail,
  TransactionStatus,
} from '../../../transaction_confirmation_dialog/types';
import { KeyringPair } from '@polkadot/keyring/types';
import { getKeyringPair } from '../../../../utils/keyringPairHelper';

describe('Sending transaction epics test', () => {
  it('if TX Request failed, return SEND_SUBSTRATE_TX.FAIL', async done => {
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/REQUEST',
      payload: null,
    });

    const state = new StateObservable(new Subject(), {
      api: {
        api: 'not null',
      },
      accountImport: {
        wallet: 'not null',
      },
    });

    Api.create = jest.fn().mockImplementation(() => {});
    expect((Api.create as any).mock.calls.length).toBe(0);
    sendSubstrateTxRequestEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toBe('SEND_SUBSTRATE_TX/FAIL');
      done();
    });
  });

  it('should update API if isInitApi is true', async done => {
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/SUCCESS',
      payload: {
        isInitApi: true,
      },
    });

    const state = new StateObservable(new Subject(), {});

    updateApiEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toBe('UPDATE_API');
      done();
    });
  });

  it('should return empty action if isInitApi is false', async done => {
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/SUCCESS',
      payload: {
        isInitApi: false,
      },
    });

    const state = new StateObservable(new Subject(), {});

    updateApiEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toBe('empty');
      done();
    });
  });

  it('should emit SEND_SUBSTRATE_TX.SUCCESS end if transaction success', async done => {
    const assetID = 'assetID';
    const receiverAddress = 'receiverAddress';
    const amount = 'amount';
    const address = 'address';
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/REQUEST',
      payload: {
        assetID,
        receiverAddress,
        amount,
      },
    });

    const txSuccessCbReturn = {
      events: [
        {
          phase: {
            ApplyExtrinsic: 'not null',
          },
          event: {
            index: '0x0000',
          },
        },
      ],
      status: {
        isFinalized: true,
        toString: () => 'status toString() return',
      },
    };
    const state = new StateObservable(new Subject(), {
      api: {
        api: {
          tx: {
            genericAsset: {
              transfer: (_assetID: any, _receiverAddress: any, _amount: any) => {
                if (
                  _assetID !== assetID ||
                  _receiverAddress !== receiverAddress ||
                  _amount !== amount
                )
                  throw new Error(
                    "(api as Api).tx.genericAsset.transfer didn't get correct arguments",
                  );
                return {
                  signAndSend: (_keypair: KeyringPair, callBack: any) => {
                    callBack(txSuccessCbReturn);
                  },
                };
              },
            },
          },
        },
      },
      accountImport: {
        address,
      },
    });
    (getKeyringPair as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return { address: '' };
    });

    sendSubstrateTxRequestEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toBe('SEND_SUBSTRATE_TX/SUCCESS');
      expect(res.payload.isInitApi).toBe(false);
      done();
    });
  });

  it('should emit SEND_SUBSTRATE_TX.FAIL end if transaction return status is invalid', async done => {
    const assetID = 'assetID';
    const receiverAddress = 'receiverAddress';
    const amount = 'amount';
    const address = 'address';
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/REQUEST',
      payload: {
        assetID,
        receiverAddress,
        amount,
      },
    });

    const txSuccessCbReturn = {
      events: [
        {
          phase: {
            ApplyExtrinsic: 'not null',
          },
          event: {
            index: '0x0000',
          },
        },
      ],
      status: {
        isFinalized: false,
        isInvalid: true,
        toString: () => 'status toString() return',
      },
    };
    const state = new StateObservable(new Subject(), {
      api: {
        api: {
          tx: {
            genericAsset: {
              transfer: (_assetID: any, _receiverAddress: any, _amount: any) => {
                if (
                  _assetID !== assetID ||
                  _receiverAddress !== receiverAddress ||
                  _amount !== amount
                )
                  throw new Error(
                    "(api as Api).tx.genericAsset.transfer didn't get correct arguments",
                  );
                return {
                  signAndSend: (_keypair: KeyringPair, callBack: any) => {
                    callBack(txSuccessCbReturn);
                  },
                };
              },
            },
          },
        },
      },
      accountImport: {
        address,
      },
    });
    (getKeyringPair as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return { address: '' };
    });

    sendSubstrateTxRequestEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toBe('SEND_SUBSTRATE_TX/FAIL');
      done();
    });
  });

  it('should emit SEND_SUBSTRATE_TX.FAIL end if transaction return status toString is future', async done => {
    const assetID = 'assetID';
    const receiverAddress = 'receiverAddress';
    const amount = 'amount';
    const address = 'address';
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/REQUEST',
      payload: {
        assetID,
        receiverAddress,
        amount,
      },
    });

    const txSuccessCbReturn = {
      events: [
        {
          phase: {
            ApplyExtrinsic: 'not null',
          },
          event: {
            index: '0x0000',
          },
        },
      ],
      status: {
        isFinalized: false,
        isInvalid: false,
        toString: () => 'Future',
      },
    };
    const state = new StateObservable(new Subject(), {
      api: {
        api: {
          tx: {
            genericAsset: {
              transfer: (_assetID: any, _receiverAddress: any, _amount: any) => {
                if (
                  _assetID !== assetID ||
                  _receiverAddress !== receiverAddress ||
                  _amount !== amount
                )
                  throw new Error(
                    "(api as Api).tx.genericAsset.transfer didn't get correct arguments",
                  );
                return {
                  signAndSend: (_keypair: KeyringPair, callBack: any) => {
                    callBack(txSuccessCbReturn);
                  },
                };
              },
            },
          },
        },
      },
      accountImport: {
        address,
      },
    });
    (getKeyringPair as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return { address: '' };
    });
    sendSubstrateTxRequestEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toBe('SEND_SUBSTRATE_TX/FAIL');
      done();
    });
  });

  it('should emit SEND_SUBSTRATE_TX.FAIL end if keyringPair is undefined', async done => {
    const assetID = 'assetID';
    const receiverAddress = 'receiverAddress';
    const amount = 'amount';
    const address = 'address';
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/REQUEST',
      payload: {
        assetID,
        receiverAddress,
        amount,
      },
    });

    const txSuccessCbReturn = {
      events: [
        {
          phase: {
            ApplyExtrinsic: 'not null',
          },
          event: {
            index: '0x0000',
          },
        },
      ],
      status: {
        isFinalized: false,
        isInvalid: false,
        toString: () => 'Future',
      },
    };
    const state = new StateObservable(new Subject(), {
      api: {
        api: {
          tx: {
            genericAsset: {
              transfer: (_assetID: any, _receiverAddress: any, _amount: any) => {
                if (
                  _assetID !== assetID ||
                  _receiverAddress !== receiverAddress ||
                  _amount !== amount
                )
                  throw new Error(
                    "(api as Api).tx.genericAsset.transfer didn't get correct arguments",
                  );
                return {
                  signAndSend: (_keypair: KeyringPair, callBack: any) => {
                    callBack(txSuccessCbReturn);
                  },
                };
              },
            },
          },
        },
      },
      accountImport: {
        address,
      },
    });
    (getKeyringPair as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return undefined;
    });
    sendSubstrateTxRequestEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toBe('SEND_SUBSTRATE_TX/FAIL');
      done();
    });
  });

  it('should emit SEND_SUBSTRATE_TX.FAIL end if api is null and wallet is null', async done => {
    const assetID = 'assetID';
    const receiverAddress = 'receiverAddress';
    const amount = 'amount';
    const address = 'address';
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: 'SEND_SUBSTRATE_TX/REQUEST',
      payload: {
        assetID,
        receiverAddress,
        amount,
      },
    });

    const state = new StateObservable(new Subject(), {
      api: {
        api: null,
      },
      accountImport: {
        address,
        wallet: null,
      },
    });
    sendSubstrateTxRequestEpic(action, state as any, jest.fn()).subscribe(
      res => {},
      err => {
        expect(err.message === 'no wallet');
        done();
      },
    );
  });
});

describe('transaction send chain epics test', () => {
  it('should update transaction status to processing when sending tx requested', async done => {
    const action: ActionsObservable<any> = ActionsObservable.of(
      sendSubstrateTx({} as ISubstrateTxDetail),
    );
    const state = new StateObservable(new Subject(), {});
    chainEpic[0](action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('UPDATE_TRANSACTION_STATUS');
      expect(res.payload).toEqual(TransactionStatus.Processing);
      done();
    });
  });

  it('should update transaction status to success when sending tx is successful', async done => {
    const action: ActionsObservable<any> = ActionsObservable.of({
      type: SEND_SUBSTRATE_TX.SUCCESS,
    });
    const state = new StateObservable(new Subject(), {});
    chainEpic[1](action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('UPDATE_TRANSACTION_STATUS');
      expect(res.payload).toEqual(TransactionStatus.Success);
      done();
    });
  });

  it('should update transaction status to fail when sending tx is failed', async done => {
    const action: ActionsObservable<any> = ActionsObservable.of({ type: SEND_SUBSTRATE_TX.FAIL });
    const state = new StateObservable(new Subject(), {});
    chainEpic[2](action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('UPDATE_TRANSACTION_STATUS');
      expect(res.payload).toEqual(TransactionStatus.Fail);
      done();
    });
  });
});
