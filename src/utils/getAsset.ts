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

// Note: this feature can be replaced by cennznet SDK as it contains information of all assets.
export const ASSET_DECIMALS = 18;

enum AssetType {
  STAKING = 'staking',
  SPENDING = 'spending',
  RESERVE = 'reserve',
  USER = 'user',
}

export interface IAsset {
  id: number;
  symbol: string;
  /**
   * @deprecated decimals will always be 18, and we expose it in constants.ts
   */
  decimals: number;
  type: AssetType;
}

const assets: IAsset[] = [
  {
    id: 0,
    symbol: 'CENNZ',
    decimals: ASSET_DECIMALS,
    type: AssetType.STAKING,
  },
  {
    id: 1,
    symbol: 'CENTRAPAY',
    decimals: ASSET_DECIMALS,
    type: AssetType.SPENDING,
  },
  {
    id: 2,
    symbol: 'PLUG',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
  {
    id: 3,
    symbol: 'SYLO',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
  {
    id: 4,
    symbol: 'CERTI',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
  {
    id: 5,
    symbol: 'ARDA',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
  {
    id: 16000,
    symbol: 'CENNZ-T',
    decimals: ASSET_DECIMALS,
    type: AssetType.STAKING,
  },
  {
    id: 16001,
    symbol: 'CENTRAPAY-T',
    decimals: ASSET_DECIMALS,
    type: AssetType.SPENDING,
  },
  {
    id: 16002,
    symbol: 'PLUG-T',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
  {
    id: 16003,
    symbol: 'SYLO-T',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
  {
    id: 16004,
    symbol: 'CERTI-T',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
  {
    id: 16005,
    symbol: 'ARDA-T',
    decimals: ASSET_DECIMALS,
    type: AssetType.RESERVE,
  },
];

export const getAssetBySymbol = (symbol: string): IAsset | undefined =>
  assets.find(asset => asset.symbol === symbol);
