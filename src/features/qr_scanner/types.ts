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

import { IQRContent } from '../../utils/qrCodeParse';
import { IAction } from '../../store/rootActions';

export const START_TO_SCAN = 'START_TO_SCAN';
export const SHOW_TX_CONTENT = 'SHOW_TX_CONTENT';
export const DISABLE_TO_SCAN = 'DISABLE_TO_SCAN';

export const CLOSE_QR_RECOGNISED_FAILED_DIALOG = 'CLOSE_QR_RECOGNISED_FAILED_DIALOG';
export const SHOW_QR_RECOGNISED_FAILED_DIALOG = 'SHOW_QR_RECOGNISED_FAILED_DIALOG';

export interface IShowQRContentAction extends IAction {
  type: typeof SHOW_TX_CONTENT;
  payload: IQRContent;
}

export interface IStartToScanAction extends IAction {
  type: typeof START_TO_SCAN;
}

export interface IDisableToScanAction extends IAction {
  type: typeof DISABLE_TO_SCAN;
}

export interface ICloseQRRecoginsedFailedDialogAction extends IAction {
  type: typeof CLOSE_QR_RECOGNISED_FAILED_DIALOG;
}

export interface IShowQRRecoginsedFailedDialogAction extends IAction {
  type: typeof SHOW_QR_RECOGNISED_FAILED_DIALOG;
}

export type QRScannerActionTypes =
  | IShowQRContentAction
  | IStartToScanAction
  | ICloseQRRecoginsedFailedDialogAction
  | IShowQRRecoginsedFailedDialogAction
  | IDisableToScanAction;
