import React, { useState } from 'react';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendNotification } from '../../../utils/messagingSetup';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';

import {
  Modal,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView,  Header, Dropdown, Text, TextInput } from '../../../components';
import { useTheme, BaseStyle, BaseColor } from '../../../config';
import { useUpdateReservation } from '../../MyRides/hooks/myRides';
interface ReservationDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  onAccept: (price: number, currency: string, notes: string) => void;
  onReject: () => void;
  reservationDetails: {
    id: string;
    pickupLocation: string;
    dropOfLocation: string;
    dateTime: any;
    phoneNumber: string;
    noOfPassanger: string;
    noOfSuitcase: string;
    noOfChildSeat: string;
    noOfSkiis: string;
    instructionsByPassanger: string;
    isQuickTaxi: boolean;
    status: string;
    fare: number | null;
    taxPercentage: number | null;
    currency: string;
    notesByAdmin: string;
    user:any,
    payment:string
  };
}

const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({

  visible,
  onClose,
  
 
  reservationDetails,
}) => {
  const {t} = useTranslation();

  const {mutateAsync, isPending} = useUpdateReservation();
  const queryClient = useQueryClient();
  const handleUpdate = (status:string) => {
    mutateAsync({
      docId:reservationDetails.id,
      status: status,
      fare:status==="Rejected"?null: price,
      notesByAdmin:notes,
      currency:status==="Rejected"?null: value
    }).then(()=>{
      sendNotification("Ride Request Response",`Admin has  ${status.toLowerCase()} your ride request`,false, reservationDetails.user.id )
      queryClient.invalidateQueries({queryKey: ['fetchRideRequests']});
      onClose()
    });
  };
  const [price, setPrice] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
const {colors}=useTheme()
  const handleAccept = () => {
    if (!price || isNaN(Number(price))) {
      Alert.alert(t('Validation_Error'), t('Please_enter_a_valid_price'));
      return;
    }
    // if (!value) {
    //   Alert.alert('Validation_Error', t('Please_select_a_currency'));
    //   return;
    // }
    
    // onAccept(Number(price), value, notes);
    handleUpdate("Accepted")
  };
  const onReject=()=>{
    handleUpdate("Rejected")
  }
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>("€");
  const [items, setItems] = useState<Array<{ label: string; value: string }>>([
    { label: '€', value: '€' },
    { label: '£', value: '£' },
    { label: '$', value: '$' },
    { label: '₺', value: '₺' },
    
  ]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      style={{backgroundColor:BaseColor.dividerColor}}
      
    >
    
      <View style={{...styles.modalContainer, backgroundColor:colors.background}}>
      <TouchableOpacity style={{position:"absolute", top:30, right:10,zIndex:1}} onPress={onClose}>
                <Entypo name="cross" size={32} color={'red'} />
                <Text>{t("close")}</Text>
              </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>{t("reservation_details")}</Text>
          <Text primaryColor>{t("user_name")}: <Text >{reservationDetails.user.name}</Text></Text>
          <Text primaryColor>{t("user_type")}: <Text >{reservationDetails.user.userType}</Text></Text>
          <Text primaryColor>{t("phone_number")}: <Text >{reservationDetails.phoneNumber}</Text></Text>
          <Text primaryColor>{t("pick_up_location")}: <Text >{reservationDetails.pickupLocation}</Text></Text>
          <Text primaryColor>{t("drop_of_location")}: <Text >{reservationDetails.dropOfLocation}</Text></Text>
          <Text primaryColor>{t("date_and_time")}: <Text >{moment(reservationDetails.dateTime.toDate()).format(
                  'Do-MMM-YY, h:mm a',
                )}</Text></Text>
          <Text primaryColor>{t("payment")}: <Text >{reservationDetails.payment}</Text></Text>
          <Text primaryColor>{t("no_of_passengers")}: <Text >{reservationDetails.noOfPassanger}</Text></Text>
          <Text primaryColor>{t("no_of_suitcases")}: <Text >{reservationDetails.noOfSuitcase}</Text></Text>
          <Text primaryColor>{t("no_of_child_seats")}: <Text >{reservationDetails.noOfChildSeat}</Text></Text>
          <Text primaryColor>{t("no_of_skiis")}: <Text >{reservationDetails.noOfSkiis}</Text></Text>
          <Text primaryColor>{t("instructions_by_passenger")}: <Text >{reservationDetails.instructionsByPassanger}</Text></Text>
          <Text primaryColor>{t("quick_taxi")}: <Text >{reservationDetails.isQuickTaxi ? 'Yes' : 'No'}</Text></Text>
          <Text primaryColor>{t("status")}: <Text >{reservationDetails.status}</Text></Text>
           
         

          <View style={styles.inputContainer}>
            <TextInput
               
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              style={[BaseStyle.textInput ]}
              success={true}
              onFocus={() => {
              }}
              autoCorrect={false}
              // label='Price'
              errorMessage={""}
              selectionColor={colors.primary}
            />
           
            {/* <Dropdown
              zIndex={1}
              loading={false}
              multiple={false}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={(e:any)=>{setValue(e)}}
              setItems={setItems}
              placeholder={'Select currency'}
              searchable={false}
              
              errorMessage={""}
            /> */}
            <TextInput
            success={true}
              placeholder={t("notes_for_passengers")}
              multiline
              value={notes}
              style={[BaseStyle.textInput,{minHeight:150}]}
              onChangeText={(text:string) => {
                setNotes(text);
               
              }}
              onFocus={() => {
              }}
              autoCorrect={false}
              // label='Notes'
              errorMessage={""}
              selectionColor={colors.primary}
            />
          </View>
         {isPending===false? <>
          {/* <View style={styles.buttonContainer}>
            <Button title="Accept" onPress={handleAccept} />
            <Button title="Reject" onPress={onReject} color="red" />
          </View> */}
           <View  style={{
            marginTop:20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:"space-between",
                width:"100%",
                alignSelf:"flex-end"
                
              }}>
            
            {isPending?<ActivityIndicator size={'small'} color={colors.primary}/>:<>
             <TouchableOpacity onPress={()=>handleUpdate("Accepted")} style={{justifyContent:"center", alignItems:"center"}}  >
                <Entypo name="check" size={28} color={'green'} />
                <Text>{t("confirm")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleUpdate("Cancelled")}>
                <Entypo name="cross" size={32} color={'red'} />
                <Text>{t("cancel")}</Text>
              </TouchableOpacity></> }
          </View>
          {/* <Button title="Close" onPress={onClose} /> */}
         
          </>
          :
          <ActivityIndicator size={'large'} color={colors.primary}/>
         }
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems:"center"
  },
  scrollViewContent: {
    // backgroundColor: 'white',
    margin: 30,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 5,
  },
});

export default ReservationDetailsModal;
