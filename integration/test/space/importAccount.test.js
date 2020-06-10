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

describe('import account steps test', () => {
  it('after phrase import should go to navigator screen', () => {
    let isLoggedIn = false;
     /* NOTE: isExisting only works on android
     https://github.com/webdriverio/webdriverio/issues/3441
     */
    try{
      isLoggedIn = $('~homeView').waitForDisplayed(10000);
    }
    catch {}

    if (isLoggedIn) {
      $('~profile').waitForDisplayed(10000);
      const profileTab = $('~profile');
      profileTab.click();
      $('~logoutBtn').waitForDisplayed(10000);
      const logoutBtn = $('~logoutBtn');
      logoutBtn.click();
    }

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
    const navigatorView = $('~navigatorView').waitForDisplayed(100000); //Delay 100.000 is required for real transaction to have enought time to be finished. After we mock response from Main net this can be reduced to 5000.
    expect(navigatorView).not.toBe(null);
  });
});
