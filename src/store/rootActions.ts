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

import { AccountImportActionTypes } from '../features/account_import/types';
import { QRScannerActionTypes } from '../features/qr_scanner/types';
import { TxConfirmationActionTypes } from '../features/transaction_confirmation_dialog/types';
import { AccountLoadingActionTypes } from '../features/loading/types';
import { GenerateSecretPhraseActionTypes } from '../features/generate_secret_phrase/types';
import { SecretPhraseActionTypes } from '../features/secret_phrase/types';
import { ProfileActionTypes } from '../features/profile/types';
import { Action } from 'redux';

export interface IAction extends Action {
  type: string;
  payload?: any;
}

export type RootAction =
  | ProfileActionTypes
  | SecretPhraseActionTypes
  | AccountImportActionTypes
  | QRScannerActionTypes
  | TxConfirmationActionTypes
  | AccountLoadingActionTypes
  | GenerateSecretPhraseActionTypes;