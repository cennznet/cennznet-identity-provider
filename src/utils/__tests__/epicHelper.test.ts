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
import { chainEpics } from '../epicHelper';

describe('epic helper test', () => {
  const action: ActionsObservable<any> = ActionsObservable.of({ type: 'fromAction' });
  const state = new StateObservable(new Subject(), {});
  it('should call toAction if fromAction is triggered', async done => {
    const chainEpic = chainEpics([{ from: 'fromAction', to: 'toAction' }]);
    chainEpic[0](action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('toAction');
      done();
    });
  });

  it('should call toAction with payload if fromAction is triggered', async done => {
    const chainEpic = chainEpics([
      {
        from: 'fromAction',
        to: 'toAction',
        transform: (payload: any) => {
          return true;
        },
      },
    ]);
    chainEpic[0](action, state as any, jest.fn()).subscribe(res => {
      expect(res.type).toEqual('toAction');
      expect(res.payload).toBe(true);
      done();
    });
  });
});
