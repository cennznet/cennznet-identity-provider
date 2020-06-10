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

import {
  AccountImportActionTypes,
  IMPORT_ACCOUNT_BY_PHRASE,
  UPDATE_IMPORT_ACCOUNT_STATUS,
  ImportAccountStatus,
} from './types';

export function importAccountByPhrase(phrase: string): AccountImportActionTypes {
  return {
    type: IMPORT_ACCOUNT_BY_PHRASE,
    payload: {
      phrase,
    },
  };
}

export function updateImportAccountStatus(status: ImportAccountStatus): AccountImportActionTypes {
  return {
    type: UPDATE_IMPORT_ACCOUNT_STATUS,
    payload: {
      importAccountStatus: status,
    },
  };
}
