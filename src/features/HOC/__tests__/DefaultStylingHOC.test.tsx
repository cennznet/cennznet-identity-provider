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
import { shallow } from 'enzyme';
import { SafeAreaView, StatusBar, View } from 'react-native';
import withDefaultStyling from '../DefaultStylingHOC';
class testComponent extends React.Component {
  render() {
    return <View />;
  }
}
describe('Default styling hoc - render component test', () => {
  let WithStylingComponent: any;
  beforeEach(() => {
    const mockedComponent = jest.fn();
    WithStylingComponent = withDefaultStyling(testComponent);
  });
  it('should render the child component successfully using default styling', () => {
    const props = {};
    const wrapper = shallow(<WithStylingComponent {...props} />);
    expect(wrapper.find(SafeAreaView).length).toBe(2);
    expect(wrapper.find(StatusBar).length).toBe(1);
  });

  it('should render the child component successfully by modifying default styling', () => {
    const safeAreaViewStyle = {
      backgroundColor: '#1130FF',
    };
    const props = {
      topSafeAreaViewStyle: safeAreaViewStyle,
      bottomSafeAreaViewStyle: safeAreaViewStyle,
      statusBarBackgroundColor: '#1130FF',
      statusBarStyle: 'default',
    };
    const wrapper = shallow(<WithStylingComponent {...props} />);
    const topSafeAreaView = wrapper.find(SafeAreaView).first();
    const bottomSafeAreaView = wrapper.find(SafeAreaView).last();
    const statusBar = wrapper.find(StatusBar).first();
    expect(topSafeAreaView.props().style).toEqual({ flex: 0, ...safeAreaViewStyle });
    expect(bottomSafeAreaView.props().style).toEqual({ flex: 1, ...safeAreaViewStyle });
    expect(statusBar.props().backgroundColor).toBe(props.statusBarBackgroundColor);
    expect(statusBar.props().barStyle).toBe(props.statusBarStyle);
  });
});
