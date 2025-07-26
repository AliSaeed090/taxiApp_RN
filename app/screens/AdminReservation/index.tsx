import React, {useEffect, useState, useCallback} from 'react';
import {View, Modal} from 'react-native';
import ReservationDetailsModal from './components/Form';
import List from './components/List';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import { requestUserPermission, notificationListener } from '../../utils/messagingSetup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Text,
  Image,
  Header,
  Button,
  TextInput,
  SearchBox,
  SafeAreaView,
  Icon,
  Dropdown,
  DateTimePicker,
} from '../../components';
import {useTheme, BaseStyle} from '../../config';
export interface FileNameProps {
  navigation: any;
}
type User = {
  id: number;
  name: string;
};
type ItemData = {
  id: number;
  issue: string;
  description: string;
  user: User;
  createdAt: string;
  ticketPriorityId: number;
  createdBy: string;
 

  ticketHistory: Array<any>;
};
export default function Index({navigation}: FileNameProps) {
  const queryClient = useQueryClient();
  const {selectedLocation, userLocation} = useSelector(
    (state: any) => state.Auth,
  );
  const {colors} = useTheme();
  const [addData, setAddData] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const add = useCallback(() => {
    setAddData(true);
    setSelectedData(null);
  }, []);
  const close = useCallback(() => {
    setAddData(false);
  }, []);
  const onPressListItem = useCallback((ItemData: ItemData) => {
    setAddData(true);
    setSelectedData(ItemData);
  }, []);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAccept = (price: number, currency: string, notes: string) => {
    console.log('Accepted with price:', price, 'currency:', currency, 'notes:', notes);
    setAddData(false);
  };

  const handleReject = () => {
    console.log('Rejected');
    setAddData(false);
  };
 useEffect(()=>{
  requestUserPermission(), notificationListener(navigation,queryClient) 
 } ,[])
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
 
      {addData===true&&   <ReservationDetailsModal
         visible={addData}
         onClose={() => setAddData(false)}
         onAccept={handleAccept}
         onReject={handleReject}
         reservationDetails={selectedData}
       />}
       
       

      <List
        onPressListItem={onPressListItem}
        navigation={navigation}
        add={add}
        locationId={selectedLocation}
      />
    </SafeAreaView>
  );
}
