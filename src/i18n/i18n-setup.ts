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

import i18n, { TranslateOptions } from 'i18n-js';
import memoize from 'lodash.memoize';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

const translationGetters = {
  en: () => require('./translations/en.json'),
};

export const Translate = memoize(
  (key: string, options = undefined) => i18n.t(key, options),
  (key: string, options: TranslateOptions) => (options ? key + JSON.stringify(options) : key),
);

// @ts-ignore
String.prototype.localized = function(options?: TranslateOptions): string {
  // @ts-ignore
  return i18n.t(this, options);
};

export const setI18nConfig = () => {
  const fallback = { languageTag: 'en', isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

  // @ts-ignore
  Translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // @ts-ignore
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};
