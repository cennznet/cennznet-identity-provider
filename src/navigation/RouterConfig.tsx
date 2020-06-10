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
import { Keyboard, View } from 'react-native';
import { Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { RouterWithRedux } from './RouterWithRedux';

import AccountImport from '../features/account_import/index';
import Landing from '../features/landing/index';

import TransactionConfirmationDialog from '../features/transaction_confirmation_dialog/index';
import LoadingPage from '../features/loading/index';
import GenerateSecretPhrase from '../features/generate_secret_phrase/index';
import ConfirmSeedPhrase from '../features/confirm_seed_phrase/index';
import Navigator from '../features/navigator/index';
import SecretPhrase from '../features/secret_phrase/index';

export class RouterConfig extends PureComponent {
  public _onEnter() {
    // dismiss the keyboard if open
    Keyboard.dismiss();
  }

  public render() {
    return (
      <View style={styles.container}>
        <RouterWithRedux sceneStyle={{ backgroundColor: '#fff' }}>
          <Scene key="root" unmountScenes={true}>
            <Scene
              key="loadingPage"
              component={LoadingPage}
              unmountScenes={true}
              hideNavBar={true}
              duration={0}
            />
            <Scene
              key="landing"
              component={Landing}
              unmountScenes={true}
              hideNavBar={true}
              duration={0}
              drawerLockMode="locked-closed"
              gesturesEnabled={false}
            />
            <Scene
              key="accountImport"
              component={AccountImport}
              unmountScenes={true}
              hideNavBar={true}
              duration={0}
            />
            <Scene
              key="generateSecretPhrase"
              component={GenerateSecretPhrase}
              unmountScenes={true}
              hideNavBar={true}
              duration={0}
            />
            <Scene
              key="secretPhrase"
              component={SecretPhrase}
              unmountScenes={true}
              hideNavBar={true}
              duration={0}
            />
            <Scene
              key="txConfirmation"
              component={TransactionConfirmationDialog}
              unmountScenes={true}
              hideNavBar={true}
              duration={0}
            />
            <Scene
              key="navigator"
              component={Navigator}
              unmountScenes={true}
              hideNavBar={true}
              duration={0}
            />
            <Scene
              key="confirmSeedPhrase"
              component={ConfirmSeedPhrase}
              unmountScenes={true}
              sceneStyle={{ backgroundColor: 'white' }}
              hideNavBar={true}
              duration={0}
            />
          </Scene>
        </RouterWithRedux>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
};

export default connect()(RouterConfig);
