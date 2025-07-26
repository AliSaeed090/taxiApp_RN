import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  SafeAreaView,
  Button,
  Header,
  Dropdown,
  Text,
  TextInput,
} from '../../components';
import {BaseColor, BaseStyle, useTheme} from '../../config';
import {Images} from '../../config';
import {useTranslation} from 'react-i18next';
import {Authenticate} from '../../redux/slices/Auth';
import {RootState, AppDispatch} from '../../redux/index';
import styles from './styles';
import {useSignup} from './hooks/useSignup';
import Pdf from 'react-native-pdf';
import {showMessage, hideMessage} from 'react-native-flash-message';

const successInit = {
  id: true,
  password: true,
  confirmPassword: true,
  name: true,
};

const validateEmail = (email: string): boolean => {
  return !!email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

interface Props {
  navigation: any;
}

const Signup: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const {mutateAsync: signup, isPending} = useSignup();
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [success, setSuccess] = useState(successInit);
  const [emailError, setEmailError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [typeOfUserError, setTypeOfUserError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const source = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/thetaxi-b012b.appspot.com/o/Addendum.pdf?alt=media&token=bb271f61-2b83-463c-b4f7-2fa7df4d28c5',
    cache: true,
  };
  const [items, setItems] = useState<Array<{label: string; value: string}>>([
    {label: 'Hotel', value: 'Hotel'},
    {label: 'Individual', value: 'Individual'},
    {label: 'Gastronomy', value: 'Gastronomy'},
  ]);

  const {loading} = useSelector((state: RootState) => state.Auth);

  const onSignUp = () => {
    if (value === null) {
      setTypeOfUserError(t('Type_of_user_is_required'));
    } else if (!validateEmail(id)) {
      setEmailError(t('valid_email_address_is_required'));
      setSuccess(prevSuccess => ({...prevSuccess, id: false}));
    } else if (name === '' || name.length < 3) {
      setNameError(t('valid_name_is_required'));
      setSuccess(prevSuccess => ({...prevSuccess, name: false}));
    } else if (password.length < 6) {
      setPasswordError(t('password_must_be_at_least_6_characters'));
      setSuccess(prevSuccess => ({...prevSuccess, password: false}));
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(t('passwords_do_not_match'));
      setSuccess(prevSuccess => ({...prevSuccess, confirmPassword: false}));
    } else {
      signup({email: id, password, name, userType: value}).then(() => {
        showMessage({
          description: t("a_varification_email_has_been_sent_to_your_email_address"),
          message: t("email_verification"),
          type: 'success',
          position: 'top',
        })

        dispatch(
          Authenticate({
            email: id,
            password,
            name,
            userType: value,
            userApplicationRoles: 0,
          }),
        );
      });
    }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('sign_up')}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            
          <SafeAreaView
            style={BaseStyle.safeAreaView}
            // edges={['right', 'top', 'left']}
            >
            
           <View style={{position:'absolute', width:"100%", top:50, zIndex:1, backgroundColor:'white'}}>
           <Header
                  title={t('Terms and Conditions')}
                  renderLeft={() => {
                    return <Ionicons name="arrow-back" size={20} color={colors.primary} />;
                  }}
                  onPressLeft={() => {
                   setModalVisible(!modalVisible);
                  }}/>

           </View>
               
              <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
              />
           
          </SafeAreaView>
        </Modal>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}
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
            }}>
            <Image
              source={Images.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Dropdown
            zIndex={1}
            loading={loading}
            multiple={false}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(e: any) => {
              setValue(e);
              setTypeOfUserError('');
            }}
            setItems={setItems}
            placeholder={t('choose_type_of_user')}
            searchable={false}
            errorMessage={typeOfUserError}
          />
          <TextInput
            style={[BaseStyle.textInput, {marginTop: 10}]}
            onChangeText={(text: string) => {
              setId(text);
              setEmailError('');
              setSuccess(prevSuccess => ({...prevSuccess, id: true}));
            }}
            onFocus={() => {
              setSuccess(prevSuccess => ({...prevSuccess, id: true}));
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
            style={[BaseStyle.textInput, {marginTop: 0}]}
            onChangeText={(text: string) => {
              setName(text);
              setNameError('');
              setSuccess(prevSuccess => ({...prevSuccess, name: true}));
            }}
            onFocus={() => {
              setSuccess(prevSuccess => ({...prevSuccess, name: true}));
            }}
            autoCorrect={false}
            placeholder={t('user_name')}
            placeholderTextColor={
              success.id ? BaseColor.grayColor : colors.primary
            }
            value={name}
            errorMessage={emailError}
            selectionColor={colors.primary}
          />
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text: string) => {
              setPassword(text);
              setPasswordError('');
              setSuccess(prevSuccess => ({
                ...prevSuccess,
                password: true,
              }));
            }}
            onFocus={() => {
              setSuccess(prevSuccess => ({
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
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text: string) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
              setSuccess(prevSuccess => ({
                ...prevSuccess,
                confirmPassword: true,
              }));
            }}
            onFocus={() => {
              setSuccess(prevSuccess => ({
                ...prevSuccess,
                confirmPassword: true,
              }));
            }}
            autoCorrect={false}
            placeholder={t('password_confirm')}
            secureTextEntry={true}
            placeholderTextColor={
              success.confirmPassword ? BaseColor.grayColor : colors.primary
            }
            value={confirmPassword}
            errorMessage={confirmPasswordError}
            selectionColor={colors.primary}
          />
          <View style={styles.contentActionBottom}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                body2
                style={{textDecorationLine: 'underline'}}
                primaryColor>
                {t('by_signing_up_I_accept_the_terms_and_conditions')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', marginVertical: 16}}>
            <Button
              full
              loading={isPending}
              style={{marginTop: 20}}
              onPress={onSignUp}>
              {t('sign_up')}
            </Button>
          </View>

          <View style={{marginTop: 20}}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text body2 style={{textDecorationLine: 'underline'}} grayColor>
                {t('Already_have_an_account')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 400}} />
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
