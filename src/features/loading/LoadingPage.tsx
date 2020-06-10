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

import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { IProps } from './index';
import { normalizeHeight } from '../../utils/stylingHelper';

interface IState {
  slideValue: Animated.Value;
  fadeAnim: Animated.Value;
}
class LoadingPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      slideValue: new Animated.Value(0),
      fadeAnim: new Animated.Value(0),
    };
  }

  public startAnimation() {
    const slideUpTiming = Animated.timing(this.state.slideValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    const fadeInTiming = Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    const animParallel = Animated.parallel([
      Animated.loop(slideUpTiming),
      Animated.loop(fadeInTiming),
    ]);
    animParallel.start();
  }

  public componentDidMount() {
    this.props.loadAccountPhrase();
    this.startAnimation();
  }

  public render() {
    return __DEV__ ? (
      <View style={styles.container} />
    ) : (
      <View style={styles.container}>
        <Animated.Image
          style={{
            ...styles.logo,
            transform: [
              {
                translateY: this.state.slideValue.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 1],
                  outputRange: [0, -50, -100, -50, 0],
                }),
              },
            ],
          }}
          source={require('../../assets/img/Loading_page.png')}
        />
        <Animated.Image
          style={{
            ...styles.glow,
            opacity: this.state.fadeAnim.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [1, 0.5, 0, 0.5, 1],
            }),
          }}
          source={require('../../assets/img/Loading_page_glow.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 105,
    marginTop: 260,
    height: 122,
  },
  glow: {
    width: 135,
    marginTop: 15,
    height: normalizeHeight(1),
  },
});

export default LoadingPage;
