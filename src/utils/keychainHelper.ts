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

import * as Keychain from 'react-native-keychain';
import { async } from 'rxjs/internal/scheduler/async';
import * as Sentry from '@sentry/react-native';

export const saveAccountPhrase = async (accountPhrase: string, userName = 'CIP_Account_Phrase') => {
  try {
    const res = await Keychain.setGenericPassword(userName, accountPhrase);
    return res;
  } catch (e) {
    // Sentry.captureException(new Error(`Saving account phrase failed, error is ${e.message}`));
    return false;
  }
};

export const getAccountPhrase = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (!credentials) {
      return undefined;
    }
    return credentials.password;
  } catch (e) {
    // Sentry.captureException(new Error(`Fetching account phrase failed, error is ${e.message}`));
    return undefined;
  }
};

export const cleanAccountPhrase = async () => {
  try {
    const res = await Keychain.resetGenericPassword();
    return res;
  } catch (e) {
    // Sentry.captureException(new Error(`Cleaning account phrase failed, error is ${e.message}`));
    return false;
  }
};
