import {StyleSheet} from 'react-native';
import {BaseColor} from '../../config';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    // marginTop: 10,
    padding: 10,
    width: '100%',
  },
  contain: {
    padding: 20,
    marginTop: 20,
    // flex: 1,
    justifyContent: 'center',
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
