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

import { Dispatch } from 'redux';
import { accountPhraseLoading } from './actions';
import { connect } from 'react-redux';
import LoadingPage from './LoadingPage';
import withDefaultStyling, { IStyleProps } from '../HOC/DefaultStylingHOC';

const safeAreaViewStyle = {
  backgroundColor: '#013063',
};

const styleProps: IStyleProps = {
  topSafeAreaViewStyle: safeAreaViewStyle,
  bottomSafeAreaViewStyle: safeAreaViewStyle,
  statusBarBackgroundColor: '#013063',
};

const mapStateToProps = ({}) => ({
  ...styleProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAccountPhrase: () => {
    dispatch(accountPhraseLoading());
  },
});

export type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(withDefaultStyling(LoadingPage));
