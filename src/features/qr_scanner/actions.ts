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
  SHOW_TX_CONTENT,
  CLOSE_QR_RECOGNISED_FAILED_DIALOG,
  SHOW_QR_RECOGNISED_FAILED_DIALOG,
  START_TO_SCAN,
  DISABLE_TO_SCAN,
} from './types';
import { IQRContent } from '../../utils/qrCodeParse';

export function showTxContent(qrContent: IQRContent): QRScannerActionTypes {
  return {
    type: SHOW_TX_CONTENT,
    payload: qrContent,
  };
}

export function closeQRRecognisedFailedDialog(): QRScannerActionTypes {
  return {
    type: CLOSE_QR_RECOGNISED_FAILED_DIALOG,
  };
}

export function showQRRecognisedFailedDialog(): QRScannerActionTypes {
  return {
    type: SHOW_QR_RECOGNISED_FAILED_DIALOG,
  };
}

export function startToScan(): QRScannerActionTypes {
  return {
    type: START_TO_SCAN,
  };
}

export function disableToScan(): QRScannerActionTypes {
  return {
    type: DISABLE_TO_SCAN,
  };
}
