/**
 * Author: Alberto Schiabel
 * Purpose: Centralization of every metric used in the app (in padding, margin, fontSize, ...)
 * Date: 07 March 2017
 *
 * The same metric patterns may differ slightly from platform to platform.
 * Therefore, it's useful having separated files for Android and iOS
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const dims = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  slidePadding: 15,
  headerFontSize: 25,
  titleFontSize: 20,
  labelFontSize: 16,
  textFontSize: 16,
  pageFontSize: 20,
  actionFontSize: 36,
  valueFontSize: 60,
  subtitleFontSize: 16,
  chatFontSize: 15,
  mainContainerPadding: 10,
  mainContainerMargin: 5,
  cardPadding: 15,
  chatUserPadding: 5,
  chatFriendMargin: 10,
  iconSize: {
    small: 20,
    medium: 30,
    large: 45,
  },
  topTabBar: 50,
  simpleLabelFontSize: 14,
};

export default dims;
