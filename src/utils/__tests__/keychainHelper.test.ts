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

import * as Keychain from 'react-native-keychain';
import { saveAccountPhrase, getAccountPhrase, cleanAccountPhrase } from '../keychainHelper';

describe('Test: Save account phrases', () => {
  it('should store the account phrase successfully', async () => {
    (Keychain.setGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return true;
    });
    const testPhrase = 'pupil usage price sketch inject wheel latin add once cheap zoo salmon';
    const res = await saveAccountPhrase(testPhrase);
    expect(res).toBe(true);
  });

  it('should return false if store phrase failed', async () => {
    (Keychain.setGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return false;
    });
    const testPhrase = 'pupil usage price sketch inject wheel latin add once cheap zoo salmon';
    const res = await saveAccountPhrase(testPhrase);
    expect(res).toBe(false);
  });

  it('should return false if throw errors when store phrase', async () => {
    (Keychain.setGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      throw new Error('test - throw errors');
    });
    const testPhrase = 'pupil usage price sketch inject wheel latin add once cheap zoo salmon';
    const res = await saveAccountPhrase(testPhrase);
    expect(res).toBe(false);
  });
});

describe('Test: get account phrases', () => {
  it('should return a phrase if a phrase is saved', async () => {
    const phrase = 'test phrase';
    (Keychain.getGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return { password: phrase };
    });

    const savedPhrase = await getAccountPhrase();
    expect(savedPhrase).toBe(phrase);
  });
  it('should return undefined if no phrase is saved', async () => {
    (Keychain.getGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return undefined;
    });
    const savedPhrase = await getAccountPhrase();
    expect(savedPhrase).toBeUndefined();
  });

  it('should return undefined if throw an error when get phrase', async () => {
    (Keychain.getGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      throw new Error('test - throw errors');
    });
    const savedPhrase = await getAccountPhrase();
    expect(savedPhrase).toBeUndefined();
  });
});

describe('Test: Clean account phrases', () => {
  it('should return true if reset phrase successful', async () => {
    (Keychain.resetGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return true;
    });
    const res = await cleanAccountPhrase();
    expect(res).toBe(true);
  });

  it('should return false if reset phrase failed', async () => {
    (Keychain.resetGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      return false;
    });
    const res = await cleanAccountPhrase();
    expect(res).toBe(false);
  });

  it('should return false if throw errors when reset phrase', async () => {
    (Keychain.resetGenericPassword as jest.Mock) = jest.fn().mockImplementationOnce(() => {
      throw new Error('test - throw errors');
    });
    const res = await cleanAccountPhrase();
    expect(res).toBe(false);
  });
});
