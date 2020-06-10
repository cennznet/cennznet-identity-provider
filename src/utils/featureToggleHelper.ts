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

export const featureToggleHelper = (QRcodeStatus: string) => {
  let data: string;
  let QRcode: any;

  if (QRcodeStatus === 'validQRcode') {
    data =
      'N4IghgxgLglg9gOxALhAZQKoCE0BUBKAgrgKID6aAkgOIByZuAGiADQgBuApgE4DO8SZAEY2AEzBQwKUGF69OUSqJQgAwiVq0AWgFpcrcAFs4AVwRQVQgwDNOnQnIVKV62gUIAFQgE09Nu5YADIEGUHCEoqLcnHIqAKwkABxCohgAzADqJABi1vgALADuWABGcGmJCKLeaABehnHWANbWALLe3AAi1tZwAIqG3kJxhYkAajAw3FYAvjNAA';
  } else {
    data =
      'N4IghgxgLglg9gOxALhAZQKoCE0BUBKAgrgKID6aAkgOIByZuAGiADQgBuApgE4DO8SZAEY2AEzBQwKUGF69OUSqJQgAwiVq0AWq3ABbOAFcEUFUIAMl87oBmnToTkKlK1QAVCATVv2zl3VBwhKKi3JxyKgCs1HoYADLcqgAsvMncAFYAzABihgCKAA6RAOoA7ACeegBGqghwUADmJCQAHqItEABeGADSJHpJ3FUQIAC+o0A';
  }

  const objectTemplate = {
    data,
    type: QRcode,
    rawData: '',
    target: 0,
    bounds: {
      width: 0,
      height: 0,
      origin: [],
    },
  };
  return objectTemplate;
};
