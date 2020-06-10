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

import { parseQR, QRActions, ISubstrateTxContent, IQRContent } from '../qrCodeParse';
import { compressToEncodedURIComponent } from 'lz-string';

describe('Parse QR code test', () => {
  const validSubstrateTxQRContent = {
    action: QRActions.SUBSTRATE_SIGN_TX,
    version: 1,
    data: {
      assetId: 'CENNZ',
      amount: '10000',
      feeAssetId: 'CPAY',
      fee: '100',
      toAddress: '5GmULrC4sC4rj3FHwcsuQp5W7ymbCnotgEExdxczUKEm4rbc',
    } as ISubstrateTxContent,
  };

  const assetIdIsInvalid = {
    action: QRActions.SUBSTRATE_SIGN_TX,
    version: 1,
    data: {
      asset: 'CENNZ',
      amount: '10000',
      feeAssetId: 'CPAY',
      fee: '100',
      toAddress: '5GmULrC4sC4rj3FHwcsuQp5W7ymbCnotgEExdxczUKEm4rbc',
    },
  };

  const invalidTxAmountIsNotBN = {
    action: QRActions.SUBSTRATE_SIGN_TX,
    version: 1,
    data: {
      assetId: 'CENNZ',
      amount: 'abcdedfgs2344',
      feeAssetId: 'CPAY',
      fee: '100',
      toAddress: '5GmULrC4sC4rj3FHwcsuQp5W7ymbCnotgEExdxczUKEm4rbc',
    } as ISubstrateTxContent,
  };

  const decodeTx = (txInfo: any) => {
    const qrStr = JSON.stringify(txInfo);
    const encoded = compressToEncodedURIComponent(qrStr);
    return encoded;
  };

  it('should be successful if it is a valid substrate tx', () => {
    const encoded = decodeTx(validSubstrateTxQRContent);
    const parsedData = parseQR(encoded) as IQRContent;
    expect(parsedData).not.toBeUndefined();
    const parsedTx = parsedData.data as ISubstrateTxContent;
    expect(parsedData.action).toBe(validSubstrateTxQRContent.action);
    expect(parsedData.version).toBe(validSubstrateTxQRContent.version);
    expect(parsedTx.amount).toBe(validSubstrateTxQRContent.data.amount);
    expect(parsedTx.assetId).toBe(validSubstrateTxQRContent.data.assetId);
    expect(parsedTx.feeAssetId).toBe(validSubstrateTxQRContent.data.feeAssetId);
    expect(parsedTx.fee).toBe(validSubstrateTxQRContent.data.fee);
    expect(parsedTx.toAddress).toBe(validSubstrateTxQRContent.data.toAddress);
  });

  it('should return undefined if assetId feild is invalid', () => {
    const encoded = decodeTx(assetIdIsInvalid);
    const parsedData = parseQR(encoded);
    expect(parsedData).toBeUndefined();
  });

  it('should return undefined if the type of amount is not a big number', () => {
    const encoded = decodeTx(invalidTxAmountIsNotBN);
    const parsedData = parseQR(encoded);
    expect(parsedData).toBeUndefined();
  });

  it('should return undefined if QR string is not compressed', () => {
    const qrStr = 'I am not a valid qr string';
    const parsedData = parseQR(qrStr);
    expect(parsedData).toBeUndefined();
  });

  it('should return undefined if Json parsing has failed', () => {
    const qrStr = "{actions: 'SUBSTRATE_SIGN_TX'}";
    const decoded = compressToEncodedURIComponent(qrStr);
    const parsedData = parseQR(decoded);
    expect(parsedData).toBeUndefined();
  });
});
