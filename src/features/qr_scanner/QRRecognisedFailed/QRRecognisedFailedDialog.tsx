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
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { ILocal } from '../../../../typing';
import { normalizeWidth, normalizeHeight, normalizeFont } from '../../../utils/stylingHelper';
import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../common/themes/default';

interface IProps {
  isShowQRRecognisedFailedDialog: boolean;
  closeDialog: () => void;
  theme: ThemeType;
}

export const QRRecognisedFailedDialog: FunctionComponent<IProps> = props => {
  return (
    <Portal>
      <Dialog
        style={styles.container}
        visible={props.isShowQRRecognisedFailedDialog}
        onDismiss={props.closeDialog}
      >
        <Dialog.Title style={[props.theme.title, styles.title]}>
          {(('qrRecognisedFailed.title' as unknown) as ILocal).localized()}
        </Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Text style={[props.theme.subtitle, styles.text]}>
            {(('qrRecognisedFailed.message' as unknown) as ILocal).localized()}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogAction}>
          <Button
            mode="contained"
            style={styles.dialogBtn}
            labelStyle={styles.dialogLabelBtn}
            contentStyle={styles.btnContentStyle}
            onPress={props.closeDialog}
          >
            {(('qrRecognisedFailed.tryAgain' as unknown) as ILocal).localized()}
          </Button>
        </Dialog.Actions>
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
  dialogLabelBtn: {
    fontSize: normalizeFont(2),
  },
  dialogBtn: {
    width: normalizeWidth(30),
    height: normalizeHeight(6),
    borderRadius: 50,
  },
  btnContentStyle: {
    width: normalizeWidth(30),
    height: normalizeHeight(6),
  },
  title: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontSize: normalizeFont(2.8),
  },
  content: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    textAlign: 'center',
  },
  dialogAction: {
    flex: 2,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
