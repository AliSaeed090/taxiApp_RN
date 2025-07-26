import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import ChangeLanguage from '../screens/ChangeLanguage';
import Dashboard from '../screens/Dashboard';
// import Complain from '../screens/Complain';
import AdminReservation from '../screens/AdminReservation';
import History from '../screens/History';
import Notifications from '../screens/Notifications';
import Setting from '../screens/Setting';
import MyRides from '../screens/MyRides';
import PriceList from '../screens/PriceList';
import ThemeSetting from '../screens/ThemeSetting';
import {getProfile, GetLocationUsers} from '../../app/redux/slices/Auth';
import ReserveTaxi from '../screens/ReserveTaxi';
const Drawer = createDrawerNavigator();
import {DrawerContent} from './DrawerContent';
import {useDispatch, useSelector} from 'react-redux';
type props = {};
const DrawerNavigator = () => {
  const {isAuthenticated, userApplicationRoles} = useSelector((state: any) => state.Auth);
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={ userApplicationRoles ===0?"Dashboard":"AdminReservation"}>
  {  userApplicationRoles ===0&&  <Drawer.Screen
        options={{headerShown: false}}
        name="Dashboard"
        component={Dashboard}
      />}
        <Drawer.Screen
            options={{headerShown: false}}
            name="AdminReservation"
            component={AdminReservation}
          />
       <Drawer.Screen
            options={{headerShown: false}}
            name="ReserveTaxi"
            component={ReserveTaxi}
          />
        <Drawer.Screen
            options={{headerShown: false}}
            name="MyRides"
            component={MyRides}
          />

         
      <Drawer.Screen
            options={{headerShown: false}}
            name="History"
            component={History}
          />
    <Drawer.Screen
            options={{headerShown: false}}
            name="PriceList"
            component={PriceList}
          />


  <Drawer.Screen
            options={{headerShown: false}}
            name="Notifications"
            component={Notifications}
          />  
          <Drawer.Screen
          options={{headerShown: false}}
          name="Setting"
          component={Setting}
        />
        <Drawer.Screen
          options={{headerShown: false}}
          name="ThemeSetting"
          component={ThemeSetting}
        />


      <Drawer.Screen
        options={{headerShown: false}}
        name="ChangeLanguage"
        component={ChangeLanguage}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
