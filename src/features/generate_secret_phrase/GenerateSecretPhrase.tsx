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

import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, IconButton } from 'react-native-paper';
import { IProps } from './index';
import { ILocal } from '../../../typing';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { normalizeWidth, normalizeHeight } from '../../utils/stylingHelper';
import { setTestId } from '../../utils/integrationTestHelper';
import CheckBox from 'react-native-check-box';

export const GenerateSecretPhrase: FunctionComponent<IProps> = props => {
  const [isChecked, setIsChecked] = __DEV__ ? useState(true) : useState(false);

  useEffect(() => {
    setIsChecked(false);
    return () => {};
  }, [props.secretPhrase]);

  return (
    <View style={styles.container} {...setTestId('generateSecretPhraseView')}>
      <View>
        <IconButton
          size={38}
          icon="chevron-left"
          color={props.theme.colors.backButton}
          onPress={() => {
            props.goBack();
          }}
        />
        <Text style={[styles.title, props.theme.title]}>
          {(('generateSecretPhrase.title' as unknown) as ILocal).localized()}
        </Text>
        <Text style={[styles.subtitle, props.theme.subtitle]}>
          {(('generateSecretPhrase.subtitle' as unknown) as ILocal).localized()}
        </Text>
      </View>
      <ScrollView>
        <View {...setTestId('seedView')} style={styles.section}>
          <View style={styles.secretPhrase}>
            {props.secretPhraseForDisplay.map((phrase: string, index: number) => {
              return (
                <View style={styles.phraseBox} key={`phrase${index}`}>
                  <View style={styles.phraseNumberView}>
                    <Text style={styles.phraseNumber}>{index + 1}</Text>
                  </View>
                  <View style={styles.phraseTextView}>
                    <Text {...setTestId(`seed${index}`)} style={styles.phraseText}>
                      {phrase}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              setIsChecked(!isChecked);
            }}
            isChecked={isChecked}
            rightTextStyle={{ color: props.theme.colors.subTitle }}
            rightText={(('generateSecretPhrase.checkBox' as unknown) as ILocal).localized()}
            checkedImage={<Image source={require('../../assets/img/ticked_box_seed_phrase.png')} />}
            unCheckedImage={
              <Image source={require('../../assets/img/unticked_box_seed_phrase.png')} />
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            {...setTestId('nextBtn')}
            mode="contained"
            disabled={!isChecked}
            style={styles.button}
            contentStyle={styles.btnContentStyle}
            onPress={() => {
              props.goToConfirm();
            }}
          >
            {(('btnCommon.next' as unknown) as ILocal).localized()}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  secretPhrase: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'baseline',
    marginTop: 38,
    marginRight: 15,
    marginLeft: 15,
  },
  phraseBox: {
    margin: 2,
    marginBottom: 32,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'space-around',
  },
  phraseTextView: {
    borderRadius: 27,
    backgroundColor: '#F5F5F5',
    marginTop: -10,
    padding: 15,
    alignSelf: 'center',
  },
  phraseText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#013063',
    fontFamily: 'OpenSans-Regular',
    textTransform: 'capitalize',
    letterSpacing: 0.25,
  },
  phraseNumberView: {
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 27,
    zIndex: 1,
  },
  phraseNumber: {
    borderRadius: 27,
    width: 25,
    height: 25,
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.6)',
    fontFamily: 'OpenSans-Regular',
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
    alignItems: 'center',
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
  checkBoxContainer: {
    margin: 10,
    alignItems: 'center',
  },
  checkBox: {
    width: normalizeWidth(80),
  },
});
