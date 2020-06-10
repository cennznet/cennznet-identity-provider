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

import { DefaultTheme } from 'react-native-paper';

export const colors = {
  primary: '#F04E50',
  error: '#F04E50',
  secondary: '#254B5A',
  tertiary: '#5DA6A7',
  placeholder: 'rgba(0,0,0,0.38)',
  text: 'rgba(0,0,0,0.87)',
  button: {
    textColor: {
      unActive: 'rgba(0,0,0,0.38)',
    },
    backgroundColor: {
      unActive: 'rgba(0,0,0,0.12)',
    },
  },
  bottomNavigator: {
    backgroud: '#ffffff',
  },
};

export const testTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    placeholder: colors.placeholder,
  },
};
