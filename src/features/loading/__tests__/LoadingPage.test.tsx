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

import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../LoadingPage';
import { accountPhraseLoading } from '../actions';
import { ImageBackground } from 'react-native';
import { IStyleProps } from '../../HOC/DefaultStylingHOC';
import { IProps } from '..';

describe('Loading page test', () => {
  it('should render an image background', () => {
    const props: IProps & IStyleProps = {
      loadAccountPhrase: () => accountPhraseLoading(),
    };
    const wrapper = shallow(<LoadingPage {...props} />);
    expect(wrapper.find(ImageBackground).first()).not.toBeUndefined();
  });

  it('should load saved phrase when component is rendered', () => {
    let isPhraseLoadingCalled: boolean = false;
    (accountPhraseLoading as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      isPhraseLoadingCalled = true;
    });
    const props = {
      loadAccountPhrase: () => accountPhraseLoading(),
      safeAreaViewStyle: {},
      statusBarBackgroundColor: '',
    };
    const wrapper = shallow(<LoadingPage {...props} />);
    expect(isPhraseLoadingCalled).toBe(true);
  });
});
