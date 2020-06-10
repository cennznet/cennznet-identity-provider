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

import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject } from 'rxjs';
import { importAccountFromPhraseEpic } from '../epics';
import { importAccountByPhrase } from '../actions';
import { saveAccountPhrase, cleanAccountPhrase } from '../../../utils/keychainHelper';
import { createWallet } from '../../../utils/createWallet';
import { Actions } from 'react-native-router-flux';

describe('account import epic', () => {
  const action: ActionsObservable<any> = ActionsObservable.of(
    importAccountByPhrase(
      'material atom need hood execute nerve chapter voice scout sure jacket security',
    ),
  );
  const state = new StateObservable(new Subject(), {});
  it('it will be successful if all async functions pass with no errors', async done => {
    (saveAccountPhrase as jest.Mock) = jest.fn();
    (cleanAccountPhrase as jest.Mock) = jest.fn();
    (createWallet as jest.Mock) = jest.fn();
    (Actions.navigator as jest.Mock) = jest.fn();

    importAccountFromPhraseEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('IMPORT_ACCOUNT_SUCCESS');
      done();
    });
  });

  it('it will fail if async function throw an error', async done => {
    (saveAccountPhrase as jest.Mock) = jest.fn().mockImplementation(() => {
      throw new Error('expected error message');
    });

    importAccountFromPhraseEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('UPDATE_IMPORT_ACCOUNT_STATUS');
      done();
    });
  });
});
