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
import { LOGOUT, LogoutActionTypes, LOGOUT_SUCCESS, LOGOUT_FAILED } from './types';
import { RootState } from '../../store/rootReducer';
import { switchMap, throttleTime } from 'rxjs/operators';
import { cleanAccountPhrase } from '../../utils/keychainHelper';
import * as actions from '../../utils/routerActionHelper';

export const logoutEpic: Epic<LogoutActionTypes, any, RootState> = action$ =>
  action$.pipe(
    ofType(LOGOUT),
    throttleTime(500),
    switchMap(async () => {
      const res = await cleanAccountPhrase();
      // Logout failed
      if (!res) {
        return {
          type: LOGOUT_FAILED,
        };
      }

      actions.navigateTo('landing');

      return {
        type: LOGOUT_SUCCESS,
      };
    }),
  );

export default [logoutEpic];
