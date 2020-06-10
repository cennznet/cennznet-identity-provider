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
import { closeTxConfirmationDialog } from './actions';
import { TransactionConfirmationDialog } from './TransactionConfirmationDialog';
import { QRActions, ISubstrateTxContent } from '../../utils/qrCodeParse';
import { ISubstrateTxDetail, TransactionStatus } from './types';
import { TxActionsType, TxContentType } from './reducer';
import { Actions } from 'react-native-router-flux';
import { getAssetBySymbol, IAsset } from '../../utils/getAsset';
import { sendSubstrateTx, SEND_SUBSTRATE_TX } from '../transaction_send/substrate/actions';
import withDefaultStyling, { IThemeProps } from '../HOC/DefaultStylingHOC';

const mapStateToProps = (state: RootState) => ({
  isShowTxConfirmationDialog: state.txConfirmation.isShowTxConfirmationDialog,
  txAction: state.txConfirmation.txAction,
  txContent: state.txConfirmation.txContent,
  txStatus: state.txConfirmation.txStatus,
});

const sendTx = (txAction: TxActionsType, txContent: TxContentType) => {
  if (__DEV__) {
    return {
      type: SEND_SUBSTRATE_TX.SUCCESS,
      payload: {
        isInitApi: true,
        api: null,
      },
    };
  }
  if (txAction === QRActions.SUBSTRATE_SIGN_TX) {
    const txInfo = txContent as ISubstrateTxContent;
    const assetId = (getAssetBySymbol(txInfo.assetId) as IAsset).id;
    const txDetails: ISubstrateTxDetail = {
      feeAmount: txInfo.fee,
      amount: txInfo.amount,
      assetID: assetId,
      receiverAddress: txInfo.toAddress,
    };
    return sendSubstrateTx(txDetails);
  }

  return {
    type: 'empty',
  };
};

const closeDialog = () => {
  Actions.pop();
  return closeTxConfirmationDialog();
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTransaction: (txAction: TxActionsType, txContent: TxContentType) =>
    dispatch(sendTx(txAction, txContent)),
  closeTxConfirmationDialog: () => dispatch(closeDialog()),
});

export type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IThemeProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withDefaultStyling(TransactionConfirmationDialog));
