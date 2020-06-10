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
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { ILocal } from '../../../typing';
import { IProps } from './index';
import { setTestId } from '../../utils/integrationTestHelper';
import { normalizeWidth, normalizeHeight } from '../../utils/stylingHelper';
import getColorStyle from '../../common/utils/getColorStyle';

export const Landing: FunctionComponent<IProps> = props => (
  <View style={styles.container}>
    <View style={styles.landingImg}>
      <Image style={styles.image} source={require('../../assets/img/isometric-2-02.png')} />
    </View>
    <View style={styles.content}>
      <Text {...setTestId('landingTitle')} style={[styles.title, props.theme.title]}>
        {(('landing.title' as unknown) as ILocal).localized()}
      </Text>
      <Text style={[styles.subtitle, props.theme.subtitle]}>
        {(('landing.subtitle' as unknown) as ILocal).localized()}
      </Text>
    </View>

    <View style={styles.buttonContainer}>
      <Button
        {...setTestId('landingImportBtn')}
        style={styles.button}
        contentStyle={styles.btnContentStyle}
        mode="contained"
        onPress={() => {
          props.importAccount();
        }}
      >
        {(('landing.importAccount' as unknown) as ILocal).localized()}
      </Button>

      <Button
        {...setTestId('landingCreateBtn')}
        style={styles.button}
        contentStyle={styles.btnContentStyle}
        mode="contained"
        onPress={() => {
          props.createAccount();
        }}
      >
        {(('landing.createAccount' as unknown) as ILocal).localized()}
      </Button>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  landingImg: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {},
  title: {
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 15,
    textAlign: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  buttonContainer: {
    flex: 3,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 15,
    fontSize: 14,
    width: normalizeWidth(80),
    height: normalizeHeight(8),
    borderRadius: 50,
  },
  btnContentStyle: {
    width: normalizeWidth(80),
    height: normalizeHeight(8),
  },
});
