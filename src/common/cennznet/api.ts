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
import { ReplaySubject } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';

// TODO: put this in settings file.
const CENNZ_WS_URL = 'wss://rimu.unfrastructure.io/public/ws';

const apiSubject$: ReplaySubject<Api> = new ReplaySubject(1);
const connectedSubject$ = new ReplaySubject(1);

const createApi = () => {
  connectedSubject$.next(false);

  const options = { provider: CENNZ_WS_URL };
  Api.create(options).then(api => {
    apiSubject$.next(api);

    connectedSubject$.next(true);

    api.on('connected', () => {
      connectedSubject$.next(true);
    });

    api.on('disconnected', () => {
      connectedSubject$.next(false);
    });
  });
};

const api$ = apiSubject$.pipe(switchMap(api => api.isReady));
const connected$ = connectedSubject$.pipe(distinctUntilChanged());

export { createApi, connected$ };

export default api$;
