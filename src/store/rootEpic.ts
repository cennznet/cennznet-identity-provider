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

import { combineEpics } from 'redux-observable';
import importAccountFromPhraseEpic from '../features/account_import/epics';
import sendTransactionSubstrateEpic from '../features/transaction_send/substrate/epics';
import txConfirmationEpic from '../features/transaction_confirmation_dialog/epics';
import accountLoadingEpic from '../features/loading/epics';
import logoutEpic from '../features/logout/epics';
import generateSecretPhraseEpics from '../features/generate_secret_phrase/epics';
import confirmNewPhraseEpics from '../features/confirm_seed_phrase/epics';
import profileEpics from '../features/profile/epics';
import secretPhraseEpics from '../features/secret_phrase/epics';

export default combineEpics<any>(
  ...importAccountFromPhraseEpic,
  ...sendTransactionSubstrateEpic,
  ...txConfirmationEpic,
  ...accountLoadingEpic,
  ...logoutEpic,
  ...generateSecretPhraseEpics,
  ...confirmNewPhraseEpics,
  ...profileEpics,
  ...secretPhraseEpics,
);
