import { Text} from '../../components';
import {useTheme, Images, BaseSetting} from '../../config';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image,View} from 'react-native';
import styles from './styles';
import {onChangeLanguage} from '../../redux/slices/application';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import 'moment/locale/de'; // German
import 'moment/locale/en-gb'; // 
interface LoadingScreenProps {}
const Loading: React.FC<LoadingScreenProps> = () => {
  const {isAuthenticated} = useSelector((state: any) => state.Auth);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const {colors} = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const onProcess = async () => {
      // Get current language of device
      const locales = RNLocalize.getLocales();
      const {languageCode} = locales?.[0] ?? {
        languageCode: BaseSetting.defaultLanguage,
      };
      dispatch(onChangeLanguage(languageCode));
      // moment.locale(languageCode)
      // Config language for app
      await i18n.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        resources: BaseSetting.resourcesLanguage,
        lng: languageCode,
        fallbackLng: "en",
      });
      if (isAuthenticated) {
        if(auth().currentUser?.emailVerified){
          navigation.replace('Main');
        }else{
          navigation.replace('VerifyEmail');
        }
        // navigation.replace('Main');
      } else {
        navigation.replace('SignIn');
      }

      //
    };
    onProcess();
  }, []);

  return (
    <View style={styles.container}>
     
        {/* <Image source={require("../../assets/images/SplashScreenLogo.png")} style={styles.logo} resizeMode="contain" /> */}
       
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={{
          position: 'absolute',
          top: 260,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default Loading;
