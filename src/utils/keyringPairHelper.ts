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

import { Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { getAccountPhrase } from './keychainHelper';

export const getKeyringPair = async (): Promise<KeyringPair | undefined> => {
  const keyring = new Keyring({
    type: 'sr25519',
  });
  const phrase = await getAccountPhrase();
  if (!phrase) {
    return undefined;
  }
  const keyringPair: KeyringPair = keyring.addFromMnemonic(phrase.trim());
  return keyringPair;
};
