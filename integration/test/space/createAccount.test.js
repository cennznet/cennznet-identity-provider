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

describe('createAccount Test', () => {
  it('should create an account', () => {
    let  isLoggedIn = false;
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

    $('~landingCreateBtn').waitForDisplayed(10000);
    const createAccountBtn = $('~landingCreateBtn');
    expect(createAccountBtn).not.toBe(null);
    createAccountBtn.click();
    const generateSecretPhraseScreen = $('~generateSecretPhraseView').waitForDisplayed(5000);
    expect(generateSecretPhraseScreen).not.toBe(null);

    $('~seedView').waitForDisplayed(10000);
    let seedValue = '';
    for (let i = 0; i < 12; i++) {
      seedValue += $('~seed' + i).getText() + ' ';
    }

    seedValue = seedValue.trim();

    console.log('Seed = ' + seedValue);

    expect(seedValue.trim().split(' ').length).toBe(12);

    $('~nextBtn').waitForDisplayed(5000);

    $('~nextBtn').click();

    $('~confirmSecretPhraseView').waitForDisplayed(10000);

    const seedBox = $('~seedBox');
    seedBox.click();
    seedBox.addValue(seedValue);

    const confirmSecretPhraseInputBoxLabel = $('~confirmSecretPhraseInputBoxLabel');
    confirmSecretPhraseInputBoxLabel.click();

    const confirmBtn = $('~confirmBtn');
    expect(confirmBtn).not.toBe(null);
    confirmBtn.click();

    const navigatorView = $('~navigatorView').waitForExist(100000);
    expect(navigatorView).not.toBe(null);
  });
});
