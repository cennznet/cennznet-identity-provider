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

import React, { FunctionComponent, useState } from 'react';
import { IProps } from '.';
import { View, StyleSheet, Text, Clipboard } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import { ILocal } from '../../../typing';
import { setTestId } from '../../utils/integrationTestHelper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LogoutModal } from './LogoutModal/LogoutModal';

export const Profile: FunctionComponent<IProps> = props => {
  const [isShowLogoutModal, setIsShowLogoutModal] = useState(false);

  const copyPublicKey = async () => {
    await Clipboard.setString(props.publicAddress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, props.theme.title]}>
          {(('profile.title' as unknown) as ILocal).localized()}
        </Text>
      </View>
      <View style={styles.content}>
        <List.Section style={styles.content}>
          <List.Item
            style={styles.item}
            title={(('profile.publicKey' as unknown) as ILocal).localized()}
            description={props.publicAddress}
            right={() => (
              <IconButton
                style={styles.copyIcon}
                icon="content-copy"
                size={23}
                onPress={() => {
                  copyPublicKey();
                }}
              />
            )}
          />
          <List.Item
            style={styles.item}
            title={(('profile.seedPhrase' as unknown) as ILocal).localized()}
            right={() => <Icon style={styles.icon} size={20} name="chevron-right" />}
            onPress={() => props.navigateToSeedPhrase()}
          />
          <List.Item
            {...setTestId('logoutBtn')}
            style={styles.item}
            title={(('profile.logout' as unknown) as ILocal).localized()}
            right={() => <Icon style={styles.icon} size={20} name="chevron-right" />}
            onPress={() => setIsShowLogoutModal(true)}
          />
        </List.Section>
      </View>
      <LogoutModal
        isShow={isShowLogoutModal}
        theme={props.theme}
        logout={() => {
          setIsShowLogoutModal(false);
          props.logout();
        }}
        closeDialog={() => setIsShowLogoutModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
  },
  content: {
    flex: 6,
  },
  item: {
    borderBottomColor: '#EBECED',
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    padding: 20,
  },
  copyIcon: {
    marginLeft: 20,
    marginRight: 13,
    marginTop: 30,
  },
});
