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
  GenerateSecretPhraseActionTypes,
  GENERATE_SECRET_PHRASE_SUCCESSFUL,
  UPDATE_SECRET_PHRASE,
  RESET_SECRET_PHRASE,
} from './types';
import { formatSecretPhraseToDisplay } from '../../utils/generateSecretPhrase';

export interface ISecretPhraseState {
  secretPhrase: string;
  secretPhraseForDisplay: string[];
}

const initialState: ISecretPhraseState = {
  secretPhrase: '',
  secretPhraseForDisplay: [],
};

export function secretPhraseReducer(
  state = initialState,
  action: GenerateSecretPhraseActionTypes,
): ISecretPhraseState {
  switch (action.type) {
    case GENERATE_SECRET_PHRASE_SUCCESSFUL:
      return {
        ...state,
        secretPhrase: action.payload,
        secretPhraseForDisplay: formatSecretPhraseToDisplay(action.payload),
      };
    case UPDATE_SECRET_PHRASE:
      return {
        ...state,
        secretPhrase: action.payload,
        secretPhraseForDisplay: formatSecretPhraseToDisplay(action.payload),
      };
    case RESET_SECRET_PHRASE:
      return {
        ...state,
        secretPhrase: '',
        secretPhraseForDisplay: [],
      };
    default:
      return state;
  }
}
