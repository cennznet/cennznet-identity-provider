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

import { SEND_SUBSTRATE_TX } from '../transaction_send/substrate/actions';
import { Api } from '@cennznet/api';
import { IAction } from '../../store/rootActions';

export interface ISubstrateTxDetail {
  receiverAddress: string;
  assetID: number;
  amount: string;
  feeAmount: string;
}

export enum TransactionStatus {
  Wait,
  Processing,
  Success,
  Fail,
}

export const CLOSE_TX_CONFIRMATION_DIALOG = 'CLOSE_TX_CONFIRMATION_DIALOG';
export const UPDATE_TRANSACTION_STATUS = 'UPDATE_TRANSACTION_STATUS';

export interface ISendSubstrateTx extends IAction {
  type: typeof SEND_SUBSTRATE_TX.REQUEST;
  payload: ISubstrateTxDetail;
}

export interface ISendSubstrateTxSuccess extends IAction {
  type: typeof SEND_SUBSTRATE_TX.SUCCESS;
  payload: {
    isInitApi: boolean;
    api: Api;
  };
}

export interface ISendSubstrateTxFail extends IAction {
  type: typeof SEND_SUBSTRATE_TX.FAIL;
}

export interface ICloseTxConfirmationDialog extends IAction {
  type: typeof CLOSE_TX_CONFIRMATION_DIALOG;
}

export interface IUpdateTransactionStatus extends IAction {
  type: typeof UPDATE_TRANSACTION_STATUS;
  payload: TransactionStatus;
}

export type TxConfirmationActionTypes =
  | ISendSubstrateTx
  | ICloseTxConfirmationDialog
  | IUpdateTransactionStatus;
