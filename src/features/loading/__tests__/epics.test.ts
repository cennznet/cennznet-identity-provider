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
import { accountPhraseLoading } from '../actions';
import { phraseLoadingEpic } from '../epics';
import { getAccountPhrase } from '../../../utils/keychainHelper';
import { Actions } from 'react-native-router-flux';
import { createKeyring } from '../../../utils/createKeyring';
import { createWallet } from '../../../utils/createWallet';

describe('loading saved secret phrase epic', () => {
  const action: ActionsObservable<any> = ActionsObservable.of(accountPhraseLoading());
  const state = new StateObservable(new Subject(), {});

  beforeEach(() => {
    (createKeyring as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return {
        keyring: 'mocked keyring',
        address: 'mocked address',
      };
    });
    (createWallet as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return {};
    });
  });
  it('should go to qr scanner if has saved phrase', async done => {
    let isGoToHomePage: boolean = false;
    const mockGetAccountPhrase = jest.fn();
    (getAccountPhrase as jest.Mock) = mockGetAccountPhrase;
    mockGetAccountPhrase.mockReturnValue('saved phrase');
    (Actions.navigator as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      isGoToHomePage = true;
    });
    phraseLoadingEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('IMPORT_ACCOUNT_SUCCESS');
      expect(res.payload).not.toBeUndefined();
      expect(isGoToHomePage).toBe(true);
      done();
    });
  });

  it('should go to landing screen if no saved phrase', async done => {
    let isGoToLandingCalled: boolean = false;
    const mockGetAccountPhrase = jest.fn();
    (getAccountPhrase as jest.Mock) = mockGetAccountPhrase;
    mockGetAccountPhrase.mockReturnValue(undefined);
    (Actions.landing as jest.Mock) = jest.fn().mockImplementation(() => {
      isGoToLandingCalled = true;
    });
    phraseLoadingEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('empty');
      expect(isGoToLandingCalled).toBe(true);
      done();
    });
  });
});
