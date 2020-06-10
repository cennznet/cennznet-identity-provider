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

describe('sending transaction test', () => {
  it('should be successful to send a transaction', () => {
    let isLoggedIn = false;
     /* NOTE: isExisting only works on android
     https://github.com/webdriverio/webdriverio/issues/3441
     */
    try{
      isLoggedIn = $('~homeView').waitForDisplayed(10000);
    }
    catch {}

    if (!isLoggedIn) {
      $('~landingImportBtn').waitForDisplayed(5000);
      const importAccount = $('~landingImportBtn');
      importAccount.click();

      $('~accountImportInput').waitForDisplayed(5000);
      const importAccountTextInput = $('~accountImportInput');
      importAccountTextInput.setValue(
        'pupil usage price sketch inject wheel latin add once cheap zoo salmon',
      );

      $('~accountImportTitle').waitForDisplayed(1000);
      $('~accountImportTitle').click();
      const importAccountImportButton = $('~accountImportBtn');
      importAccountImportButton.click();
    }

    $('~navigatorView').waitForDisplayed(100000);
    $('~qrScanner').waitForDisplayed(1000);
    $('~qrScanner').click();
    $('~qrScannerValidQRCode').waitForDisplayed(10000);
    const qrScannerTrigger = $('~qrScannerValidQRCode');
    qrScannerTrigger.click();
    $('~txConfirmBtn').waitForDisplayed(10000);
    const txConfirmBtn = $('~txConfirmBtn');
    txConfirmBtn.click();
    $('~txSendingSuccessView').waitForDisplayed(200000);
    const txSendingSuccessView = $('~txSendingSuccessView');
    expect(txSendingSuccessView).not.toBe(null);
  });
});
