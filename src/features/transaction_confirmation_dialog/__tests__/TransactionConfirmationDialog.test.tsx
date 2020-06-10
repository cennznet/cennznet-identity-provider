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
import { TransactionStatus } from '../types';
import { TransactionConfirmationDialog } from '../TransactionConfirmationDialog';
import { shallow } from 'enzyme';
import { TxActionsType, TxContentType } from '../reducer';
import { closeTxConfirmationDialog } from '../actions';
import { ActivityIndicator, Button } from 'react-native-paper';
import { Image } from 'react-native';
import { defaultTheme } from '../../../common/themes/default';

describe('Transaction confirmation dialog test', () => {
  let localizeCallCount = 0;

  beforeEach(async () => {
    localizeCallCount = 0;
    (String.prototype as any).localized = () => {
      localizeCallCount++;
      return 'localized text';
    };
  });

  describe('Transaction confirmation dialog - status is wait', () => {
    it('will localize all text', () => {
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: {
          assetId: 'CENNZ',
          amount: '10000',
          feeAssetId: 'CPAY',
          fee: '100',
          toAddress: '5GmULrC4sC4rj3FHwcsuQp5W7ymbCnotgEExdxczUKEm4rbc',
        },
        txStatus: TransactionStatus.Wait,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => ({ type: 'empty' }),
        closeTxConfirmationDialog: () => closeTxConfirmationDialog(),
        theme: defaultTheme,
      };
      expect(localizeCallCount).toBe(0);
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      expect(wrapper.contains('localized text')).toBe(true);
      expect(localizeCallCount).toBeGreaterThan(0);
    });
    it('should call send transaction function when click confirm button', () => {
      let isSendTransactionCalled: boolean = false;
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: {
          assetId: 'CENNZ',
          amount: '10000',
          feeAssetId: 'CPAY',
          fee: '100',
          toAddress: '5GmULrC4sC4rj3FHwcsuQp5W7ymbCnotgEExdxczUKEm4rbc',
        },
        txStatus: TransactionStatus.Wait,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => {
          isSendTransactionCalled = true;
          return { type: 'empty' };
        },
        closeTxConfirmationDialog: () => closeTxConfirmationDialog(),
        theme: defaultTheme,
      };
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      const confirmBtn = wrapper
        .find(Button)
        .last()
        .props();
      // @ts-ignore
      confirmBtn.onPress();
      expect(isSendTransactionCalled).toBe(true);
    });
    it('should call close dialog function when click cancel button', () => {
      let isCloseDialogCalled: boolean = false;
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: {
          assetId: 'CENNZ',
          amount: '10000',
          feeAssetId: 'CPAY',
          fee: '100',
          toAddress: '5GmULrC4sC4rj3FHwcsuQp5W7ymbCnotgEExdxczUKEm4rbc',
        },
        txStatus: TransactionStatus.Wait,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => ({ type: 'empty' }),
        closeTxConfirmationDialog: () => {
          isCloseDialogCalled = true;
          return closeTxConfirmationDialog();
        },
        theme: defaultTheme,
      };
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      const cancelBtn = wrapper
        .find(Button)
        .first()
        .props();
      // @ts-ignore
      cancelBtn.onPress();
      expect(isCloseDialogCalled).toBe(true);
    });
  });

  describe('Transaction confirmation dialog  - status is processing', () => {
    it('should display spinner when the status is processing', () => {
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: undefined,
        txStatus: TransactionStatus.Processing,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => ({ type: 'empty' }),
        closeTxConfirmationDialog: () => closeTxConfirmationDialog(),
        theme: defaultTheme,
      };
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      const spinner = wrapper.find(ActivityIndicator);
      expect(spinner).not.toBeUndefined();
    });
  });

  describe('Transaction confirmation dialog - status is successful', () => {
    it('should display successful icon when status is successful', () => {
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: undefined,
        txStatus: TransactionStatus.Success,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => ({ type: 'empty' }),
        closeTxConfirmationDialog: () => closeTxConfirmationDialog(),
        theme: defaultTheme,
      };
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      const icon = wrapper.find(Image).first();
      expect(icon.props().source).toBe(require('../../../assets/icon/tx_send_success.png'));
    });

    it('should call close dialog function when click cancel button', () => {
      let isCloseDialogCalled: boolean = false;
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: undefined,
        txStatus: TransactionStatus.Success,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => ({ type: 'empty' }),
        closeTxConfirmationDialog: () => {
          isCloseDialogCalled = true;
          return closeTxConfirmationDialog();
        },
        theme: defaultTheme,
      };
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      const closeBtn = wrapper
        .find(Button)
        .first()
        .props();
      // @ts-ignore
      closeBtn.onPress();
      expect(isCloseDialogCalled).toBe(true);
    });
  });

  describe('Transaction confirmation dialog - status is unsuccessful', () => {
    it('should display unsuccessful icon when status is failed', () => {
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: undefined,
        txStatus: TransactionStatus.Fail,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => ({ type: 'empty' }),
        closeTxConfirmationDialog: () => closeTxConfirmationDialog(),
        theme: defaultTheme,
      };
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      const icon = wrapper.find(Image).first();
      expect(icon.props().source).toBe(require('../../../assets/icon/tx_send_fail.png'));
    });

    it('should call close dialog function when click cancel button', () => {
      let isCloseDialogCalled: boolean = false;
      const props = {
        isShowTxConfirmationDialog: false,
        txAction: 'undefined',
        txContent: undefined,
        txStatus: TransactionStatus.Fail,
        sendTransaction: (txAction: TxActionsType, txContent: TxContentType) => ({ type: 'empty' }),
        closeTxConfirmationDialog: () => {
          isCloseDialogCalled = true;
          return closeTxConfirmationDialog();
        },
        theme: defaultTheme,
      };
      const wrapper = shallow(<TransactionConfirmationDialog {...props} />);
      const closeBtn = wrapper
        .find(Button)
        .first()
        .props();
      // @ts-ignore
      closeBtn.onPress();
      expect(isCloseDialogCalled).toBe(true);
    });
  });
});
