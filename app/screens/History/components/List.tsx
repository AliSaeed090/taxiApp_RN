import React, { useEffect, useState, memo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl
} from 'react-native';
import { useTheme, BaseStyle } from '../../../config';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMyRides } from '../hooks/myRides'; 

// import { useComplain, useMutationDelete } from '../hooks/complain';
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
  onPressListItem: (data: any) => void;
}
 

 
 

function Index({ add, navigation, locationId, onPressListItem }: FileNameProps) {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const [ridesData, setridesData] = useState<any>([]);
  const [lastPage, setlastPage] = useState<any>([]);
  // const { mutate, isPending } = useMutationDelete();
  const { colors } = useTheme();
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error, refetch
  } = useMyRides();
  // useEffect(() => {
  //   console.log({isLoading,data:data?.pages});
  //   if(data&& data.pages){
  //     let pagesArr=data.pages.map((x:any)=>{
  //       return x
  //     })
  //     if(pagesArr.length){
  //       let arr=[...ridesData]
  //       arr=[...arr,  ...pagesArr[0]?.rides]
  //       // setridesData((prvState: any) => ([
  //       //   ...prvState,
  //       //   ...pagesArr[0]?.rides
  //       // ]));
  //       setridesData(arr)
  //       setlastPage(pagesArr[0]?.lastDoc)
  //     }
  
  //   }
  // }, [isLoading,data]);

   

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
          // onPress: () => mutate(id),
        },
      ],
    );
  };
  const renderItem = ({ item }: { item: any }) => {
    return (
      <Accordian
        item={item}
         
        onPress={onPressListItem}
        deleteListItem={deleteListItem}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
          visible={isLoading}
          textContent={'Fetcing Rides...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }
  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text primaryColor body1>
          {JSON.stringify(error)}
        </Text>
      </View>
    );
  }
  
  const loadMoreRides = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Re-fetch data
    setRefreshing(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', alignSelf: 'center' }}>
        <FlatList
          refreshing={isLoading}
          onRefresh={() =>
            onRefresh()
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => (
            <Header
            
            title={t('rides_history')}
            onPressLeft={() => navigation.openDrawer()}
            onPressRight={() => { }}
            renderLeft={() => {
              return <Feather name="menu" size={20} color={colors.primary} />;
            }}
              style={{backgroundColor:colors.background}}
              
                       
              
            
              onPressRightSecond={() => onRefresh()}
              renderRightSecond={() => {
                return <Feather name="refresh-ccw" size={30} color={colors.primary} />;
              }}
            />
          )}
          data={data?.pages.flatMap((page:any) => page.rides) || []} // Flatten the pages to get a single array of rides
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          ListFooterComponent={()=>(
            isFetchingNextPage===true&&
            <View style={{width:"100%", height:60,  justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator  size={'small'} color={colors.primary}/>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary} // Spinner color (iOS)
            />
          }
          onEndReached={loadMoreRides}
          onEndReachedThreshold={0.5} // Load more when the list is 50% scrolled
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
