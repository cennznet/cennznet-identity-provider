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
import { switchMap } from 'rxjs/operators';
import { RootState } from '../../store/rootReducer';
import { Actions } from 'react-native-router-flux';
import { RESET_SECRET_PHRASE } from '../generate_secret_phrase/types';
import { ISecretPhrasePageBackAction, SECRET_PHRASE_GO_BACK } from './types';

export const secretPhraseGoBackEpic: Epic<ISecretPhrasePageBackAction, any, RootState> = action$ =>
  action$.pipe(
    ofType(SECRET_PHRASE_GO_BACK),
    switchMap(async () => {
      Actions.pop();

      return {
        type: RESET_SECRET_PHRASE,
      };
    }),
  );

export default [secretPhraseGoBackEpic];
