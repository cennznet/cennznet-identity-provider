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

import { Wallet, SimpleKeyring } from '@plugnet/wallet';
import {
  AccountImportActionTypes,
  IMPORT_ACCOUNT_SUCCESS,
  ImportAccountStatus,
  UPDATE_IMPORT_ACCOUNT_STATUS,
  IMPORT_ACCOUNT_BY_PHRASE,
} from './types';

export interface IAccountImportState {
  wallet: Wallet | null;
  keyring: SimpleKeyring | null;
  address: string;
  importAccountStatus: ImportAccountStatus;
}

const initialState: IAccountImportState = {
  wallet: null,
  keyring: null,
  address: '',
  importAccountStatus: ImportAccountStatus.Wait,
};

export function accountImportReducer(
  state = initialState,
  action: AccountImportActionTypes,
): IAccountImportState {
  switch (action.type) {
    case IMPORT_ACCOUNT_SUCCESS:
      return {
        ...state,
        address: action.payload.address,
        keyring: action.payload.keyring,
        wallet: action.payload.wallet,
        importAccountStatus: ImportAccountStatus.Success,
      };
    case UPDATE_IMPORT_ACCOUNT_STATUS:
      return {
        ...state,
        importAccountStatus: action.payload.importAccountStatus,
      };
    case IMPORT_ACCOUNT_BY_PHRASE:
      return {
        ...state,
        importAccountStatus: ImportAccountStatus.Processing,
      };

    default:
      return state;
  }
}
