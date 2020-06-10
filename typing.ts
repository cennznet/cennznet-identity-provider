import { TranslateOptions } from 'i18n-js';

export interface ILocal extends String {
  localized: (config?: TranslateOptions) => (string)
}
