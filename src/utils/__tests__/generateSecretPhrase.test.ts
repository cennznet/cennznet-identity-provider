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

import { generateSecretPhrase, formatSecretPhraseToDisplay } from '../generateSecretPhrase';

describe('Generate secret phrase util method test', () => {
  it('should generate a secret phrase', async () => {
    const secretPhrase = await generateSecretPhrase();
    // @ts-ignore
    expect(secretPhrase.split(' ').length).toBe(12);
  });
});

describe('Format the secret phrase to display test', () => {
  it('should format a secret phrase to display correctly', async () => {
    const phrase = 'room maze gold own siren cup fossil ball gun key dry sense';
    const expectedFormat = [
      'room',
      'maze',
      'gold',
      'own',
      'siren',
      'cup',
      'fossil',
      'ball',
      'gun',
      'key',
      'dry',
      'sense',
    ];
    const secretPhrase = formatSecretPhraseToDisplay(phrase);
    // @ts-ignore
    expect(secretPhrase.length).toBe(12);
    expect(secretPhrase).toEqual(expectedFormat);
  });
});
