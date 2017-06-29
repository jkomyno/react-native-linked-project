import { StyleSheet } from 'react-native';
import {
  colors,
  dims,
} from 'skydreamer/config';
import Scaling from 'skydreamer/utils/scaling';

const BaseStyle = Scaling.newStylesheet({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
