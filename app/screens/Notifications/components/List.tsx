import React, { useEffect, useState, memo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme, BaseStyle } from '../../../config';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { useComplain, useMutationDelete } from '../hooks/complain';
// import Accordion from "@gapur/react-native-accordion";
import Spinner from 'react-native-loading-spinner-overlay';

import Accordian from './Accordian';
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
export interface FileNameProps {
  add: Function;
  navigation: any;
  locationId: any;
  onPressListItem: (data: ItemData) => void;
}
type TicketStatus = {
  id: number;
  name: string;
};
type TicketPriority = {
  id: number;
  name: string;
};
type User = {
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
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

function Index({ add, navigation, locationId, onPressListItem }: FileNameProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutationDelete();
  const { colors } = useTheme();
  const { isLoading, isSuccess, isError, error, isFetching } = useComplain({
    PageNumber: 0,
    PageSize: 100,
    locationId: locationId,
  });

  // useEffect(() => {
  //   console.log({isFetching,data});
  // }, [isFetching,data]);

  const data:any = [{
    id: "1",
    pickup: "Istanbu",
    destination:"Izmir",
    description: "string",
    ticketStatus: "TicketStatus",
    createdAt: new Date(),
    ticketPriorityId: 1,
    createdBy: "Ali",
    user: {
      id: 1,
      name: "Ali",
    },

    ticketPriority: {
      id: 1,
      name: "New",
    },
    ticketHistory: [],
  },{
    id: "1",
    pickup: "Istanbu",
    destination:"Izmir",
    description: "string",
    ticketStatus: "TicketStatus",
    createdAt: new Date(),
    ticketPriorityId: 1,
    createdBy: "Ali",
    user: {
      id: 1,
      name: "Ali",
    },

    ticketPriority: {
      id: 1,
      name: "New",
    },
    ticketHistory: [],
  }]

  const deleteListItem = async (id: number) => {
    Alert.alert(
      'Deleet ticket',
      'Are you sure? This action can not be reverted',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Deleet',
          onPress: () => mutate(id),
        },
      ],
    );
  };
  const renderItem = ({ item }: { item: ItemData }) => {
    return (
      <Accordian
        item={item}
        onPress={onPressListItem}
        deleteListItem={deleteListItem}
      />
    );
  };

  if (false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
          visible={isLoading}
          textContent={'Fetcing List...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
  if (false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text primaryColor body1>
          {/* {error.message} */}
        </Text>
      </View>
    );
  }
  //  if(true) return <></>
  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={isPending}
        textContent={'Deleting...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ width: '100%', alignSelf: 'center' }}>
        <FlatList
          refreshing={false}
          onRefresh={() =>
            queryClient.invalidateQueries({ queryKey: ['fetchComplains'] })
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => (
            <Header
              // style={{ backgroundColor: 'white' }}
              title={'Notifications'}
              
              onPressLeft={() => {
                navigation.goBack();
              }}
             
              // onPressLeft={() => navigation.openDrawer()}
              onPressRight={() => {}}
              renderLeft={() => {
                return <Ionicons name="arrow-back" size={20} color={colors.primary} />;
              }}
              onPressRightSecond={() => queryClient.invalidateQueries({ queryKey: ['fetchComplains'] })}
             
             
              renderRightSecond={() => {
                return <Feather name="refresh-ccw" size={30} color={colors.primary} />;
              }}
            />
          )}
          data={data}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
export default memo(Index);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
