import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme, BaseStyle, BaseColor} from '../../../config';


import {post, put} from '../../../redux/services/api';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useQueryClient} from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
// import {useFtchComplainById, useMutationSaveNotes} from '../hooks/complain';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
} from '../../../components';
import {rootUrl} from '../../../utilities/constants';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// "attachement": "", "createdAt": "2023-12-01T01:55:35.107", "createdBy": "Operator test", "description": "ssdsdsdsd", "file": null, "id": 37, "issue": "dsdsd", "location": {"id": 1, "name": "water plant"}, "locationId": 1,
// "ticketHistory": [], "ticketPriority": {"id": 1, "name": "High"}, "ticketPriorityId": 1, "ticketStatus": {"id": 1, "name":
// "Pending"}, "updatedAt": "2023-12-01T01:55:35.107", "updatedBy": "Operator test", "user": null, "userId": null
const initialState = {
  locationId: 0,
  issue: '',
  description: '',
  attachement: '',
  ticketPriorityId: null,
  file: '',
  userId: null,
  ticketStatusId: 1,
};
const source = 'data:image/jpeg;base64,';
type TicketStatus = {
  id: number;
  name: string;
};
type TicketPriority = {
  id: number;
  name: string;
};

type ItemData = {
  id: number;
  issue: string;
  description: string;
  ticketStatus: TicketStatus;
  createdAt: string;
  ticketPriorityId: any;
  createdBy: string;
  user: string;
  ticketPriority: TicketPriority;
  ticketHistory: Array<any>;
  userId: any;
  ticketStatusId: string;
  ticketNote: Array<any>;
};
export interface FileNameProps {
  close: Function;
  selectedData: ItemData;
}

const getAvtar = (str: string) => {
  return str
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '');
};

const getTiketstatus = (id: number) => {
  if (id === 1) {
    return 'Pending';
  } else if (id === 2) {
    return 'Inprocess';
  } else if (id === 3) {
    return 'Closed';
  } else if (id === 4) {
    return 'Hold';
  } else {
    return 'unassigned';
  }
};
const getStatusColor = (status: string) => {
  if (status === 'Pending') {
    return 'red';
  } else if (status === 'Inprocess') {
    return 'blue';
  } else if (status === 'Closed') {
    return 'green';
  } else if (status === 'Hold') {
    return 'yellow';
  } else {
    return 'orange';
  }
};
export default function Index({close, selectedData}: FileNameProps) {
 
  const {userId, selectedLocation, LocationUsers, firstName, lastName} =
    useSelector((state: any) => state.Auth);
  const {colors} = useTheme();
 
 
 
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      
     
      <Header
        title={'Add Complain'}
        onPressLeft={() => close()}
        // onPressRight={() => submit()}
        renderLeft={() => {
          return (
            <Ionicons name="arrow-back" size={20} color={colors.primary} />
          );
        }}
        renderRight={() => {
          return (
            <Button
              full
              // loading={isLoading}
              style={{
                marginTop: 0,
                height: 30,
                borderRadius: 4,
                padding: 0,
                paddingHorizontal: 10,
              }}
              styleText={{fontSize: 14}}
              // onPress={submit}
              >
              
            </Button>
          );
        }}
      />
    
    </SafeAreaView>
  );
}
