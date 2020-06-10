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

import * as Sentry from '@sentry/react-native';
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { setI18nConfig } from './i18n/i18n-setup';
import store from './store/store';
import Theme from './features/theme/index';

// Sentry.init({
//   dsn: 'your.sentry.dsn.link',
//   environment: 'prod',
//   beforeSend(event) {
//     return __DEV__ ? null : event;
//   },
// });

YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps is deprecated',
  'Setting a timer',
  'Unknown signed extensions',
  'Unknown types found',
]);
setI18nConfig();

export default class App extends Component {
  public render() {
    return (
      <StoreProvider store={store}>
        <Theme />
      </StoreProvider>
    );
  }
}
