import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import styles from './styles';
import {useReservation} from './hooks/useReserveTaxi';
import PhoneInput from 'react-native-phone-number-input';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {sendNotification} from '../../utils/messagingSetup';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';
import 'moment/locale/de'; // German
import 'moment/locale/en-gb'; // 
const successInit = {
  pickupLocation: true,
  dropOfLocation: true,
  noOfPassanger: true,
  noOfSkiis: true,
  noOfChildSeat: true,
  noOfSuitcase: true,
  date: true,
};
const apiKey =
  Platform.OS === 'android'
    ? 'AIzaSyCBh......'
    : 'AIzaSyCBh......';
const Signup: React.FC<any> = props => {
  
  const {name} = useSelector((state: any) => state.Auth);
  const {currentPosition, destination} = props.route?.params ?? '';
  const {t,i18n} = useTranslation();
  moment.locale(i18n.language==="de"?"de":"en");
  const {colors} = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const [dateTime, setDateTime] = useState(new Date());
  const {mutateAsync: save, isPending} = useReservation();
  const [pickupLocation, setpickupLocation] = useState<string>('');
  const [dropOfLocation, setDropOfLocation] = useState<string>('');
  const [pickupLocationError, setPickupLocationError] = useState<string>('');
  const [dateTimerror, setdateTimerror] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [success, setSuccess] = useState(successInit);
  const [dropOfLocationError, setDropOfError] = useState<string>('');
  const [typeOfUserError, setTypeOfUserError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [phoneNoError, setphoneNoError] = useState<string>('');
  const [noOfPassanger, setnoOfPassanger] = useState<string>('');
  const [noOfPassangerError, setNoOfPassangerError] = useState<string>('');
  const [noOfSuitcase, setnoOfSuitcase] = useState<string>('');
  const [noOfSuitcaseError, setNoOfSuitcaseError] = useState<string>('');
  const [noOfChildSeat, setnoOfChildSeat] = useState<string>('');
  const [noOfChildSeatError, setNoOfChildSeatError] = useState<string>('');
  const [noOfSkiis, setnoOfSkiis] = useState<string>('');
  const [noOfSkiisError, setNoOfSkiisError] = useState<string>('');
  const [payment, setPayment] = useState<string>('Cash');
  const [paymentError, setPaymentError] = useState<string>('');
  const [openPayment, setOpenPayment] = useState<boolean>(false);
  const [valuePayment, setValuePayment] = useState<string | null>(null);
  const [items, setItems] = useState<Array<{ label: string; value: string }>>([
    { label: t('Card'), value: 'Card' },
    { label: t('Cash'), value: 'Cash' },
  ]);

  const [instructionsByPassanger, setnoinstructionsByPassanger] =
    useState<string>('');
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    console.log({params: props.route.params});
    if (currentPosition && destination) {
      setpickupLocation(currentPosition);
      setDropOfLocation(destination);
    }
  }, [currentPosition, destination]);

  const onSave = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    if (pickupLocation === '' || pickupLocation.length < 3) {
      setPickupLocationError(t('pick_up_location_is_required'));
      setSuccess(prevSuccess => ({...prevSuccess, name: false}));
    } else if (dropOfLocation === '' || dropOfLocation.length < 3) {
      setDropOfError(t("drop_of_location_is_required"));
      setSuccess(prevSuccess => ({...prevSuccess, name: false}));
    } else if (!checkValid) {
      setphoneNoError(t('invalid_phone_number'));
    }
    
    else {
      let payload = {
        pickupLocation,
        dropOfLocation,
        dateTime,
        phoneNumber: formattedValue,
        noOfPassanger,
        noOfSuitcase,
        noOfChildSeat,
        noOfSkiis,
        instructionsByPassanger,
        isQuickTaxi: destination ? true : false,
        payment:payment
      };

      save(payload).then(() => {
        showMessage({
          description: t('please_wait_for_approval'),
          message: t('ride_request_sent'),
          type: 'success',
          position: 'top',
        });
        props.navigation.navigate('MyRides');

        resetAll()
        sendNotification(
          'New Ride Request',
          `${name} is requesting ${
            destination ? 'a quick texi' : 'to reserve a taxi'
          }`,
          true,
        );
      });
    }
  };
  const resetAll = () => {
    setDateTime(new Date());
    setpickupLocation('');
    setDropOfLocation('');
    setPickupLocationError('');
    setdateTimerror('');
    setPassword('');
    setConfirmPassword('');
    setSuccess(successInit);  // Assuming `successInit` is a predefined value for the success state
    setDropOfError('');
    setTypeOfUserError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setOpen(false);
    setValue('');
    setFormattedValue('');
    setphoneNoError('');
    setnoOfPassanger('');
    setNoOfPassangerError('');
    setnoOfSuitcase('');
    setNoOfSuitcaseError('');
    setnoOfChildSeat('');
    setNoOfChildSeatError('');
    setnoOfSkiis('');
    setNoOfSkiisError('');
    setPayment('Cash');
    setPaymentError('');
    setOpenPayment(false);
    setValuePayment(null);
  };
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('reserve_taxi')}
        onPressLeft={() => {
          props.navigation.goBack();
        }}
        // onPressLeft={() => navigation.openDrawer()}
        onPressRight={() => {}}
        renderLeft={() => {
          return (
            <Ionicons name="arrow-back" size={20} color={colors.primary} />
          );
        }}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.contain}>
          {!currentPosition ? (
            <>
              <Text style={{marginBottom: 5}}>{t('pick_up_location')}</Text>
              <GooglePlacesAutocomplete
                //  keepResultsAfterBlur={true}
                placeholder={t('pick_up_location')}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log({data});
                  if (data.description) {
                    setpickupLocation(data.description);
                    setPickupLocationError('');
                    setSuccess(prevSuccess => ({
                      ...prevSuccess,
                      pickupLocation: true,
                    }));
                    // navigation.navigate("ReserveTaxi",{currentPosition:address, destination:data.description});
                  }
                  //
                }}
                styles={{
                  textInput: {
                    ...BaseStyle.textInput,
                    backgroundColor: colors.card,
                    zIndex: 1,
                    color: colors.text,
                  },
                  row: {backgroundColor: colors.background, zIndex: 10},

                  description: {color: colors.text},
                }}
                textInputProps={{
                  placeholderTextColor: BaseColor.grayColor,
                  // value:dropOfLocation,
                  // onChangeText:(text:string)=>{
                  //   setDropOfLocation(text);
                  //   setDropOfError('');
                  //   setSuccess(prevSuccess => ({
                  //     ...prevSuccess,
                  //     dropOfLocation: true,
                  //   }));
                  // }
                }}
                currentLocation={true}
                query={{
                  key: apiKey,
                  language: i18n.language,
                }}
              />
              <Text footnote style={{color: 'red'}}>
                {pickupLocationError}
              </Text>
              <Text style={{marginBottom: 5}}>{t('drop_of_location')}</Text>
              <GooglePlacesAutocomplete
                //  keepResultsAfterBlur={true}
                placeholder={t('drop_of_location')}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log({data});
                  if (data.description) {
                    setDropOfLocation(data.description);
                    setDropOfError('');
                    setSuccess(prevSuccess => ({
                      ...prevSuccess,
                      dropOfLocation: true,
                    }));
                    // navigation.navigate("ReserveTaxi",{currentPosition:address, destination:data.description});
                  }
                  //
                }}
                styles={{
                  textInput: {
                    ...BaseStyle.textInput,
                    backgroundColor: colors.card,
                    color: colors.text,
                  },
                  row: {backgroundColor: colors.background},

                  description: {color: colors.text},
                  // loader: { backgroundColor: "red" }
                }}
                textInputProps={{
                  placeholderTextColor: BaseColor.grayColor,
                }}
                currentLocation={true}
                query={{
                  key: apiKey,
                  language: 'en',
                }}
              />
              <Text footnote style={{color: 'red'}}>
                {dropOfLocationError}
              </Text>
            </>
          ) : (
            <>
              <TextInput
                style={[BaseStyle.textInput, {marginTop: 10}]}
                onChangeText={(text: string) => {
                  setpickupLocation(text);
                  setPickupLocationError('');
                  setSuccess(prevSuccess => ({
                    ...prevSuccess,
                    pickupLocation: true,
                  }));
                }}
                editable={currentPosition ? false : true}
                onFocus={() => {
                  setSuccess(prevSuccess => ({
                    ...prevSuccess,
                    pickupLocation: true,
                  }));
                }}
                autoCorrect={false}
                placeholder={t('pick_up_location')}
                label={t('pick_up_location')}
                placeholderTextColor={
                  success.pickupLocation ? BaseColor.grayColor : colors.primary
                }
                value={pickupLocation}
                errorMessage={pickupLocationError}
                selectionColor={colors.primary}
              />
              <TextInput
                editable={currentPosition ? false : true}
                style={[BaseStyle.textInput, {marginTop: 0}]}
                onChangeText={(text: string) => {
                  setDropOfLocation(text);
                  setDropOfError('');
                  setSuccess(prevSuccess => ({
                    ...prevSuccess,
                    dropOfLocation: true,
                  }));
                }}
                onFocus={() => {
                  setSuccess(prevSuccess => ({
                    ...prevSuccess,
                    dropOfLocation: true,
                  }));
                }}
                autoCorrect={false}
                placeholder={t('drop_of_location')}
                label={t('drop_of_location')}
                placeholderTextColor={
                  success.dropOfLocation ? BaseColor.grayColor : colors.primary
                }
                value={dropOfLocation}
                errorMessage={dropOfLocationError}
                selectionColor={colors.primary}
              />
            </>
          )}
          <TextInput
            style={[BaseStyle.textInput]}
            onChangeText={(text: string) => {}}
            onFocus={() => {
              setOpen(true);
              setSuccess(prevSuccess => ({
                ...prevSuccess,
                date: true,
              }));
            }}
            autoCorrect={false}
            label={t('pick_up_date_&_time')}
            placeholder={t('pick_up_date_&_time')}
            placeholderTextColor={
              success.date ? BaseColor.grayColor : colors.primary
            }
            value={
              moment(dateTime).format('DD-MMM-YY') +
              ' at ' +
              moment(dateTime).format('h:m a')
            }
            errorMessage={passwordError}
            selectionColor={colors.primary}
          />
          <Text style={{marginBottom: 5}}>{t('payment')}</Text>
           <Dropdown
              zIndex={1}
              loading={false}
              multiple={false}
              open={openPayment}
              value={payment}
              items={items}
              setOpen={setOpenPayment}
              setValue={(e:any)=>{setPayment(e); setPaymentError('');}}
              setItems={setItems}
              placeholder={t('')}
              searchable={false}
              errorMessage={typeOfUserError}
            />
          <Text style={{marginBottom: 5}}>{t('phone_number')}</Text>
          <PhoneInput
            containerStyle={{
              ...BaseStyle.textInput,
              width: '100%',
              backgroundColor: colors.card,
              paddingLeft: 0,
            }}
            textInputStyle={{backgroundColor: colors.card, color: colors.text}}
            codeTextStyle={{
              color: colors.primary,
              backgroundColor: colors.card,
            }}
            textContainerStyle={{backgroundColor: colors.card}}
            countryPickerButtonStyle={{
              backgroundColor: BaseColor.grayColor,
              borderRadius: 5,
            }}
            textInputProps={{
              selectionColor: colors.primary,
              placeholderTextColor: BaseColor.grayColor,
              placeholder: t('input_number'),
            }}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="AT"
            layout="first"
            onChangeText={text => {
              setValue(text);
              setphoneNoError('');
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus={destination ? true : false}
          />
          {phoneNoError.length > 0 && (
            <Text footnote style={{color: 'red'}}>
              {phoneNoError}
            </Text>
          )}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <TextInput
              style={[BaseStyle.textInput, {width: 140}]}
              onChangeText={(text: string) => {
                setnoOfPassanger(text);
                setNoOfPassangerError('');
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfPassanger: true,
                }));
              }}
              keyboardType={'numeric'}
              onFocus={() => {
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfPassanger: true,
                }));
              }}
              autoCorrect={false}
              label=  {t('no_of_passanger')}
              placeholder={t('e.g 2')}
              placeholderTextColor={
                success.noOfPassanger ? BaseColor.grayColor : colors.primary
              }
              value={noOfPassanger}
              errorMessage={confirmPasswordError}
              selectionColor={colors.primary}
            />
            <TextInput
              style={[BaseStyle.textInput, {width: 140}]}
              onChangeText={(text: string) => {
                setnoOfSuitcase(text);
                setNoOfSuitcaseError('');
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfSuitcase: true,
                }));
              }}
              onFocus={() => {
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfSuitcase: true,
                }));
              }}
              keyboardType={'numeric'}
              autoCorrect={false}
              label={t('no_of_suitcase')}
              placeholder={t('e.g 2')}
              placeholderTextColor={
                success.noOfSuitcase ? BaseColor.grayColor : colors.primary
              }
              value={noOfSuitcase}
              errorMessage={confirmPasswordError}
              selectionColor={colors.primary}
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              style={[BaseStyle.textInput, {width: 140}]}
              onChangeText={(text: string) => {
                setnoOfChildSeat(text);
                setNoOfChildSeatError('');
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfChildSeat: true,
                }));
              }}
              keyboardType={'numeric'}
              onFocus={() => {
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfChildSeat: true,
                }));
              }}
              autoCorrect={false}
              label={t('child_seat')}
            
              placeholder={t('e.g 2')}
              placeholderTextColor={
                success.noOfChildSeat ? BaseColor.grayColor : colors.primary
              }
              value={noOfChildSeat}
              errorMessage={confirmPasswordError}
              selectionColor={colors.primary}
            />
            <TextInput
              style={[BaseStyle.textInput, {width: 140}]}
              onChangeText={(text: string) => {
                setnoOfSkiis(text);
                setNoOfSkiisError('');
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfSkiis: true,
                }));
              }}
              onFocus={() => {
                setSuccess(prevSuccess => ({
                  ...prevSuccess,
                  noOfSkiis: true,
                }));
              }}
              autoCorrect={false}
              label={t('skiis')}
              placeholder={t('e.g 2')}
              keyboardType={'numeric'}
              placeholderTextColor={
                success.noOfSkiis ? BaseColor.grayColor : colors.primary
              }
              value={noOfSkiis}
              errorMessage={confirmPasswordError}
              selectionColor={colors.primary}
            />
          </View>
          <TextInput
            multiline={true}
            style={[BaseStyle.textInput, {minHeight: 150}]}
            onChangeText={(text: string) => {
              setnoinstructionsByPassanger(text);
            }}
            onFocus={() => {}}
            autoCorrect={false}
            placeholder={t('write_here...')}
            label={t('instruction_information')}
            placeholderTextColor={BaseColor.grayColor}
            value={instructionsByPassanger}
            errorMessage={''}
            selectionColor={colors.primary}
          />
          <View style={{width: '100%', marginVertical: 16}}>
            <Button
              full
              loading={isPending}
              style={{marginTop: 20}}
              onPress={onSave}>
              {t('reserve')}
            </Button>
          </View>
        </View>
        <DatePicker
        confirmText={t("Confirm")}
        cancelText={t("Cancel")}
          modal
          locale={i18n.language==="de"?"de":'en'}
          mode="datetime"
          open={open}
          date={dateTime}
          onConfirm={date => {
            setOpen(false);
            setDateTime(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={{height: 200}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
