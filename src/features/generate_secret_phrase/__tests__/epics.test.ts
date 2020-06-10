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
import { generateSecretPhraseEpic, generateSecretPhraseSuccessfulEpic } from '../epics';
import { generateSecretPhrase } from '../../../utils/generateSecretPhrase';
import { generateSecretPhraseAction, generateSecretPhraseSuccessful } from '../actions';
import { Actions } from 'react-native-router-flux';

describe('generate secret phrase epic', () => {
  const action: ActionsObservable<any> = ActionsObservable.of(generateSecretPhraseAction());
  const state = new StateObservable(new Subject(), {});
  it('should be successful', async done => {
    generateSecretPhraseEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('GENERATE_SECRET_PHRASE_SUCCESSFUL');
      expect(res.payload).not.toBeUndefined();
      done();
    });
  });

  it('should be failed if the secret phrase is invalid', async done => {
    const mockedUnHappypath = jest.fn();
    (generateSecretPhrase as jest.Mock) = mockedUnHappypath;
    mockedUnHappypath.mockReturnValue(undefined);
    generateSecretPhraseEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('GENERATE_SECRET_PHRASE_FAILED');
      done();
    });
  });
});

describe('generate secret phrase successful epic', () => {
  const action: ActionsObservable<any> = ActionsObservable.of(
    generateSecretPhraseSuccessful('fake phrase'),
  );
  const state = new StateObservable(new Subject(), {});
  it('should call generateSecretPhrase action and return an action with empty type', async done => {
    let isGenerateSecretPhraseCalled = false;
    (Actions.generateSecretPhrase as jest.Mock) = jest.fn().mockImplementation(() => {
      isGenerateSecretPhraseCalled = true;
    });
    generateSecretPhraseSuccessfulEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('empty');
      expect(isGenerateSecretPhraseCalled).toBe(true);
      done();
    });
  });
});
