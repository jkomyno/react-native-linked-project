/**
 * Author: Alberto Schiabel
 * Purpose: Centralization of every color used in the app
 * Date: 07 March 2017
 *
 * The same color patterns may differ slightly from platform to platform.
 * Therefore, it's useful having separated files for Android and iOS
 */

const colors = {
  primaryColorLight: '',
  primaryColorDark: '',
  secondaryColorLight: '',
  secondaryColorDark: '',
  cardColor: '',
  backgroundMatch: {
    gradientStart: '',
    gradientEnd: '',
  },
  textGradient: {
    gradientStart: '',
    gradientEnd: '',
  },
  contextMenu: {
    divider: 'rgba(255,255,255,0.5)',
  },
  TopBarGallery: {
    background: '#f7e8e6',
    idleIcon: '#dd9b99',
    selectedIcon: '#ec514c',
  },
  gradients: {
    buttonWarm: [
      'rgba(243, 107, 60, 0.8)',
      '#EC504C',
    ],
    buttonCold: [
      '#daa446',
      '#ea434a',
    ],
    buttonBlue: [
      '#30a0c3',
      '#7b33cb',
    ],
    buttonPurple: [
      'rgba(123, 27, 221, 0.8)',
      'rgba(221, 26, 114, 0.8)',
    ],
    profileSection: [
      '#39b25b',
      '#87e72a',
    ],
    likedcardsSection: [
      '#62a3ee',
      '#0cc5e0',
    ],
    swipecardsSection: [
      '#EC504C',
      '#f77e42',
    ],
    chatSection: [
      'rgba(123, 27, 221, 0.8)',
      'rgba(221, 26, 114, 0.8)',
    ],
  },
  primaryText: '#00000',
  secondaryText: '#918d9c',
  mainBackground: '#fbf8f7',
  mainText: '#39b25b',
  mainColor: '#EC504C',
  secondaryBackground: '#f4f7fe',
  secondaryColor: '#39b25b',
  secondaryElement: '',
  chatBackground: '',
  likedCardsColor: '#0cc5e0',
  chatColor: '#C6FFAC',
  profileBackground: '#ecf5ea',
  profileColor: '#39b25b',
};

export default colors;
