import { StyleSheet } from 'react-native';
import {
  colors,
  dims,
} from 'skydreamer/config';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
  textContainer: {
  },
  invitationContainer: {
    marginTop: 25,
    marginHorizontal: 20,
    minHeight: 200,
    maxHeight: 200,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modal: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textValue: {
    color: '#fff',
    fontSize: dims.valueFontSize,
    fontFamily: 'Poppins-Light',
    justifyContent: 'flex-start',
  },
  upperTitle: {
    color: '#ffffff',
    fontSize: dims.actionFontSize,
    lineHeight: dims.actionFontSize * 1.5,
    fontFamily: 'Poppins-Light',
    textAlign: 'left',
    marginBottom: 0,
    paddingBottom: 0,
  },
  inviteTitle: {
    color: '#ffffff',
    fontSize: dims.headerFontSize,
    fontFamily: 'Poppins-Light',
    textAlign: 'left',
    marginleft: 12,
  },
  textTitle: {
    color: '#ffffff',
    fontSize: dims.actionFontSize,
    fontFamily: 'Poppins-Light',
    textAlign: 'left',
    lineHeight: dims.actionFontSize * 1.3,
    marginTop: -15,
    paddingTop: 0,
  },
  pageNumber: {
    color: '#ffffff',
    fontSize: dims.pageFontSize,
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
  },
  sliderLabel: {
    color: '#ffffff',
    fontSize: dims.subtitleFontSize,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: dims.mainContainerPadding,
    marginRight: dims.mainContainerPadding,
    bottom: 50,
  },
  sign: {
    color: '#ffffff',
    fontSize: dims.subtitleFontSize,
    fontFamily: 'Poppins-Regular',
  },
  topicRow: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: dims.mainContainerPadding,
  },
  socialIcon: {
    height: 38,
    width: 38,
    borderRadius: 4,
    marginRight: 35,
  },
  socialRow: {
    flex: 1,
    flexDirection: 'row',
  },
  dateRow: {
    flexDirection: 'row',
  },
  year: {
    color: '#ffffff',
    fontSize: 40,
    paddingTop: 30,
    paddingLeft: 20,
    textAlign: 'right',
    fontFamily: 'Poppins-Light',
  },
  slider: {
    top: 35,
    width: dims.SCREEN_WIDTH * 0.75,
    marginLeft: dims.mainContainerPadding,
    marginRight: dims.mainContainerPadding,
    zIndex: 1,
  },
});

export default styles;
