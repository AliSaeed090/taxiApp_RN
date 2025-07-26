import React, { useState } from 'react';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

import {
  Modal,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
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
    user:any
  };
}

const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({

  visible,
  onClose,
  
 
  reservationDetails,
}) => {
  const {mutateAsync, isPending} = useUpdateReservation();
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const handleUpdate = (status:string) => {
    mutateAsync({
      docId:reservationDetails.id,
      status: status,
      fare:status==="Rejected"?null: price,
      notesByAdmin:notes,
      currency:status==="Rejected"?null: value
    }).then(()=>{
      
      queryClient.invalidateQueries({queryKey: ['fetchRidesHistory']});
      onClose()
    });
  };
  const [price, setPrice] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
const {colors}=useTheme()
  const handleAccept = () => {
    if (!price || isNaN(Number(price))) {
      Alert.alert('Validation Error', 'Please enter a valid price.');
      return;
    }
    if (!value) {
      Alert.alert('Validation Error', 'Please select a currency.');
      return;
    }
    
    // onAccept(Number(price), value, notes);
    handleUpdate("Accepted")
  };
  const onReject=()=>{
    handleUpdate("Rejected")
  }
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
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
         
          <Text primaryColor>{t("no_of_passengers")}: <Text >{reservationDetails.noOfPassanger}</Text></Text>
          <Text primaryColor>{t("no_of_suitcases")}: <Text >{reservationDetails.noOfSuitcase}</Text></Text>
          <Text primaryColor>{t("no_of_child_seats")}: <Text >{reservationDetails.noOfChildSeat}</Text></Text>
          <Text primaryColor>{t("no_of_skiis")}: <Text >{reservationDetails.noOfSkiis}</Text></Text>
          <Text primaryColor>{t("instructions_by_passenger")}: <Text >{reservationDetails.instructionsByPassanger}</Text></Text>
          <Text primaryColor>{t("quick_taxi")}: <Text >{reservationDetails.isQuickTaxi ? 'Yes' : 'No'}</Text></Text>
          <Text primaryColor>{t("status")}: <Text >{reservationDetails.status}</Text></Text>
          <Text primaryColor>{t("price")}: <Text >{reservationDetails.currency + " "+reservationDetails.fare}</Text></Text>
          <Text primaryColor>{t("notes_for_passengers")}: <Text >{reservationDetails.notesByAdmin}</Text></Text>
          <Text primaryColor>{t("status")}: <Text >{reservationDetails.status}</Text></Text>
         

          <Button title="Close" onPress={onClose} />
        
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
