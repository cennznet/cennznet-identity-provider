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

import { decompressFromEncodedURIComponent } from 'lz-string';
import BN from 'bn.js';

export enum QRActions {
  SUBSTRATE_SIGN_TX = 'SUBSTRATE_SIGN_TX',
}

// Not all fields are used as payload, some fields are just used to display
export interface ISubstrateTxContent {
  assetId: string;
  amount: string;
  feeAssetId: string;
  fee: string;
  toAddress: string;
}

type IQRDataType = ISubstrateTxContent;

export interface IQRContent {
  action: QRActions;
  version: number;
  data: IQRDataType;
}

const isBigNumber = (uncheckedValue: any): boolean => {
  try {
    const tryAmount = new BN(uncheckedValue);
    return true;
  } catch (e) {
    return false;
  }
};

export const isISubstrateTxContent = (uncheckedObj: any): uncheckedObj is ISubstrateTxContent => {
  const txContentObj: ISubstrateTxContent = uncheckedObj;
  if (
    !(
      txContentObj.amount &&
      txContentObj.assetId &&
      txContentObj.feeAssetId &&
      txContentObj.fee &&
      txContentObj.toAddress
    )
  ) {
    return false;
  }

  return isBigNumber(txContentObj.amount) && isBigNumber(txContentObj.fee);
};

export const parseQR = (rawData: string): IQRContent | undefined => {
  let rawObj;
  let decodedRawData;
  // decompress QR code
  try {
    decodedRawData = decompressFromEncodedURIComponent(rawData);
    if (!decodedRawData) {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }

  // Parse to Json object
  try {
    rawObj = JSON.parse(decodedRawData);
  } catch (e) {
    return undefined;
  }

  // type validation
  if (!(rawObj.action === QRActions.SUBSTRATE_SIGN_TX && isISubstrateTxContent(rawObj.data))) {
    return undefined;
  }

  return rawObj as IQRContent;
};
