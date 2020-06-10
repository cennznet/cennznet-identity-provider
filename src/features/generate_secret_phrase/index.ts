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

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../store/rootReducer';
import { Actions } from 'react-native-router-flux';
import { GenerateSecretPhrase } from './GenerateSecretPhrase';
import withDefaultStyling, { IThemeProps } from '../HOC/DefaultStylingHOC';
import * as actions from '../../utils/routerActionHelper';

const mapStateToProps = (state: RootState) => ({
  secretPhrase: state.secretPhraseGenerator.secretPhrase,
  secretPhraseForDisplay: state.secretPhraseGenerator.secretPhraseForDisplay,
});

const goToConfirm = () => {
  actions.navigateTo('confirmSeedPhrase');
  return {
    type: 'empty',
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goBack: () => Actions.pop(),
  goToConfirm: () => dispatch(goToConfirm()),
});

export type IProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IThemeProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withDefaultStyling(GenerateSecretPhrase));
