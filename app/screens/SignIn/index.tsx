import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView, Button, Header, Dropdown, Text, TextInput } from '../../components';
import { BaseColor, BaseStyle, useTheme } from '../../config';
import { Images } from '../../config';
import { useTranslation } from 'react-i18next';
import { Authenticate } from '../../redux/slices/Auth';
import { RootState, AppDispatch } from '../../redux/index';

import styles from './styles';
import { useSignIn } from './hooks/useSignIn';
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
  const {  mutateAsync:signInUser,isPending } = useSignIn();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [success, setSuccess] = useState(successInit);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');   

  const onSignUp = () => {
    
     if (!validateEmail(id)) {
      setEmailError(t('valid_email_address_is_required'));
      setSuccess((prevSuccess) => ({ ...prevSuccess, id: false }));
    } 
    
    
    else if (password.length < 6) {
      setPasswordError(t('password_must_be_at_least_6_characters'));
      setSuccess((prevSuccess) => ({ ...prevSuccess, password: false }));
    } 
     else{

     
      
      signInUser({email:id, password}).then((data:any)=>{
        console.log({data})
        dispatch(Authenticate({email:data.email, name:data.name, userType:data. userType,userApplicationRoles:data.userApplicationRoles }));
      }).catch((error:any)=>{ 
        console.log({error})
        setEmailError(t('invalid_email_or_password'));
        setSuccess((prevSuccess) => ({ ...prevSuccess, id: false }));
      })
    }
  };

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
        title={t('sign_in')}
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
          
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={(text:string) => {
                setId(text);
                setEmailError('');
                setSuccess((prevSuccess) => ({ ...prevSuccess, id: true }));
              }}
              onFocus={() => {
                setSuccess((prevSuccess) => ({ ...prevSuccess, id: true }));
              }}
              autoCorrect={false}
              placeholder={t('email_address')}
              placeholderTextColor={
                success.id ? BaseColor.grayColor : colors.primary
              }
              value={id}
              errorMessage={emailError}
              selectionColor={colors.primary}
            />
           
            <TextInput
              style={[BaseStyle.textInput]}
              onChangeText={(text:string) => {
                setPassword(text);
                setPasswordError('');
                setSuccess((prevSuccess) => ({
                  ...prevSuccess,
                  password: true,
                }));
              }}
              onFocus={() => {
                setSuccess((prevSuccess) => ({
                  ...prevSuccess,
                  password: true,
                }));
              }}
              autoCorrect={false}
              placeholder={t('input_password')}
              secureTextEntry={true}
              placeholderTextColor={
                success.password ? BaseColor.grayColor : colors.primary
              }
              value={password}
              errorMessage={passwordError}
              selectionColor={colors.primary}
            />
            
            <View style={styles.contentActionBottom}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text body2 style={{ textDecorationLine: 'underline' }} grayColor>
                  {t('forgot_password?')}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={{ width: '100%', marginVertical: 16 }}>
              <Button
                full
                loading={isPending}
                style={{ marginTop: 20 }}
                onPress={onSignUp}
              >
                {t('sign_in')}
              </Button>
            </View> 
            <View style={styles.contentActionBottom}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
              >
                <Text body2 style={{ textDecorationLine: 'underline' }} grayColor>
                  {t('Dont_have_an_account')}
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
