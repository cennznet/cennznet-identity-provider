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

import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { defaultTheme } from '../../../common/themes/default';
describe('Home - layout test', () => {
  let localizeCallCount = 0;

  beforeEach(async () => {
    localizeCallCount = 0;
    (String.prototype as any).localized = () => {
      localizeCallCount++;
      return 'localized text';
    };
  });

  it('will localize all text', () => {
    expect(localizeCallCount).toBe(0);
    const props = {
      theme: defaultTheme,
    };
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(localizeCallCount).toBeGreaterThan(0);
  });

  it('should contain a icon in the layout', () => {
    const props = {
      theme: defaultTheme,
    };
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.find(Icon).first()).not.toBeUndefined();
  });
});
