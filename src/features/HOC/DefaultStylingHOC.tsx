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

import React, { Fragment, FunctionComponent } from 'react';
import { SafeAreaView, StatusBar, StatusBarStyle, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ThemeType } from '../../common/themes/default';

export interface IStyleProps {
  topSafeAreaViewStyle?: React.CSSProperties;
  bottomSafeAreaViewStyle?: React.CSSProperties;
  statusBarStyle?: StatusBarStyle;
  statusBarBackgroundColor?: string;
}
export interface IThemeProps {
  theme: ThemeType;
}
const withDefaultStyling = <P extends object>(Component: React.ComponentType<P>) => {
  const WithDefaultStyling: FunctionComponent<P & IStyleProps> = props => {
    const {
      topSafeAreaViewStyle,
      bottomSafeAreaViewStyle,
      statusBarStyle,
      statusBarBackgroundColor,
      ...childProps
    } = props;
    const topSafeStyle: any = topSafeAreaViewStyle
      ? topSafeAreaViewStyle
      : styles.defaultTopSafeStyle;
    const bottomSafeStyle: any = bottomSafeAreaViewStyle
      ? bottomSafeAreaViewStyle
      : styles.defaultBottomSafeStyle;

    const theme = useTheme();
    const childComponentProps = {
      theme,
      ...childProps,
    };

    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, ...topSafeStyle }} />
        <SafeAreaView style={{ flex: 1, ...bottomSafeStyle }}>
          <StatusBar
            translucent={false}
            animated={false}
            hidden={false}
            barStyle={statusBarStyle ? statusBarStyle : 'dark-content'}
            backgroundColor={statusBarBackgroundColor ? statusBarBackgroundColor : '#fff'}
          />
          <Component {...(childComponentProps as P)} />
        </SafeAreaView>
      </Fragment>
    );
  };

  return WithDefaultStyling;
};

const styles = StyleSheet.create({
  defaultTopSafeStyle: {
    backgroundColor: '#fff',
  },
  defaultBottomSafeStyle: {
    backgroundColor: '#fff',
  },
});

export default withDefaultStyling;
