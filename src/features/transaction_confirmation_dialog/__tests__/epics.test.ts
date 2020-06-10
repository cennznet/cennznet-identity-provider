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
import { closeTxConfirmationDialog } from '../actions';
import { chainEpic } from '../epics';

describe('transaction confirmation dialog epic test', () => {
  const action: ActionsObservable<any> = ActionsObservable.of(closeTxConfirmationDialog());
  const state = new StateObservable(new Subject(), {});
  it('should return logout failed if clean saved phrase failed', async done => {
    chainEpic[0](action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('START_TO_SCAN');
      done();
    });
  });
});
