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

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import QRScanner from '../qr_scanner/index';
import Home from '../home/index';
import { colors } from '../../common/themes/default';
import { ILocal } from '../../../typing';
import { IProps } from '.';
import { setTestId } from '../../utils/integrationTestHelper';
import Profile from '../profile/index';

const HomeRoute = () => <Home />;

const QRScannerRoute = () => <QRScanner />;

const ProfileRoute = () => <Profile />;

interface IRoute {
  key: string;
  title: string;
  icon: string;
}
interface IState {
  index: number;
  routes: IRoute[];
}

class Navigator extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {
          key: 'Home',
          title: (('navigator.home' as unknown) as ILocal).localized(),
          icon: 'home',
          ...setTestId('home'),
        },
        {
          key: 'QRScanner',
          title: (('navigator.qrscanner' as unknown) as ILocal).localized(),
          icon: 'qrcode',
          ...setTestId('qrScanner'),
        },
        {
          key: 'Profile',
          title: (('navigator.profile' as unknown) as ILocal).localized(),
          icon: 'account-outline',
          ...setTestId('profile'),
        },
      ],
    };
  }

  public renderScene = BottomNavigation.SceneMap({
    Home: HomeRoute,
    QRScanner: QRScannerRoute,
    Profile: ProfileRoute,
  });

  public handleIndexChange = (index: any) => {
    this.setState({ index });
    if (index !== 1) {
      this.props.disbleScan();
    } else {
      this.props.enableScan();
    }
  };

  public render() {
    return (
      <View style={styles.container} {...setTestId('navigatorView')}>
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this.handleIndexChange}
          renderScene={this.renderScene}
          barStyle={{
            backgroundColor: colors.bottomNavigator.backgroud,
          }}
          activeColor={colors.primary}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Navigator;
