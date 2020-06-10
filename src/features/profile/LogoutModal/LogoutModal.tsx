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
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { ILocal } from '../../../../typing';
import { normalizeWidth, normalizeHeight, normalizeFont } from '../../../utils/stylingHelper';
import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../common/themes/default';

interface IProps {
  isShow: boolean;
  closeDialog: () => void;
  logout: () => void;
  theme: ThemeType;
}
export const LogoutModal: FunctionComponent<IProps> = props => {
  return (
    <Portal>
      <Dialog style={styles.container} visible={props.isShow} onDismiss={props.closeDialog}>
        <Dialog.Content style={styles.content}>
          <Paragraph style={[props.theme.subtitle, styles.text]}>
            {(('logout.text' as unknown) as ILocal).localized()}
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogAction}>
          <Button
            mode="outlined"
            style={styles.dialogBtn}
            labelStyle={styles.dialogLabelBtn}
            contentStyle={styles.btnContentStyle}
            onPress={props.closeDialog}
          >
            {(('btnCommon.cancel' as unknown) as ILocal).localized()}
          </Button>
          <Button
            mode="contained"
            style={styles.dialogBtn}
            labelStyle={styles.dialogLabelBtn}
            contentStyle={styles.btnContentStyle}
            onPress={props.logout}
          >
            {(('logout.logoutBtn' as unknown) as ILocal).localized()}
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
  content: {
    flex: 2,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  dialogAction: {
    flex: 2,
    marginTop: 20,
    justifyContent: 'space-around',
  },
});
