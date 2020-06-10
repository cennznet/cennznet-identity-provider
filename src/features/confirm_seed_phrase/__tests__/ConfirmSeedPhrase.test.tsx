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

import { ConfirmSeedPhrase } from './../ConfirmSeedPhrase';
import { shallow } from 'enzyme';
import React from 'react';
import { TextInput } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { updateLoadingStatus } from '../actions';
import { defaultTheme } from '../../../common/themes/default';

describe('localization test', () => {
  let localizeCallCount = 0;

  beforeEach(async () => {
    localizeCallCount = 0;
    (String.prototype as any).localized = () => {
      localizeCallCount++;
      return 'localized text';
    };
  });

  it('will localize all text', () => {
    const props = {
      storedPhrase: '',
      isLoading: false,
      goToScanner: () => {},
      goBack: () => {},
      updateLoadingStatus: () => updateLoadingStatus(false),
      theme: defaultTheme,
    };
    expect(localizeCallCount).toBe(0);
    const wrapper = shallow(<ConfirmSeedPhrase {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(localizeCallCount).toBeGreaterThan(0);
  });
});

describe('typed phrase length test', () => {
  it('should disable confirm button if phrase length is less than 12', () => {
    const props = {
      storedPhrase: '',
      isLoading: false,
      goToScanner: () => {},
      goBack: () => {},
      updateLoadingStatus: () => updateLoadingStatus(false),
      theme: defaultTheme,
    };
    const invalidPhrase = 'test phrase';
    const wrapper = shallow(<ConfirmSeedPhrase {...props} />);
    const phraseInputProps = wrapper
      .find(TextInput)
      .first()
      .props();
    // tslint:disable-next-line: no-unused-expression
    phraseInputProps.onChangeText && phraseInputProps.onChangeText(invalidPhrase);
    const confirmBtn = wrapper.find(Button).first();
    expect(phraseInputProps.onChangeText).not.toBeUndefined();
    expect(confirmBtn.props().disabled).toBe(true);
  });

  it('should enable confirm button if phrase length is greater or equal to 12', () => {
    const props = {
      storedPhrase: '',
      isLoading: false,
      goToScanner: () => {},
      goBack: () => {},
      updateLoadingStatus: () => updateLoadingStatus(false),
      theme: defaultTheme,
    };
    const validPhrase = 'pupil usage price sketch inject wheel latin add once cheap zoo salmon';
    const wrapper = shallow(<ConfirmSeedPhrase {...props} />);
    const phraseInputProps = wrapper
      .find(TextInput)
      .first()
      .props();
    // tslint:disable-next-line: no-unused-expression
    phraseInputProps.onChangeText && phraseInputProps.onChangeText(validPhrase);
    const confirmBtn = wrapper.find(Button).first();
    expect(phraseInputProps.onChangeText).not.toBeUndefined();
    expect(confirmBtn.props().disabled).toBe(false);
  });
});

describe('on press confirm button', () => {
  it('should trigger goToScanner action when both phrases are matched', () => {
    let isUpdateLoadingStatusCalled = false;
    const props = {
      storedPhrase: 'phrase',
      isLoading: false,
      goToScanner: () => {},
      goBack: () => {},
      updateLoadingStatus: () => {
        isUpdateLoadingStatusCalled = true;
        return updateLoadingStatus(true);
      },
      theme: defaultTheme,
    };
    const state = {
      isReadyToImport: false,
      isButtonEnabled: false,
      isPhraseMatched: false,
      seedValue: 'phrase',
    };

    const wrapper = shallow(<ConfirmSeedPhrase {...props} />);
    wrapper.instance().setState(state);
    const importBtnProps = wrapper
      .find(Button)
      .first()
      .props();
    // tslint:disable-next-line: no-unused-expression
    importBtnProps.onPress && importBtnProps.onPress();
    expect(importBtnProps.onPress).not.toBeUndefined();
    // @ts-ignore
    expect(wrapper.instance().state.isPhraseMatched).toBe(true);
    expect(isUpdateLoadingStatusCalled).toBe(true);
  });

  it('should set state isPhraseMatched to false when phrases are not matched', () => {
    const props = {
      storedPhrase: 'phrase',
      isLoading: false,
      goToScanner: () => {},
      goBack: () => {},
      updateLoadingStatus: () => updateLoadingStatus(false),
      theme: defaultTheme,
    };
    const state = {
      isReadyToImport: false,
      isButtonEnabled: false,
      isPhraseMatched: false,
      seedValue: 'phrase not equal to storedPhrase',
    };
    const wrapper = shallow(<ConfirmSeedPhrase {...props} />);
    wrapper.instance().setState(state);
    const importBtnProps = wrapper
      .find(Button)
      .first()
      .props();
    // tslint:disable-next-line: no-unused-expression
    importBtnProps.onPress && importBtnProps.onPress();
    expect(importBtnProps.onPress).not.toBeUndefined();
    // @ts-ignore
    expect(wrapper.instance().state.isPhraseMatched).toBe(false);
  });
});

describe('on press back icon', () => {
  it('should invoke goBack method', () => {
    let isGoBackClicked: boolean = false;
    const props = {
      storedPhrase: 'phrase',
      isLoading: false,
      goToScanner: () => {},
      goBack: () => {
        isGoBackClicked = true;
        return { type: 'empty' };
      },
      updateLoadingStatus: () => updateLoadingStatus(false),
      theme: defaultTheme,
    };
    const wrapper = shallow(<ConfirmSeedPhrase {...props} />);
    const goBackIcon = wrapper
      .find(IconButton)
      .first()
      .props();
    // @ts-ignore
    goBackIcon.onPress();
    expect(isGoBackClicked).toBe(true);
  });
});
