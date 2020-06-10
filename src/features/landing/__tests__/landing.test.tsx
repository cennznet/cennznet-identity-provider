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

import { Landing } from '../landing';
import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-native-paper';
import { defaultTheme } from '../../../common/themes/default';

describe('landing - localization test', () => {
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
      importAccount: () => {},
      createAccount: () => {},
      theme: defaultTheme,
    };

    expect(localizeCallCount).toBe(0);
    const wrapper = shallow(<Landing {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(localizeCallCount).toBeGreaterThan(0);
  });
});

describe('landing - action test', () => {
  it('should trigger the import account action when the import button is pressed', () => {
    let isImportAccountCalled = false;

    const props = {
      importAccount: () => {
        isImportAccountCalled = true;
      },
      createAccount: () => {},
      theme: defaultTheme,
    };

    const wrapper = shallow(<Landing {...props} />);

    const importBtnProps = wrapper
      .find(Button)
      .first()
      .props();
    // @ts-ignore
    importBtnProps.onPress();
    expect(importBtnProps.onPress).not.toBeUndefined();
    expect(isImportAccountCalled).toBe(true);
  });
  it('should trigger the create account action when the create account button is pressed', () => {
    let isCreateAccountCalled = false;

    const props = {
      importAccount: () => {},
      createAccount: () => {
        isCreateAccountCalled = true;
      },
      theme: defaultTheme,
    };

    const wrapper = shallow(<Landing {...props} />);

    const importBtnProps = wrapper
      .find(Button)
      .last()
      .props();
    // @ts-ignore
    importBtnProps.onPress();
    expect(importBtnProps.onPress).not.toBeUndefined();
    expect(isCreateAccountCalled).toBe(true);
  });
});
