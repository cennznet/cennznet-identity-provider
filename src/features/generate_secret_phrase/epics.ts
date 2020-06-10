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

import {
  IGenerateSecretPhrase,
  GENERATE_SECRET_PHRASE,
  GENERATE_SECRET_PHRASE_SUCCESSFUL,
  IGenerateSecretPhraseSuccessful,
} from './types';
import { Epic, ofType } from 'redux-observable';
import { RootState } from '../../store/rootReducer';
import { switchMap, throttleTime } from 'rxjs/operators';
import { generateSecretPhraseSuccessful, generateSecretPhraseFailed } from './actions';
import { generateSecretPhrase } from '../../utils/generateSecretPhrase';
import * as actions from '../../utils/routerActionHelper';

export const generateSecretPhraseEpic: Epic<IGenerateSecretPhrase, any, RootState> = action$ =>
  action$.pipe(
    ofType(GENERATE_SECRET_PHRASE),
    throttleTime(500),
    switchMap(async () => {
      const secretPhrase = generateSecretPhrase();
      if (!secretPhrase) {
        return generateSecretPhraseFailed();
      }

      return generateSecretPhraseSuccessful(secretPhrase);
    }),
  );

export const generateSecretPhraseSuccessfulEpic: Epic<
  IGenerateSecretPhraseSuccessful,
  any,
  RootState
> = action$ =>
  action$.pipe(
    ofType(GENERATE_SECRET_PHRASE_SUCCESSFUL),
    switchMap(async () => {
      actions.navigateTo('generateSecretPhrase');
      return {
        type: 'empty',
      };
    }),
  );

export default [generateSecretPhraseEpic, generateSecretPhraseSuccessfulEpic];
