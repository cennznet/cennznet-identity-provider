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
import {
  IShowSeedPhrasePageAction,
  SHOW_SEED_PHRASE_PAGE,
  INavSeedPhrasePageAction,
} from './types';
import { getAccountPhrase } from '../../utils/keychainHelper';
import * as actions from '../../utils/routerActionHelper';
import { UPDATE_SECRET_PHRASE } from '../generate_secret_phrase/types';

export const showSeedPhrasePageEpic: Epic<IShowSeedPhrasePageAction, any, RootState> = action$ =>
  action$.pipe(
    ofType(SHOW_SEED_PHRASE_PAGE),
    switchMap(async () => {
      const phrase = await getAccountPhrase();

      return {
        type: UPDATE_SECRET_PHRASE,
        payload: phrase,
      };
    }),
  );

export const navSeedPhrasePageEpic: Epic<INavSeedPhrasePageAction, any, RootState> = action$ =>
  action$.pipe(
    ofType(UPDATE_SECRET_PHRASE),
    switchMap(async () => {
      actions.navigateTo('secretPhrase');

      return {
        type: 'empty',
      };
    }),
  );

export default [showSeedPhrasePageEpic, navSeedPhrasePageEpic];
