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
import QRScanner from '../QRScanner';
import { shallow } from 'enzyme';
import {
  closeQRRecognisedFailedDialog,
  showQRRecognisedFailedDialog,
  showTxContent,
} from '../actions';
import { logout } from '../../logout/actions';
import { IQRContent, parseQR } from '../../../utils/qrCodeParse';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import { IconButton } from 'react-native-paper';
import { BackHandler } from 'react-native';
import { defaultTheme } from '../../../common/themes/default';

describe('QR Scanner test', () => {
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
      isStartToScan: false,
      isShowQRRecognisedFailedDialog: false,
      showQRContent: (qrContent: IQRContent) => showTxContent(qrContent),
      closeQRRecognisedFailedDialog: () => closeQRRecognisedFailedDialog(),
      showQRRecognisedFailedDialog: () => showQRRecognisedFailedDialog(),
      logoutFromApp: () => logout(),
      exitApp: () => {},
      theme: defaultTheme,
    };
    expect(localizeCallCount).toBe(0);
    const wrapper = shallow(<QRScanner {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(localizeCallCount).toBeGreaterThan(0);
  });

  it('should render camera component', () => {
    const props = {
      isStartToScan: true,
      isShowQRRecognisedFailedDialog: false,
      showQRContent: (qrContent: IQRContent) => showTxContent(qrContent),
      closeQRRecognisedFailedDialog: () => closeQRRecognisedFailedDialog(),
      showQRRecognisedFailedDialog: () => showQRRecognisedFailedDialog(),
      logoutFromApp: () => logout(),
      exitApp: () => {},
      theme: defaultTheme,
    };
    const wrapper = shallow(<QRScanner {...props} />);
    const rnCamera = wrapper.find(RNCamera).first();
    expect(rnCamera).not.toBeUndefined();
  });

  it('should go to tx confirm page if qr code is recognized', () => {
    let isGoToTxConfirmation: boolean = false;
    let isShowQRContent: boolean = false;
    (parseQR as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return { action: 'SUBSTRATE_SIGN_TX' } as IQRContent;
    });
    (Actions.txConfirmation as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      isGoToTxConfirmation = true;
    });
    const props = {
      isStartToScan: false,
      isShowQRRecognisedFailedDialog: false,
      showQRContent: (qrContent: IQRContent) => {
        isShowQRContent = true;
        return showTxContent(qrContent);
      },
      closeQRRecognisedFailedDialog: () => closeQRRecognisedFailedDialog(),
      showQRRecognisedFailedDialog: () => showQRRecognisedFailedDialog(),
      logoutFromApp: () => logout(),
      exitApp: () => {},
      theme: defaultTheme,
    };
    const wrapper = shallow(<QRScanner {...props} />);
    // @ts-ignore
    wrapper.instance().decodeQR({ event: {} });
    expect(isGoToTxConfirmation).toBe(true);
    expect(isShowQRContent).toBe(true);
  });

  it('should show recognized failed dialog if qr code is not recognized', () => {
    let isShowRecognizedFailedDialog: boolean = false;
    const props = {
      isStartToScan: false,
      isShowQRRecognisedFailedDialog: false,
      showQRContent: (qrContent: IQRContent) => showTxContent(qrContent),
      closeQRRecognisedFailedDialog: () => closeQRRecognisedFailedDialog(),
      showQRRecognisedFailedDialog: () => {
        isShowRecognizedFailedDialog = true;
        return showQRRecognisedFailedDialog();
      },
      logoutFromApp: () => logout(),
      exitApp: () => {},
      theme: defaultTheme,
    };
    const wrapper = shallow(<QRScanner {...props} />);
    // @ts-ignore
    wrapper.instance().decodeQR({ event: {} });
    expect(isShowRecognizedFailedDialog).toBe(true);
  });

  it('should call exitApp when componentDidMount is called', () => {
    let isAddEventListenerCalled: boolean = false;
    (BackHandler.addEventListener as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      isAddEventListenerCalled = true;
    });
    const props = {
      isStartToScan: false,
      isShowQRRecognisedFailedDialog: false,
      showQRContent: (qrContent: IQRContent) => showTxContent(qrContent),
      closeQRRecognisedFailedDialog: () => closeQRRecognisedFailedDialog(),
      showQRRecognisedFailedDialog: () => showQRRecognisedFailedDialog(),
      logoutFromApp: () => logout(),
      exitApp: () => {},
      theme: defaultTheme,
    };
    const wrapper = shallow(<QRScanner {...props} />);
    // @ts-ignore
    wrapper.instance().componentDidMount();
    expect(isAddEventListenerCalled).toBe(true);
  });

  it('should call exitApp when componentDidMount is called', () => {
    let isRemoveEventListenerCalled: boolean = false;
    (BackHandler.removeEventListener as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      isRemoveEventListenerCalled = true;
    });
    const props = {
      isStartToScan: false,
      isShowQRRecognisedFailedDialog: false,
      showQRContent: (qrContent: IQRContent) => showTxContent(qrContent),
      closeQRRecognisedFailedDialog: () => closeQRRecognisedFailedDialog(),
      showQRRecognisedFailedDialog: () => showQRRecognisedFailedDialog(),
      logoutFromApp: () => logout(),
      exitApp: () => {},
      theme: defaultTheme,
    };
    const wrapper = shallow(<QRScanner {...props} />);
    // @ts-ignore
    wrapper.instance().componentWillUnmount();
    expect(isRemoveEventListenerCalled).toBe(true);
  });
});
