import React, {useEffect, useState, useCallback} from 'react';
import {View, Modal} from 'react-native';
import Form from './components/Form';
import List from './components/List';
import {useDispatch, useSelector} from 'react-redux';

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
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      {addData && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={addData}
          
          onRequestClose={() => {
            setAddData(!addData);
          }}>
             <SafeAreaView
             style={BaseStyle.safeAreaView}
                edges={['right', 'top', 'left']}>
          <Form close={close} selectedData={selectedData} />
          </SafeAreaView>
        </Modal>
      )}

      <List
        onPressListItem={onPressListItem}
        navigation={navigation}
        add={add}
        locationId={selectedLocation}
      />
    </SafeAreaView>
  );
}
