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

import { IAction } from '../../store/rootActions';

export const GENERATE_SECRET_PHRASE = 'GENERATE_SECRET_PHRASE';
export const GENERATE_SECRET_PHRASE_SUCCESSFUL = 'GENERATE_SECRET_PHRASE_SUCCESSFUL';
export const GENERATE_SECRET_PHRASE_FAILED = 'GENERATE_SECRET_PHRASE_FAILED';
export const UPDATE_SECRET_PHRASE = 'UPDATE_SECRET_PHRASE';
export const RESET_SECRET_PHRASE = 'RESET_SECRET_PHRASE';

export interface IResetSecretPhrase extends IAction {
  type: typeof RESET_SECRET_PHRASE;
}

export interface IUpdateSecretPhrase extends IAction {
  type: typeof UPDATE_SECRET_PHRASE;
  payload: string;
}

export interface IGenerateSecretPhrase extends IAction {
  type: typeof GENERATE_SECRET_PHRASE;
}

export interface IGenerateSecretPhraseSuccessful extends IAction {
  type: typeof GENERATE_SECRET_PHRASE_SUCCESSFUL;
  payload: string;
}

export interface IGenerateSecretPhraseFailed extends IAction {
  type: typeof GENERATE_SECRET_PHRASE_FAILED;
}

export type GenerateSecretPhraseActionTypes =
  | IResetSecretPhrase
  | IUpdateSecretPhrase
  | IGenerateSecretPhrase
  | IGenerateSecretPhraseSuccessful
  | IGenerateSecretPhraseFailed;
