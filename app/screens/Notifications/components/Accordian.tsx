import React from 'react';
import moment from 'moment';
import {
  
  StyleSheet,
  View,
 
  Image,
  FlatList,
} from 'react-native';
import {
  Text,
   
  Header,
  Button,
  TextInput,
  SearchBox,
  SafeAreaView,
  Icon,
  Dropdown,
  DateTimePicker,
} from '../../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


import {TouchableOpacity} from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {useTheme, BaseStyle, BaseColor} from '../../../config';

type TicketStatus = {
  id: number;
  name: string;
};
type User = {
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
  ticketPriorityId: number;
  createdBy: string;
  user: User;
  ticketPriority: TicketPriority;
  ticketHistory: Array<any>;
};
type ItemProps = {
  item: ItemData;
  onPress: (data: ItemData) => void;
  deleteListItem: (id: number) => void;
};
function Accordian({item, onPress, deleteListItem}: ItemProps) {
  const {colors} = useTheme();
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
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{
        width: '100%',
        // backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderColor: '#c2c2c2',
      }}>
      <View style={{width: '95%', alignSelf: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View style={{width: '100%'}}>
          <View style={{alignSelf: 'flex-end', width: '30%'}}>
            {/* <Text style={styles.headerLabelText}>
              
              {moment(moment.utc(item.createdAt).toDate()).fromNow()}
            </Text> */}
            <Text style={{...styles.headerLabelText,  }}>
              {moment(moment.utc(item.createdAt).toDate()).format(
                'MM/DD/YY hh:mm A',
              )}
            </Text>
            
          </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="bell"
                color={'#c2c2c2'}
                size={20}
              />
              <Text style={styles.headerLabelText}> #{item.id} </Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 14, width: '100%'}}>
             Your Ride acceepted
              </Text>
            </View>
            
          </View>
        
        </View>
       
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#c2c2c2',
    borderRadius: 0,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
  },
  headerLabelText: {
    // color: 'black',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 23,
  },
  headerValue: {},
  headerValueText: {
    color: 'gray',
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    lineHeight: 19,
  },
  safearea: {
    backgroundColor: 'white',
    overflow: 'hidden',

    zIndex: 3,
  },
  screen: {
    backgroundColor: 'white',
    flex: 1,
    flexGrow: 1,
  },
  socialImage: {
    height: 20,
    marginRight: 4,
    width: 20,
  },
});

export default Accordian;
