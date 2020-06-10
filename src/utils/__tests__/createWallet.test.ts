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

/**
 * This test now won't work because there is an issue in @plugnet/wallet in node environment,
 */

import { createKeyring } from '../createKeyring';
// import { createWallet } from './createWallet';

describe('createWallet', () => {
  it('creates a wallet and adds keyring to the wallet', async () => {
    const { keyring, address } = await createKeyring(
      'pupil usage price sketch inject wheel latin add once cheap zoo salmon',
    );
    // const wallet = await createWallet(keyring);
    // const addresses = await wallet.getAddresses();
    // expect(addresses[0]).toBe('5GmULrC4sC4rj3FHwcsuQp5W7ymbCnotgEExdxczUKEm4rbc');
  });
});
