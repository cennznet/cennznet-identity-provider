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
import Navigator from '../Navigator';
import { startToScan, disableToScan } from '../../qr_scanner/actions';

describe('Navigator component', () => {
  let localizeCallCount = 0;

  beforeEach(async () => {
    localizeCallCount = 0;
    (String.prototype as any).localized = () => {
      localizeCallCount++;
      return 'localized text';
    };
  });

  it('should localize any text', () => {
    const props = {
      enableScan: () => startToScan(),
      disbleScan: () => disableToScan(),
    };
    expect(localizeCallCount).toBe(0);
    const wrapper = shallow(<Navigator {...props} />);
    expect(localizeCallCount).toBeGreaterThan(0);
  });

  it('should have two items in the bottom navigation ', () => {
    const props = {
      enableScan: () => startToScan(),
      disbleScan: () => disableToScan(),
    };
    const wrapper = shallow(<Navigator {...props} />);
    // @ts-ignore
    const length = wrapper.state().routes.length;
    expect(length).toBe(3);
  });

  it('should call disbleScan action if the pressed index is not 1 ', () => {
    let isDisableToScanCalled = false;
    const props = {
      enableScan: () => startToScan(),
      disbleScan: () => {
        isDisableToScanCalled = true;
        return disableToScan();
      },
    };
    const wrapper = shallow(<Navigator {...props} />);
    // @ts-ignore
    wrapper.instance().handleIndexChange(0);
    expect(isDisableToScanCalled).toBe(true);
  });

  it('should call enableScan action if the pressed index is 1 ', () => {
    let isEnableToScanCalled = false;
    const props = {
      enableScan: () => {
        isEnableToScanCalled = true;
        return startToScan();
      },
      disbleScan: () => disableToScan(),
    };
    const wrapper = shallow(<Navigator {...props} />);
    // @ts-ignore
    wrapper.instance().handleIndexChange(1);
    expect(isEnableToScanCalled).toBe(true);
  });
});
