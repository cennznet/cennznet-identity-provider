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

import {
  QRScannerActionTypes,
  START_TO_SCAN,
  SHOW_TX_CONTENT,
  CLOSE_QR_RECOGNISED_FAILED_DIALOG,
  SHOW_QR_RECOGNISED_FAILED_DIALOG,
  DISABLE_TO_SCAN,
} from './types';
export interface IQRScannerState {
  isStartToScan: boolean;
  isShowQRRecognisedFailedDialog: boolean;
}

const initialState: IQRScannerState = {
  isStartToScan: true,
  isShowQRRecognisedFailedDialog: false,
};

export function qrScannerReducer(
  state = initialState,
  action: QRScannerActionTypes,
): IQRScannerState {
  switch (action.type) {
    case START_TO_SCAN:
      return {
        ...state,
        isStartToScan: true,
      };
    case DISABLE_TO_SCAN:
      return {
        ...state,
        isStartToScan: false,
      };
    case SHOW_TX_CONTENT: {
      return {
        ...state,
        isStartToScan: false,
      };
    }
    case CLOSE_QR_RECOGNISED_FAILED_DIALOG: {
      return {
        ...state,
        isShowQRRecognisedFailedDialog: false,
        isStartToScan: true,
      };
    }
    case SHOW_QR_RECOGNISED_FAILED_DIALOG: {
      return {
        ...state,
        isShowQRRecognisedFailedDialog: true,
        isStartToScan: false,
      };
    }
    default:
      return state;
  }
}
