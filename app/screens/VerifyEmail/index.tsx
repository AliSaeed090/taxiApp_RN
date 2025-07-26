import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView, Button, Header, Dropdown, Text, TextInput } from '../../components';
import { BaseColor, BaseStyle, useTheme } from '../../config';
import { Images } from '../../config';
import { useTranslation } from 'react-i18next';
import { Authenticate } from '../../redux/slices/Auth';
import { RootState, AppDispatch } from '../../redux/index';
import {showMessage, hideMessage} from 'react-native-flash-message';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {
    clearResults,
    updateselectedLocation,
  } from '../../..//app/redux/slices/Auth';
// import { useForgotPassword } from './hooks/useSignIn';
const successInit = {
  id: true,
  password: true,
};

const validateEmail = (email: string): boolean => {
  return !!email.toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

interface Props {
  navigation: any;
}

const Signup: React.FC<Props> = ({ navigation }) => {
  const dispatch =useDispatch()
  const { t } = useTranslation();
  const { colors } = useTheme();
//   const {  mutateAsync:ForgotPassword,isPending } = useForgotPassword();
  const [id, setId] = useState<string>('');
  const [resend, Setresend] = useState<boolean>(false);
  const [success, setSuccess] = useState(successInit);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');   

  const onSignUp = () => {
    let user = auth().currentUser;
    if(user){
      user.sendEmailVerification().then(()=>{
        Setresend(true)
        showMessage({
          description: t("a_varification_email_has_been_sent_to_your_email_address"),
          message: t("email_verification"),
          type: 'success',
          position: 'top',
        })
      })
    //  if (!validateEmail(id)) {
    //   setEmailError(t("valid_email_address_is_required"));
    //   setSuccess((prevSuccess) => ({ ...prevSuccess, id: false }));
    // } 
    
    
    //  else{

     
      
    //   ForgotPassword(id).then((data:any)=>{
    //     navigation.navigate('SignIn')
    //     console.log({data})
    //     showMessage({
    //       description: "A rest link has been sent",
    //       message: "Successfull sent email",
    //       type: 'success',
    //       position: 'top',
    //     })
       
    //   }).catch((e:any)=>{
    //     console.log({e})
    //   });
    // }
  };
}

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}
    >
      <Header
        title={t('verify_email')}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}
         
        > */}
          <View style={styles.contain}>
            <View
              style={{
                alignSelf: 'center',
                width: '85%',
                height: 200,
                marginBottom: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={Images.logo}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          
           <Text body1>{t("a_varification_email_has_been_sent_to_your_email_address")}</Text>
           
            <View style={{ width: '100%', marginVertical: 16 }}>
           {resend===false&&   <Button
                full
                loading={false}
                style={{ marginTop: 20 }}
                onPress={onSignUp}
              >
                {t('resend_verification_email')}
              </Button>}
            </View>
            <View style={styles.contentActionBottom}>
              <TouchableOpacity
                 onPress={() => dispatch(clearResults())}
              >
                <Text body2 style={{ textDecorationLine: 'underline' }} grayColor>
                  {t('go_back_to_login')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:400}}/>
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
