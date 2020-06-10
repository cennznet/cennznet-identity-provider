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

import React, { FunctionComponent } from 'react';
import { Button, Dialog, Paragraph, Portal, ActivityIndicator } from 'react-native-paper';
import { IProps } from './index';
import { QRActions, ISubstrateTxContent } from '../../utils/qrCodeParse';
import { ILocal } from '../../../typing';
import { View, StyleSheet, Image, Text } from 'react-native';
import { normalizeFont, normalizeHeight, normalizeWidth } from '../../utils/stylingHelper';
import { TransactionStatus } from './types';
import { setTestId } from '../../utils/integrationTestHelper';

export const TransactionConfirmationDialog: FunctionComponent<IProps> = props => {
  return (
    <Portal>
      <Dialog
        visible={props.isShowTxConfirmationDialog}
        onDismiss={props.closeTxConfirmationDialog}
        style={styles.container}
      >
        {props.txStatus === TransactionStatus.Processing && (
          <Dialog.Content>
            <ActivityIndicator animating={true} size={30} />
          </Dialog.Content>
        )}
        {props.txStatus === TransactionStatus.Wait && (
          <View style={styles.contentContainer}>
            <Dialog.Title style={props.theme.title}>
              {(('txConfirmation.title' as unknown) as ILocal).localized()}
            </Dialog.Title>
            <Dialog.Content>
              {props.txAction === QRActions.SUBSTRATE_SIGN_TX && (
                <Paragraph style={props.theme.subtitle}>
                  {(('txConfirmation.amount' as unknown) as ILocal).localized()}:{' '}
                  {(props.txContent as ISubstrateTxContent).amount}{' '}
                  {(props.txContent as ISubstrateTxContent).assetId}
                  {'\n'}
                  {(('txConfirmation.fee' as unknown) as ILocal).localized()}:{' '}
                  {(props.txContent as ISubstrateTxContent).fee}{' '}
                  {(props.txContent as ISubstrateTxContent).feeAssetId}
                  {'\n'}
                  {(('txConfirmation.to' as unknown) as ILocal).localized()}:{' '}
                  {(props.txContent as ISubstrateTxContent).toAddress}
                </Paragraph>
              )}
            </Dialog.Content>
            <Dialog.Actions style={styles.confirmAction}>
              <Button
                mode="outlined"
                style={styles.dialogBtn}
                labelStyle={[styles.dialogLabelBtn]}
                contentStyle={styles.btnContentStyle}
                onPress={props.closeTxConfirmationDialog}
              >
                {(('btnCommon.decline' as unknown) as ILocal).localized()}
              </Button>
              <Button
                {...setTestId('txConfirmBtn')}
                mode="contained"
                style={styles.dialogBtn}
                labelStyle={[styles.dialogLabelBtn]}
                contentStyle={styles.btnContentStyle}
                onPress={() => props.sendTransaction(props.txAction, props.txContent)}
              >
                {(('btnCommon.confirm' as unknown) as ILocal).localized()}
              </Button>
            </Dialog.Actions>
          </View>
        )}
        {props.txStatus === TransactionStatus.Fail && (
          <View style={styles.resultContentContainer}>
            <Dialog.Content>
              <Image style={styles.image} source={require('../../assets/icon/tx_send_fail.png')} />
              <Paragraph style={[props.theme.subtitle, styles.resultContent]}>
                {'\n\n'}
                {(('txSending.fail' as unknown) as ILocal).localized()}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions style={styles.resultDialogActions}>
              <Button
                mode="contained"
                style={styles.dialogBtn}
                contentStyle={styles.btnContentStyle}
                labelStyle={styles.dialogLabelBtn}
                onPress={props.closeTxConfirmationDialog}
              >
                {(('btnCommon.close' as unknown) as ILocal).localized()}
              </Button>
            </Dialog.Actions>
          </View>
        )}
        {props.txStatus === TransactionStatus.Success && (
          <View {...setTestId('txSendingSuccessView')} style={styles.resultContentContainer}>
            <Dialog.Content>
              <Image
                style={styles.image}
                source={require('../../assets/icon/tx_send_success.png')}
              />
              <Paragraph style={[props.theme.subtitle, styles.resultContent]}>
                {'\n\n'}
                {(('txSending.success' as unknown) as ILocal).localized()}
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions style={styles.resultDialogActions}>
              <Button
                mode="contained"
                style={styles.dialogBtn}
                contentStyle={styles.btnContentStyle}
                labelStyle={styles.dialogLabelBtn}
                onPress={props.closeTxConfirmationDialog}
              >
                {(('btnCommon.close' as unknown) as ILocal).localized()}
              </Button>
            </Dialog.Actions>
          </View>
        )}
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: normalizeHeight(40),
    width: '80%',
    borderRadius: 20,
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  dialogLabelBtn: {
    fontSize: normalizeFont(2),
  },
  dialogBtn: {
    width: normalizeWidth(30),
    height: normalizeHeight(6),
    borderRadius: 50,
  },
  confirmAction: {
    justifyContent: 'space-around',
  },
  btnContentStyle: {
    width: normalizeWidth(30),
    height: normalizeHeight(6),
  },
  image: {
    width: normalizeHeight(35),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  resultContent: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -15,
  },
  resultContentContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  resultDialogActions: {
    position: 'absolute',
    bottom: 0,
    left: '30%',
  },
});
