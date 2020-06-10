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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../store/rootReducer';
import {
  showTxContent,
  closeQRRecognisedFailedDialog,
  showQRRecognisedFailedDialog,
} from './actions';
import QRScanner from './QRScanner';
import { IQRContent } from '../../utils/qrCodeParse';
import { logout } from '../logout/actions';
import { BackHandler } from 'react-native';
import withDefaultStyling, { IThemeProps } from '../HOC/DefaultStylingHOC';

const mapStateToProps = (state: RootState) => ({
  isStartToScan: state.qrScanner.isStartToScan,
  isShowQRRecognisedFailedDialog: state.qrScanner.isShowQRRecognisedFailedDialog,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showQRContent: (qrContent: IQRContent) => dispatch(showTxContent(qrContent)),
  closeQRRecognisedFailedDialog: () => dispatch(closeQRRecognisedFailedDialog()),
  showQRRecognisedFailedDialog: () => dispatch(showQRRecognisedFailedDialog()),
  logoutFromApp: () => dispatch(logout()),
  exitApp: () => BackHandler.exitApp(),
});

export type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IThemeProps;

export default connect(mapStateToProps, mapDispatchToProps)(withDefaultStyling(QRScanner));
