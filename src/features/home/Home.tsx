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
import { View, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ILocal } from '../../../typing';
import { normalizeHeight, normalizeWidth, normalizeFont } from '../../utils/stylingHelper';
import { setTestId } from '../../utils/integrationTestHelper';
import { IProps } from '.';

export const Home: FunctionComponent<IProps> = props => (
  <View {...setTestId('homeView')} style={styles.container}>
    <View style={styles.content}>
      <View style={[styles.iconBackground, { backgroundColor: props.theme.colors.primary }]}>
        <Icon color="#FFFFFF" name="fingerprint" size={60} />
      </View>
      <Paragraph style={[styles.description, props.theme.subtitle]}>
        {(('home.description' as unknown) as ILocal).localized()}
      </Paragraph>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  content: {
    paddingTop: 130,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    width: 96,
    height: 96,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  description: {
    marginTop: 10,
    width: normalizeWidth(70),
    height: normalizeHeight(20),
    textAlign: 'center',
  },
  bottomNavigation: {
    flex: 3,
  },
});
