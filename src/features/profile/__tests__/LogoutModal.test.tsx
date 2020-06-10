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
import { Button } from 'react-native-paper';
import { defaultTheme } from '../../../common/themes/default';
import { LogoutModal } from '../LogoutModal/LogoutModal';

describe('Logout confirm modal test', () => {
  let localizeCallCount = 0;

  beforeEach(async () => {
    localizeCallCount = 0;
    (String.prototype as any).localized = () => {
      localizeCallCount++;
      return 'localized text';
    };
  });

  it('will localize all text', () => {
    const props = {
      isShow: true,
      closeDialog: () => ({}),
      logout: () => {},
      theme: defaultTheme,
    };
    expect(localizeCallCount).toBe(0);
    const wrapper = shallow(<LogoutModal {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(localizeCallCount).toBeGreaterThan(0);
  });

  it('should close the dialog if press close button', () => {
    let isCloseBtnPressed: boolean = false;
    const props = {
      isShow: true,
      closeDialog: () => {
        isCloseBtnPressed = true;
      },
      logout: () => {},
      theme: defaultTheme,
    };
    const wrapper = shallow(<LogoutModal {...props} />);
    const closeBtn = wrapper
      .find(Button)
      .first()
      .props();
    // @ts-ignore
    closeBtn.onPress();
    expect(isCloseBtnPressed).toBe(true);
  });

  it('should logout if press logout button', () => {
    let isLogoutBtnPressed: boolean = false;
    const props = {
      isShow: true,
      closeDialog: () => {},
      logout: () => {
        isLogoutBtnPressed = true;
      },
      theme: defaultTheme,
    };
    const wrapper = shallow(<LogoutModal {...props} />);
    const closeBtn = wrapper
      .find(Button)
      .last()
      .props();
    // @ts-ignore
    closeBtn.onPress();
    expect(isLogoutBtnPressed).toBe(true);
  });
});
