import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, TouchableOpacity, Switch, ScrollView,Alert } from "react-native";
import { BaseStyle, useTheme } from "../../config";
import { BaseSetting } from "../../config";
import { Header, SafeAreaView, Icon, Text } from "../../components";
import { useTranslation } from "react-i18next";
import * as Utils from "../../utils";
import styles from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';

import {
  clearResults,
  updateselectedLocation,
} from '../../../app/redux/slices/Auth';
export default function Setting({ navigation }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const forceDark = useSelector((state) => state.application.force_dark);
  const font = useSelector((state) => state.application.font);

  const [reminders, setReminders] = useState(true);

  /**
   * @description Call when reminder option switch on/off
   */
  const toggleSwitch = (value) => {
    setReminders(value);
  };

  const darkOption = forceDark
    ? t("always_on")
    : forceDark != null
    ? t("always_off")
    : t("dynamic_system");
 
    const handleDeleteAccount = () => {
      // Show confirmation alert
      Alert.alert(
        t( "delete_account"),
        t("Are_you_sure_you_want_to_delete_your_account"),
        [
          {
            text: t("cancel"),
            style: "cancel"
          },
          {
            text: t("delete"),
            style: "delete",
            onPress: async () => {
              const user = auth().currentUser;
              if (user) {
                try {
                  // Delete the user's document from Firestore
                  await firestore().collection('users').doc(user.uid).delete();
  
                  // Delete the user from Firebase Authentication
                  await user.delete();
  
                  Alert.alert(t("account_deleted"),t("your_account_has_been_deleted_successfully."));
                  dispatch(clearResults())
                } catch (error) {
                  console.error("Error deleting user:", error);
                  Alert.alert("Error", "An error occurred while deleting your account.");
                }
              } else {
                Alert.alert("No User", "No user is currently signed in.");
              }
            }
          }
        ]
      );
    };
 
    
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t("setting")}
        renderLeft={() => {
          return (
              <Ionicons name="arrow-back" size={20} color={colors.primary} />
            // <Icon
            //   name="angle-left"
            //   size={20}
            //   style={{colors:colors.primary}}
            //   // color={colors.primary}
            //   enableRTL={true}
            // />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={styles.contain}>
        <TouchableOpacity
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("ChangeLanguage");
          }}
        >
          <Text body1>{t("language")}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text body1 grayColor>
              {Utils.languageFromCode(i18n.language)}
            </Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{ marginLeft: 5 }}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("ThemeSetting");
          }}
        >
          <Text body1>{t("theme")}</Text>
          <View
            style={[styles.themeIcon, { backgroundColor: colors.primary }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => navigation.navigate("SelectFontOption")}
        >
          <Text body1>{t("font")}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text body1 grayColor>
              {font ?? t("default")}
            </Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{ marginLeft: 5 }}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("SelectDarkOption");
          }}
        >
          <Text body1>{t("dark_theme")}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text body1 grayColor>
              {darkOption}
            </Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{ marginLeft: 5 }}
              enableRTL={true}
            />
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
            { paddingVertical: 15 },
          ]}
        >
          <Text body1>{t("notification")}</Text>
          <Switch size={18} onValueChange={toggleSwitch} value={reminders} />
        </View>
        <TouchableOpacity
        onPress={handleDeleteAccount}
          style={[
            styles.profileItem,
            {
              borderBottomColor: colors.border,
              borderBottomWidth: 1,
            },
            { paddingVertical: 15 },
          ]}
        >
          <Text body1>{t("delete_my_account")}</Text>
          
        </TouchableOpacity>
        <View style={styles.profileItem}>
         
        
        </View>
        <View style={styles.profileItem}>
          <Text body1>{t("app_version")}</Text>
          <Text body1 grayColor>
            {BaseSetting.appVersion}
          </Text>
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
}
