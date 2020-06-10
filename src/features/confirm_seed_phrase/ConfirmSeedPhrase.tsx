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
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { colors } from '../../common/themes/default';
import { IconButton, Button } from 'react-native-paper';
import { IProps } from './index';
import { countWords } from '../../utils/countWords';
import { ILocal } from '../../../typing';
import { normalizeFont, normalizeWidth, normalizeHeight } from '../../utils/stylingHelper';
import { setTestId } from '../../utils/integrationTestHelper';
import { formatAccountPhrase } from '../../utils/accountFormat';
import getColorStyle from '../../common/utils/getColorStyle';

const MIN_PHRASE_WORD_LENGTH = 12;

interface IState {
  seedValue: string;
  isReadyToImport: boolean;
  isButtonEnabled: boolean;
  isPhraseMatched: boolean;
}

export class ConfirmSeedPhrase extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isReadyToImport: false,
      isButtonEnabled: false,
      isPhraseMatched: true,
      seedValue: '',
    };
  }

  comparePhrases = (storedPhrase: string, typedPhrase: string) => {
    if (storedPhrase !== formatAccountPhrase(typedPhrase)) {
      return false;
    }
    if (!this.props.isLoading) {
      this.props.updateLoadingStatus(true);
      this.props.goToScanner(storedPhrase);
    }
    return true;
  };

  render = () => (
    <ScrollView scrollEnabled={false} keyboardDismissMode="on-drag">
      <View style={styles.container} {...setTestId('confirmSecretPhraseView')}>
        <View>
          <IconButton
            icon="chevron-left"
            size={38}
            color={this.props.theme.colors.backButton}
            onPress={() => {
              this.props.goBack();
            }}
          />
          <Text style={[styles.title, this.props.theme.title]}>
            {(('phraseTextCommon.title' as unknown) as ILocal).localized()}
          </Text>
          <Text style={[styles.subtitle, this.props.theme.subtitle]}>
            {(('phraseTextCommon.subtitle' as unknown) as ILocal).localized()}
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            {...setTestId('seedBox')}
            multiline={true}
            onChangeText={text => {
              this.setState({ isButtonEnabled: countWords(text) >= MIN_PHRASE_WORD_LENGTH });

              if (!this.state.isPhraseMatched) {
                this.setState({ isPhraseMatched: true });
              }

              this.setState({ seedValue: text });
            }}
            selectTextOnFocus={true}
            value={this.state.seedValue}
            placeholder={(('confirmSeedPhrase.inputBoxPlaceHolder' as unknown) as ILocal).localized()}
            placeholderTextColor={colors.placeholder}
            style={[
              styles.textInput,
              this.state.isPhraseMatched
                ? this.state.isReadyToImport
                  ? [
                      getColorStyle(this.props.theme.colors.text),
                      { borderColor: this.props.theme.colors.primary },
                    ]
                  : [
                      getColorStyle(this.props.theme.colors.placeholder),
                      { borderColor: this.props.theme.colors.primary },
                    ]
                : this.state.isReadyToImport
                ? [
                    getColorStyle(this.props.theme.colors.text),
                    { borderColor: this.props.theme.colors.error },
                  ]
                : [
                    getColorStyle(this.props.theme.colors.placeholder),
                    { borderColor: this.props.theme.colors.primary },
                  ],
            ]}
            onBlur={() => this.setState({ isReadyToImport: false })}
            onFocus={() => this.setState({ isReadyToImport: true })}
          />
        </View>
        <Text
          {...setTestId('confirmSecretPhraseInputBoxLabel')}
          style={
            this.state.isPhraseMatched
              ? this.state.isReadyToImport
                ? [
                    styles.readyToImportInputBoxLabel,
                    getColorStyle(this.props.theme.colors.primary),
                  ]
                : styles.inputBoxLabel
              : this.state.isReadyToImport
              ? [styles.readyToImportInputBoxLabel, getColorStyle(this.props.theme.colors.error)]
              : styles.inputBoxLabel
          }
        >
          {(('phraseTextCommon.inputBoxLabel' as unknown) as ILocal).localized()}
        </Text>
        <Text
          style={[
            styles.inputBoxHint,
            this.state.isPhraseMatched
              ? this.state.isReadyToImport
                ? [styles.readyToImportInputBoxHint, getColorStyle(this.props.theme.colors.primary)]
                : getColorStyle(this.props.theme.colors.placeholder)
              : this.state.isReadyToImport
              ? [styles.readyToImportInputBoxHint, getColorStyle(this.props.theme.colors.error)]
              : getColorStyle(this.props.theme.colors.error),
          ]}
        >
          {this.state.isPhraseMatched
            ? (('phraseTextCommon.inputBoxHint' as unknown) as ILocal).localized()
            : (('confirmSeedPhrase.inputBoxErrorHint' as unknown) as ILocal).localized()}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            {...setTestId('confirmBtn')}
            loading={this.props.isLoading}
            mode="contained"
            style={styles.button}
            contentStyle={styles.btnContentStyle}
            disabled={
              !this.state.isButtonEnabled || !this.state.isPhraseMatched || this.props.isLoading
            }
            onPress={() => {
              this.setState({
                isPhraseMatched: this.comparePhrases(this.props.storedPhrase, this.state.seedValue),
              });
            }}
          >
            {this.props.isLoading
              ? (('btnCommon.loading' as unknown) as ILocal).localized()
              : (('btnCommon.confirm' as unknown) as ILocal).localized()}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

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
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 160,
    paddingLeft: 16,
    paddingTop: 20,
    fontSize: 18,
  },
  inputBoxHint: {
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
  },
  readyToImportInputBoxHint: {
    marginTop: 170,
  },
  inputBoxLabel: {
    display: 'none',
  },
  readyToImportInputBoxLabel: {
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
