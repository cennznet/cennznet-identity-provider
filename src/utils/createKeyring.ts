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

import { cryptoWaitReady } from '@plugnet/util-crypto';
import { SimpleKeyring } from '@plugnet/wallet';

export const createKeyring = async (
  phrase: string,
): Promise<{
  keyring: SimpleKeyring;
  address: string;
}> => {
  await cryptoWaitReady();
  const keyring = new SimpleKeyring();
  const keyPair = keyring.addFromMnemonic(phrase);

  return { keyring, address: keyPair.address };
};
