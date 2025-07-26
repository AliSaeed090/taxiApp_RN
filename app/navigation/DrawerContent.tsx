import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTranslation } from 'react-i18next';
import { BaseStyle, useTheme, Images } from '../config';
import { SafeAreaView, Text } from '../components';
import { RootState, AppDispatch } from '../../app/redux/index';
import {
  clearResults,
  updateselectedLocation,
} from '../../app/redux/slices/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
export function DrawerContent(props: any) {
  // const [selectedLocation, setSelectedLocation] = useState();
  const {t}=useTranslation();
  const { colors } = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const {
    loading,
    isAuthenticated,
    email,
    firstName,
    fullName,
    jwtToken,
    lastName,
    refreshToken,
    rolePermission,
    tokenExpiry,
    type,
    userApplicationRoles,
    selectedLocation,
    userLocation,
    name
  } = useSelector((state: any) => state.Auth);

  const setSelectedLocation = (itemValue: number) => {
    dispatch(updateselectedLocation(itemValue));
  };
  // const handlePress = async () => {
  //   const url = `tel:${item.phoneNumber}`;

  //   const canOpen = await Linking.canOpenURL(url);
  //   if (canOpen) {
  //     Linking.openURL(url);
  //   } else {
  //     Alert.alert(t("Unable_to_make_a_call"), t("Your_device_does_not_support_this_feature"));
  //   }
  // };
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left', 'bottom']}>
      <View style={styles.drawerContent}>
        <View
          style={{
            width: '100%',
            height: 200,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome6 name="circle-user" size={70} color={'white'} />
          <Text whiteColor headline style={{ marginTop: 10 }}>
            {t("welcome") + ' ' + name}
          </Text>

        </View>

        <DrawerContentScrollView {...props}>
          <View style={styles.drawerSection}>
           {userApplicationRoles===0? <>
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome style={{ width: 30 }} name="taxi" size={size} color={color} />
              )}
              label={t("quick_taxi")}
              onPress={() => {
                props.navigation.navigate('Dashboard');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome style={{ width: 30 }} name="taxi" size={size} color={color} />
              )}
              label={t("reserve_taxi")}
              onPress={() => {
                props.navigation.navigate('ReserveTaxi', {
                  Channels: true,
                });
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome
                  style={{ width: 30 }}
                  name="history" size={size} color={color} />
              )}
              label={t("my_rides")}
              onPress={() => {
                props.navigation.navigate('MyRides', {
                  Channels: true,
                });
              }}
            />
              <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome style={{ width: 30 }} name="euro" size={size} color={color} />
              )}
              label={t("price_list")}
              onPress={() => {
                props.navigation.navigate('PriceList', {
                   
                });
              }}
            />
            </>
:
            <>
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome style={{ width: 30 }} name="user" size={size} color={color} />
              )}
              label={t("ride_request")}
              onPress={() => {
                props.navigation.navigate('AdminReservation', {
                  Channels: true,
                });
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome
                  style={{ width: 30 }}
                  name="history" size={size} color={color} />
              )}
           
              label={t("rides_history")}
              onPress={() => {
                props.navigation.navigate('History', {
                  Channels: true,
                });
              }}
            />
            </>}
            {/* <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome style={{ width: 30 }} name="bell" size={size} color={color} />
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate('Notifications', {
                  Channels: true,
                });
              }}
            /> */}
          
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons style={{ width: 30 }} name="settings" size={size} color={color} />
              )}
              label={t("setting")}
              onPress={() => {
                props.navigation.navigate('Setting', {
                  Channels: true,
                });
              }}
            />

<DrawerItem
              icon={({ color, size }) => (
                <AntDesign style={{ width: 30 }} name="phone" size={20} color={color} />
              )}
              label={t("call_us")}
              onPress={() => Linking.openURL('tel:+436764417350')}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign style={{ width: 30 }} name="logout" size={20} color={color} />
              )}
              label={t("sign_out")}
              onPress={() => dispatch(clearResults())}
            />
          </View>
        </DrawerContentScrollView>
      </View>

      <View style={styles.drawerSection}>
        {/* 
                


 


 ( Link to wepoc.co) */}
      </View>

      {/* <Drawer.Section style={styles.bottomDrawerSection}>
       */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    // paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
