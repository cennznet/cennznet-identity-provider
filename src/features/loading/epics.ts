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
import { AccountLoadingActionTypes, LOADING_ACCOUNT_PHRASE } from './types';
import { RootState } from '../../store/rootReducer';
import { switchMap } from 'rxjs/operators';
import { getAccountPhrase } from '../../utils/keychainHelper';
import { Actions } from 'react-native-router-flux';
import { IMPORT_ACCOUNT_SUCCESS } from '../account_import/types';
import { createKeyring } from '../../utils/createKeyring';
import { formatAccountPhrase } from '../../utils/accountFormat';
import { createWallet } from '../../utils/createWallet';

export const phraseLoadingEpic: Epic<AccountLoadingActionTypes, any, RootState> = action$ =>
  action$.pipe(
    ofType(LOADING_ACCOUNT_PHRASE),
    switchMap(async () => {
      const phrase = await getAccountPhrase();
      // No phrase stored in keychain
      if (!phrase) {
        Actions.landing();
        return {
          type: 'empty',
        };
      }

      // Initialise keyring and wallet
      const { keyring, address } = await createKeyring(formatAccountPhrase(phrase));
      const wallet = await createWallet(keyring);

      Actions.navigator();

      return {
        type: IMPORT_ACCOUNT_SUCCESS,
        payload: {
          address,
          keyring,
          wallet,
        },
      };
    }),
  );

export default [phraseLoadingEpic];
