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

import { getKeyringPair } from '../keyringPairHelper';
import { getAccountPhrase } from '../keychainHelper';
import { cryptoWaitReady } from '@polkadot/util-crypto';

describe('KeyringPair helper', () => {
  it('should get the correct keyringPair', async () => {
    (getAccountPhrase as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return 'pupil usage price sketch inject wheel latin add once cheap zoo salmon';
    });
    await cryptoWaitReady();
    const keyringPair = await getKeyringPair();
    expect(keyringPair).not.toBe(undefined);
  });
  it('should get undefined if no phrase stored in keychain', async () => {
    (getAccountPhrase as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return undefined;
    });
    const keyringPair = await getKeyringPair();
    expect(keyringPair).toBe(undefined);
  });
});
