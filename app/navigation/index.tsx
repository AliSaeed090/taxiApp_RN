import {useTheme} from '../config';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from '../screens/Loading';
import SignIn from '../screens/SignIn';
import ForgotPassword from '../screens/ForgotPassword';
import Signup from '../screens/Signup';
import AdminReservation from '../screens/AdminReservation';
import History from '../screens/History';
import Notifications from '../screens/Notifications';
import VerifyEmail from '../screens/VerifyEmail';

import ThemeSetting from '../screens/ThemeSetting';
import {getProfile, GetLocationUsers} from '../../app/redux/slices/Auth';
import ReserveTaxi from '../screens/ReserveTaxi';
import SelectDarkOption from '../screens/SelectDarkOption';
import SelectFontOption from '../screens/SelectFontOption';
import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import {useDarkMode, DarkModeProvider} from 'react-native-dynamic';
import SplashScreen from 'react-native-splash-screen';
import Main from './main';
import {useDispatch, useSelector} from 'react-redux';

import {RootState, AppDispatch} from '../../app/redux/index';

const RootStack = createStackNavigator();
type props = {};
const Navigator = (props: props) => {
  const {isAuthenticated, selectedLocation} = useSelector((state: any) => state.Auth);
  const dispatch: AppDispatch = useDispatch();
  const {theme, colors}: any = useTheme();
  const isDarkMode = useDarkMode();
  const forFade = ({current, closing}: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  useEffect(() => {
    // Hide screen loading
    SplashScreen.hide();
    // Config status bar
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(colors.primary, true);
    }
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, []);
  useEffect(() => {
    if (isAuthenticated === true) {
      
    }
  }, [isAuthenticated]);

  if ( !isAuthenticated) {
    return (
      <DarkModeProvider>
        <NavigationContainer theme={theme}>
          <RootStack.Navigator initialRouteName="Loading">
            <RootStack.Screen
              name="Loading"
              component={Loading}
              options={{gestureEnabled: false, headerShown: false}}
            />
            <RootStack.Screen
              name="SignIn"
              component={SignIn}
              options={{gestureEnabled: false, headerShown: false}}
            />
               <RootStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{gestureEnabled: false, headerShown: false}}
            />


              <RootStack.Screen
              name="Signup"
              component={Signup}
              options={{gestureEnabled: false, headerShown: false}}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </DarkModeProvider>
    );
  }
  return (
    <DarkModeProvider>
      <NavigationContainer theme={theme}>
        <RootStack.Navigator initialRouteName="Loading">
        <RootStack.Screen
              name="VerifyEmail"
              component={VerifyEmail}
              options={{gestureEnabled: false, headerShown: false}}
            />
<RootStack.Screen
            name="Loading"
            component={Loading}
            options={{gestureEnabled: false, headerShown: false}}
          />
          <RootStack.Screen
            options={{gestureEnabled: false, headerShown: false}}
            name="Main"
            component={Main}
          />
   

          <RootStack.Screen
            name="SelectDarkOption"
            component={SelectDarkOption}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          />
          
          <RootStack.Screen
            name="SelectFontOption"
            component={SelectFontOption}
            options={{
              cardStyleInterpolator: forFade,
              cardStyle: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
};

export default Navigator;
