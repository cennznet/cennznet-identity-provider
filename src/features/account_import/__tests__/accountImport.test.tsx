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

import { AccountImport } from './../accountImport';
import React from 'react';
import { shallow } from 'enzyme';
import { ImportAccountStatus } from './../types';
import { importAccountByPhrase, updateImportAccountStatus } from './../actions';
import { Button, IconButton } from 'react-native-paper';
import { TextInput } from 'react-native';
import { defaultTheme } from '../../../common/themes/default';

describe('account import - localization test', () => {
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
      importAccountStatus: ImportAccountStatus.Processing,
      importAccountByPhrase,
      updateImportAccountStatus,
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };
    expect(localizeCallCount).toBe(0);
    const wrapper = shallow(<AccountImport {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(localizeCallCount).toBeGreaterThan(0);
  });
});

describe('account import - account phrase length test', () => {
  it('should disable the import button if the length of phrase is less than 12', () => {
    const props = {
      importAccountStatus: ImportAccountStatus.Processing,
      importAccountByPhrase,
      updateImportAccountStatus,
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };
    const invalidPhrase = 'test phrase';
    const wrapper = shallow(<AccountImport {...props} />);
    const accountInputProps = wrapper
      .find(TextInput)
      .first()
      .props();
    //@ts-ignore
    accountInputProps.onChangeText(invalidPhrase);
    const importBtn = wrapper.find(Button).first();
    expect(accountInputProps.onChangeText).not.toBeUndefined();
    expect(importBtn.props().disabled).toBe(true);
  });

  it('should enable the import button if the length of phrase is greater or equal to 12', () => {
    const props = {
      importAccountStatus: ImportAccountStatus.Fail,
      importAccountByPhrase,
      updateImportAccountStatus,
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };
    const validPhrase = 'pupil usage price sketch inject wheel latin add once cheap zoo salmon';
    const wrapper = shallow(<AccountImport {...props} />);
    const accountInputProps = wrapper
      .find(TextInput)
      .first()
      .props();
    //@ts-ignore
    accountInputProps.onChangeText(validPhrase);
    const importBtn = wrapper.find(Button).first();
    expect(accountInputProps.onChangeText).not.toBeUndefined();
    expect(importBtn.props().disabled).toBe(false);
  });
});

describe('account import - import account status test', () => {
  it('should show a loading icon in button when importing status is processing', () => {
    const props = {
      importAccountStatus: ImportAccountStatus.Processing,
      importAccountByPhrase,
      updateImportAccountStatus,
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };
    const wrapper = shallow(<AccountImport {...props} />);
    expect(wrapper.contains('localized text')).toBe(true);
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(Button).props().loading).toEqual(true);
  });

  it('should update the import status when importing an account phrase', () => {
    let updatedStatus: ImportAccountStatus = ImportAccountStatus.Fail;
    const props = {
      importAccountStatus: ImportAccountStatus.Fail,
      importAccountByPhrase,
      updateImportAccountStatus: (status: ImportAccountStatus) => {
        updatedStatus = status;
      },
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };
    const validPhrase = 'pupil usage price sketch inject wheel latin add once cheap zoo salmon';
    const wrapper = shallow(<AccountImport {...props} />);
    const accountInputProps = wrapper
      .find(TextInput)
      .first()
      .props();
    //@ts-ignore
    accountInputProps.onChangeText(validPhrase);
    expect(accountInputProps.onChangeText).not.toBeUndefined();
    expect(updatedStatus).toBe(ImportAccountStatus.Wait);
  });
});

describe('account import - import actions test', () => {
  it('should trigger the import phrase action when the import button is pressed', () => {
    let importActionIsTriggered = false;
    const props = {
      importAccountStatus: ImportAccountStatus.Wait,
      importAccountByPhrase: (phrase: string) => {
        importActionIsTriggered = true;
      },
      updateImportAccountStatus,
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };
    const wrapper = shallow(<AccountImport {...props} />);

    const importBtnProps = wrapper
      .find(Button)
      .first()
      .props();
    //@ts-ignore
    importBtnProps.onPress();
    expect(importBtnProps.onPress).not.toBeUndefined();
    expect(importActionIsTriggered).toBe(true);
  });

  it('should go back if click back button', () => {
    let isGoBackClicked: boolean = false;
    const props = {
      importAccountStatus: ImportAccountStatus.Wait,
      importAccountByPhrase: (phrase: string) => {},
      updateImportAccountStatus,
      goBack: () => {
        isGoBackClicked = true;
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };
    const wrapper = shallow(<AccountImport {...props} />);
    const goBackBtn = wrapper
      .find(IconButton)
      .first()
      .props();
    // @ts-ignore
    goBackBtn.onPress();
    expect(isGoBackClicked).toBe(true);
  });
});

describe('account import - style getter tests', () => {
  it('should call all style getter methods when onBlur is called on TextInput', () => {
    (String.prototype as any).localized = () => {
      return 'localized text';
    };

    const props = {
      importAccountStatus: ImportAccountStatus.Fail,
      importAccountByPhrase: (phrase: string) => {},
      updateImportAccountStatus,
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };

    const wrapper = shallow(<AccountImport {...props} />);

    const getSeedBoxStyleSpy = jest.spyOn(AccountImport.prototype, 'getSeedBoxStyle');
    const getSeedBoxLabelStyleSpy = jest.spyOn(AccountImport.prototype, 'getSeedBoxLabelStyle');
    const getInputBoxHintStyleSpy = jest.spyOn(AccountImport.prototype, 'getInputBoxHintStyle');

    const textInputProps = wrapper
      .find(TextInput)
      .first()
      .props();

    //@ts-ignore
    textInputProps.onBlur();

    expect(getSeedBoxStyleSpy).toBeCalled();
    expect(getSeedBoxLabelStyleSpy).toBeCalled();
    expect(getInputBoxHintStyleSpy).toBeCalled();
  });

  it('should call all style getter methods when onFocus is called on TextInput', () => {
    (String.prototype as any).localized = () => {
      return 'localized text';
    };

    const props = {
      importAccountStatus: ImportAccountStatus.Fail,
      importAccountByPhrase: (phrase: string) => {},
      updateImportAccountStatus,
      goBack: () => {
        return { type: 'empty' };
      },
      theme: defaultTheme,
    };

    const wrapper = shallow(<AccountImport {...props} />);

    const spy = jest.spyOn(AccountImport.prototype, 'getSeedBoxStyle');
    const spy2 = jest.spyOn(AccountImport.prototype, 'getSeedBoxLabelStyle');
    const spy3 = jest.spyOn(AccountImport.prototype, 'getInputBoxHintStyle');

    const textInputProps = wrapper
      .find(TextInput)
      .first()
      .props();

    //@ts-ignore
    textInputProps.onFocus();

    expect(spy).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });
});
