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

import { combineReducers } from 'redux';
import { accountImportReducer } from '../features/account_import/reducer';
import { qrScannerReducer } from '../features/qr_scanner/reducer';
import { txConfirmationReducer } from '../features/transaction_confirmation_dialog/reducer';
import { apiReducer } from '../features/api/reducer';
import { secretPhraseReducer } from '../features/generate_secret_phrase/reducer';
import { confirmNewPhraseReducer } from '../features/confirm_seed_phrase/reducer';
import { IAction } from './rootActions';
import { LOGOUT_SUCCESS } from '../features/logout/types';
import { themeReducer } from '../features/theme/reducer';

export const appReducer = combineReducers({
  accountImport: accountImportReducer,
  qrScanner: qrScannerReducer,
  txConfirmation: txConfirmationReducer,
  api: apiReducer,
  secretPhraseGenerator: secretPhraseReducer,
  confirmNewPhrase: confirmNewPhraseReducer,
  theme: themeReducer,
});

export const rootReducer = (state: any, action: IAction) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
