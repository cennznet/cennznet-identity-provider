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

import { QRScannerActionTypes, SHOW_TX_CONTENT } from '../qr_scanner/types';
import { ISubstrateTxContent, QRActions } from '../../utils/qrCodeParse';
import {
  CLOSE_TX_CONFIRMATION_DIALOG,
  TxConfirmationActionTypes,
  TransactionStatus,
  UPDATE_TRANSACTION_STATUS,
} from './types';

export type TxActionsType = QRActions | undefined;
export type TxContentType = ISubstrateTxContent | undefined;
export interface ITxConfirmationState {
  isShowTxConfirmationDialog: boolean;
  txAction: TxActionsType;
  txContent: TxContentType;
  txStatus: TransactionStatus;
}

const initialState: ITxConfirmationState = {
  isShowTxConfirmationDialog: false,
  txAction: undefined,
  txContent: undefined,
  txStatus: TransactionStatus.Wait,
};

export function txConfirmationReducer(
  state = initialState,
  action: QRScannerActionTypes | TxConfirmationActionTypes,
): ITxConfirmationState {
  switch (action.type) {
    case SHOW_TX_CONTENT:
      return {
        ...state,
        isShowTxConfirmationDialog: true,
        txAction: action.payload.action,
        txContent: action.payload.data,
        txStatus: TransactionStatus.Wait,
      };
    case CLOSE_TX_CONFIRMATION_DIALOG:
      return {
        ...state,
        isShowTxConfirmationDialog: false,
      };
    case UPDATE_TRANSACTION_STATUS:
      return {
        ...state,
        txStatus: action.payload,
      };
    default:
      return state;
  }
}
