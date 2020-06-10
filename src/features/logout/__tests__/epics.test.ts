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
import { cleanAccountPhrase } from '../../../utils/keychainHelper';
import { Actions } from 'react-native-router-flux';
import { logout } from '../actions';
import { logoutEpic } from '../epics';
import * as actions from '../../../utils/routerActionHelper';

describe('logout epic', () => {
  const action: ActionsObservable<any> = ActionsObservable.of(logout());
  const state = new StateObservable(new Subject(), {});
  it('should return logout failed if clean saved phrase failed', async done => {
    const mockGetAccountPhrase = jest.fn();
    (cleanAccountPhrase as jest.Mock) = mockGetAccountPhrase;
    mockGetAccountPhrase.mockReturnValue(false);
    logoutEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('LOGOUT_FAILED');
      done();
    });
  });

  it('should go to landing screen if no saved phrase', async done => {
    let isNavigationResetCalled: boolean = false;
    const mockGetAccountPhrase = jest.fn();
    (cleanAccountPhrase as jest.Mock) = mockGetAccountPhrase;
    mockGetAccountPhrase.mockReturnValue(true);
    (actions.navigateTo as jest.Mock) = jest.fn().mockImplementation(() => {
      isNavigationResetCalled = true;
    });
    logoutEpic(action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('LOGOUT_SUCCESS');
      expect(isNavigationResetCalled).toBe(true);
      done();
    });
  });
});
