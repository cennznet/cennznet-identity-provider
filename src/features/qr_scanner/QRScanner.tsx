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
import { Dimensions, StyleSheet, Text, View, BackHandler, Platform } from 'react-native';
import { RNCamera, Point, Size, BarCodeType } from 'react-native-camera';
const { width: winWidth, height: winHeight } = Dimensions.get('window');
import { IProps } from './index';
import { parseQR, QRActions } from '../../utils/qrCodeParse';
import { Actions } from 'react-native-router-flux';
import { ILocal } from '../../../typing';
import { QRRecognisedFailedDialog } from './QRRecognisedFailed/QRRecognisedFailedDialog';
import { Button } from 'react-native-paper';
import { normalizeFont } from '../../utils/stylingHelper';
import { featureToggleHelper } from '../../utils/featureToggleHelper';
import { setTestId } from '../../utils/integrationTestHelper';

class QRScanner extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.decodeQR = this.decodeQR.bind(this);
  }

  public componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.props.exitApp);
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.props.exitApp);
  }

  public decodeQR(event: {
    data: string;
    rawData?: string;
    type: keyof BarCodeType;
    bounds:
      | { width: number; height: number; origin: Array<Point<string>> }
      | { origin: Point<string>; size: Size<string> };
  }) {
    const rawData = event.data;
    const decodedContent = parseQR(rawData);
    if (decodedContent) {
      if (decodedContent.action === QRActions.SUBSTRATE_SIGN_TX) {
        Actions.txConfirmation();
        this.props.showQRContent(decodedContent);
      }
    } else {
      this.props.showQRRecognisedFailedDialog();
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            {...setTestId('qrScannerTitle')}
            style={[styles.headerTitle, this.props.theme.title]}
          >
            {(('qrScanner.title' as unknown) as ILocal).localized()}
          </Text>
        </View>
        {/* Two buttons below are part of a feature toggle, showed only in DEV env. */}
        <View>
          {__DEV__ ? (
            <View style={styles.buttonContainer}>
              <Button
                {...setTestId('qrScannerValidQRCode')}
                style={styles.button}
                mode="contained"
                onPress={() => {
                  this.decodeQR(featureToggleHelper('validQRcode'));
                }}
              >
                valid
              </Button>
              <Button
                style={styles.button}
                mode="contained"
                onPress={() => {
                  this.decodeQR(featureToggleHelper('invalidQRcode'));
                }}
              >
                invalid
              </Button>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.qrContainer}>
          {this.props.isStartToScan && (
            <RNCamera
              ref={ref => {
                // @ts-ignore
                this.camera = ref;
              }}
              style={styles.qrCamera}
              onBarCodeRead={this.decodeQR}
              captureAudio={false}
              androidCameraPermissionOptions={null}
              notAuthorizedView={
                <View style={styles.authorizationContainer}>
                  {Platform.OS === 'ios' ? (
                    <Text style={[styles.notAuthorizedText, this.props.theme.subtitle]}>
                      <Text style={{ textAlign: 'justify' }}>
                        {(('qrScanner.iosNotAuthorizedText' as unknown) as ILocal).localized()}
                      </Text>
                      {'\n\n'}
                      {(('qrScanner.guideStep1' as unknown) as ILocal).localized()}
                      {'\n'}
                      {(('qrScanner.guideStep2' as unknown) as ILocal).localized()}
                      {'\n'}
                      {(('qrScanner.guideStep3_1' as unknown) as ILocal).localized()}
                      <Text style={{ fontWeight: 'bold' }}>
                        {(('qrScanner.guideStep3_2' as unknown) as ILocal).localized()}
                      </Text>
                      {'\n'}
                      {(('qrScanner.guideStep4_1' as unknown) as ILocal).localized()}
                      <Text style={{ fontWeight: 'bold' }}>
                        {(('qrScanner.guideStep4_2' as unknown) as ILocal).localized()}
                      </Text>
                      {(('qrScanner.guideStep4_3' as unknown) as ILocal).localized()}
                    </Text>
                  ) : (
                    <Text style={[styles.notAuthorizedText, this.props.theme.subtitle]}>
                      {(('qrScanner.androidNotAuthorizedText' as unknown) as ILocal).localized()}
                    </Text>
                  )}
                </View>
              }
            >
              <View style={styles.qrDetector} />
            </RNCamera>
          )}
        </View>
        <QRRecognisedFailedDialog
          isShowQRRecognisedFailedDialog={this.props.isShowQRRecognisedFailedDialog}
          closeDialog={this.props.closeQRRecognisedFailedDialog}
          theme={this.props.theme}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    paddingLeft: 30,
    flexGrow: 1,
    fontSize: 24,
    textAlign: 'center',
  },
  qrContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCamera: {
    justifyContent: 'center',
    height: winHeight * 0.5,
    width: winWidth * 0.7,
    overflow: 'hidden',
  },
  qrDetector: {
    borderWidth: 3,
    borderColor: 'green',
    height: winHeight * 0.5,
    width: winWidth * 0.7,
  },
  authorizationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notAuthorizedText: {
    textAlign: 'left',
    padding: 15,
  },
  buttonContainer: {
    width: '100%',
    paddingLeft: 70,
    paddingRight: 70,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 10,
    fontSize: 14,
    width: 100,
  },
});

export default QRScanner;
