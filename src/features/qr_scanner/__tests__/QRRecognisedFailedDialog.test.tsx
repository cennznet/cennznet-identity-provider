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
import { QRRecognisedFailedDialog } from '../QRRecognisedFailed/QRRecognisedFailedDialog';
import { Button } from 'react-native-paper';
import { closeQRRecognisedFailedDialog } from '../actions';
import { defaultTheme } from '../../../common/themes/default';

describe('QR code recognised failed dialog test', () => {
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
      isShowQRRecognisedFailedDialog: true,
      closeDialog: () => ({}),
      theme: defaultTheme,
    };
    expect(localizeCallCount).toBe(0);
    const wrapper = shallow(<QRRecognisedFailedDialog {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(localizeCallCount).toBeGreaterThan(0);
  });

  it('should close the dialog if press close button', () => {
    let isCloseBtnPressed: boolean = false;
    const props = {
      isShowQRRecognisedFailedDialog: true,
      closeDialog: () => {
        isCloseBtnPressed = true;
        return closeQRRecognisedFailedDialog();
      },
      theme: defaultTheme,
    };
    const wrapper = shallow(<QRRecognisedFailedDialog {...props} />);
    const closeBtn = wrapper
      .find(Button)
      .first()
      .props();
    // @ts-ignore
    closeBtn.onPress();
    expect(isCloseBtnPressed).toBe(true);
  });
});
