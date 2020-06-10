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

import { Api } from '@cennznet/api';
import { UPDATE_API } from './actions';
import { ApiActions } from './types';

export interface IApiState {
  api: Api | null;
}

const initialState: IApiState = {
  api: null,
};

export function apiReducer(state = initialState, action: ApiActions): IApiState {
  switch (action.type) {
    case UPDATE_API:
      return {
        ...state,
        api: action.payload.api,
      };
    default:
      return state;
  }
}