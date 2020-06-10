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
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

import { ImportAccountStatus } from './types';
import { countWords } from '../../utils/countWords';
import { Button, IconButton } from 'react-native-paper';
import { ILocal } from '../../../typing';
import { IProps } from './index';
import getColorStyle from '../../common/utils/getColorStyle';
import { setTestId } from '../../utils/integrationTestHelper';
import { normalizeWidth, normalizeHeight } from '../../utils/stylingHelper';

const MIN_PHRASE_WORD_LENGTH = 12;

interface IState {
  seed: string;
  isSeedBoxFocused: boolean;
  isImportEnabled: boolean;
}

export class AccountImport extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { seed: '', isSeedBoxFocused: false, isImportEnabled: false };
  }

  render = () => (
    <ScrollView scrollEnabled={false} keyboardDismissMode="on-drag">
      <View style={styles.container}>
        <View>
          <IconButton
            icon="chevron-left"
            size={38}
            color={this.props.theme.colors.backButton}
            onPress={() => {
              this.props.goBack();
            }}
          />
          <Text {...setTestId('accountImportTitle')} style={[styles.title, this.props.theme.title]}>
            {(('phraseTextCommon.title' as unknown) as ILocal).localized()}
          </Text>
          <Text style={[styles.subtitle, this.props.theme.subtitle]}>
            {(('phraseTextCommon.subtitle' as unknown) as ILocal).localized()}
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            {...setTestId('accountImportInput')}
            multiline={true}
            onChangeText={text => {
              this.setState({ isImportEnabled: countWords(text) >= MIN_PHRASE_WORD_LENGTH });

              if (this.props.importAccountStatus === ImportAccountStatus.Fail) {
                this.props.updateImportAccountStatus(ImportAccountStatus.Wait);
              }

              this.setState({ seed: text });
            }}
            selectTextOnFocus={true}
            value={this.state.seed}
            placeholder={(('accountImport.inputBoxPlaceHolder' as unknown) as ILocal).localized()}
            placeholderTextColor={this.props.theme.colors.placeholder}
            style={this.getSeedBoxStyle()}
            onBlur={() => this.setState({ isSeedBoxFocused: false })}
            onFocus={() => this.setState({ isSeedBoxFocused: true })}
          />
        </View>
        <Text style={this.getSeedBoxLabelStyle()}>
          {(('phraseTextCommon.inputBoxLabel' as unknown) as ILocal).localized()}
        </Text>
        <Text style={this.getInputBoxHintStyle()}>
          {this.props.importAccountStatus === ImportAccountStatus.Wait ? (
            (('phraseTextCommon.inputBoxHint' as unknown) as ILocal).localized()
          ) : this.props.importAccountStatus === ImportAccountStatus.Fail ? (
            (('accountImport.inputBoxErrorHint' as unknown) as ILocal).localized()
          ) : (
            <></>
          )}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            {...setTestId('accountImportBtn')}
            loading={this.props.importAccountStatus === ImportAccountStatus.Processing}
            mode="contained"
            style={styles.button}
            contentStyle={styles.btnContentStyle}
            disabled={!this.state.isImportEnabled}
            onPress={() => {
              this.props.importAccountStatus === ImportAccountStatus.Wait &&
                this.props.importAccountByPhrase(this.state.seed);
            }}
          >
            {this.props.importAccountStatus === ImportAccountStatus.Processing
              ? (('accountImport.buttonTextLoading' as unknown) as ILocal).localized()
              : (('accountImport.buttonText' as unknown) as ILocal).localized()}
          </Button>
        </View>
      </View>
    </ScrollView>
  );

  getSeedBoxStyle() {
    if (this.props.importAccountStatus === ImportAccountStatus.Fail) {
      return [
        styles.seedBox,
        getColorStyle(this.props.theme.colors.text),
        { borderColor: this.props.theme.colors.error },
      ];
    }
    if (this.state.isSeedBoxFocused) {
      return [
        styles.seedBox,
        getColorStyle(this.props.theme.colors.text),
        { borderColor: this.props.theme.colors.primary },
      ];
    }
    return [styles.seedBox, getColorStyle(this.props.theme.colors.placeholder)];
  }
  getSeedBoxLabelStyle() {
    if (!this.state.isSeedBoxFocused) {
      return styles.seedBoxLabelHidden;
    }
    if (this.props.importAccountStatus === ImportAccountStatus.Fail) {
      return [styles.seedBoxLabel, getColorStyle(this.props.theme.colors.error)];
    }
    return [styles.seedBoxLabel, getColorStyle(this.props.theme.colors.primary)];
  }
  getInputBoxHintStyle() {
    if (this.props.importAccountStatus === ImportAccountStatus.Fail) {
      return this.state.isSeedBoxFocused
        ? [
            styles.seedBoxHint,
            styles.seedBoxHintErrorFocused,
            getColorStyle(this.props.theme.colors.error),
          ]
        : [styles.seedBoxHint, getColorStyle(this.props.theme.colors.error)];
    }
    return this.state.isSeedBoxFocused
      ? [
          styles.seedBoxHint,
          styles.seedBoxHintErrorFocused,
          getColorStyle(this.props.theme.colors.primary),
        ]
      : styles.seedBoxHint;
  }
}

export default AccountImport;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 25,
  },
  container: {
    flex: 1,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  subtitle: {
    marginTop: 15,
    textAlign: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  textInputContainer: {
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 40,
    height: 160,
  },
  seedBox: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 160,
    paddingLeft: 16,
    paddingTop: 20,
    color: 'rgba(0,0,0,0.38)',
    fontSize: 18,
  },
  seedBoxHint: {
    color: 'rgba(0,0,0,0.38)',
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
  },
  seedBoxHintErrorFocused: {
    marginTop: 170,
  },
  seedBoxLabelHidden: {
    display: 'none',
  },
  seedBoxLabel: {
    textAlign: 'center',
    alignSelf: 'stretch',
    marginTop: -170,
    marginLeft: 50,
    backgroundColor: 'white',
    width: 120,
    height: 20,
    paddingLeft: 4,
  },
  button: {
    fontSize: 14,
    borderRadius: 50,
    width: normalizeWidth(80),
    height: normalizeHeight(8),
  },
  btnContentStyle: {
    width: normalizeWidth(80),
    height: normalizeHeight(8),
  },
});
