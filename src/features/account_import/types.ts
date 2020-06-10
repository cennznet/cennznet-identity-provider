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

import { SimpleKeyring, Wallet } from '@plugnet/wallet';
import { IAction } from '../../store/rootActions';

export enum ImportAccountStatus {
  Fail,
  Wait,
  Processing,
  Success,
}

// message type
export const IMPORT_ACCOUNT_BY_PHRASE = 'IMPORT_ACCOUNT_BY_PHRASE';
export const REPLACE_KEYRING = 'REPLACE_KEYRING';
export const IMPORT_ACCOUNT_SUCCESS = 'IMPORT_ACCOUNT_SUCCESS';
export const UPDATE_IMPORT_ACCOUNT_STATUS = 'UPDATE_IMPORT_ACCOUNT_STATUS';

// action type
export interface IUpdateImportAccountStatusAction extends IAction {
  type: typeof UPDATE_IMPORT_ACCOUNT_STATUS;
  payload: {
    importAccountStatus: ImportAccountStatus;
  };
}

export interface IImportAccountByPhraseAction extends IAction {
  type: typeof IMPORT_ACCOUNT_BY_PHRASE;
  payload: {
    phrase: string;
  };
}

export interface IImportAccountSuccessAction extends IAction {
  type: typeof IMPORT_ACCOUNT_SUCCESS;
  payload: {
    address: string;
    keyring: SimpleKeyring;
    wallet: Wallet;
  };
}

export type AccountImportActionTypes =
  | IImportAccountByPhraseAction
  | IUpdateImportAccountStatusAction
  | IImportAccountSuccessAction;
