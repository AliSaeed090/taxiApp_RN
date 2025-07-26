import React from 'react';
import moment from 'moment';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Linking,
  Alert
} from 'react-native';
import {
  Text,


} from '../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme, BaseStyle, BaseColor } from '../../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import { useUpdateReservation } from '../hooks/myRides';
import {useTranslation} from 'react-i18next';
 
 
function Accordian({ item, onPress, deleteListItem, index }: any) {
  const {t} = useTranslation();
  const handlePress = async () => {
    const url = `tel:${item.phoneNumber}`;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert("Unable to make a call", "Your device doesn't support this feature.");
    }
  };
  const {mutateAsync, isPending} = useUpdateReservation();
  const queryClient = useQueryClient();
  const handleUpdate = (status:string) => {
    mutateAsync({
      docId:item.id,
      status: status,
      // Add more fields as needed
    }).then(()=>{
      
      queryClient.invalidateQueries({queryKey: ['fetchRidesHistory']});
    });
  };
  // console.log({ item })
  const { colors } = useTheme();
  const getStatusColor = (status: string) => {
    if (status === 'Pending') {
      return 'orange';
    } else if (status === 'Accepted') {
      return 'blue';
    } else if (status === 'Confirmed') {
      return 'green';
    } else if (status === 'Canceled') {
      return 'yellow';
    } 
    else if (status === 'Rejected') {
    return 'red';
  } 
    else {
      return 'orange';
    }
  };
  return (
    <View
       
      style={{
        width: '100%',
        // backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderColor: '#c2c2c2',
      }}>
      <View style={{ width: '95%', alignSelf: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View style={{ width: '100%' }}>
            <View style={{ alignSelf: 'flex-end', width: '30%' }}>
              <Text style={styles.headerLabelText}>
                {/* {moment.utc(item.createdAt).fromNow()} */}
                {/* {moment(moment.utc(item.createdAt).toDate()).fromNow()} */}
              </Text>
              <Text style={{ ...styles.headerLabelText, }}>
                {/* {moment(moment.utc(item.createdAt).toDate()).format(
                  'MM/DD/YY hh:mm A',
                )} */}
                {moment(item.createdAt.toDate()).format(
                  'Do-MMM-YY, h:mm a',
                )}
              </Text>

            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
              }}>


              <Text numberOfLines={1}
                style={{ fontSize: 14, width: '100%' }}>
                
                {t("when")}: {moment(item.dateTime.toDate()).format(
                  'Do-MMM-YY, h:mm a',
                )}
                
              </Text>
            </View>

          </View>

        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View>
            <View
              style={{
                marginTop: 0,
              }}>
              <Text style={styles.headerLabelText}>
              <Text caption2 primaryColor >{t("pickup")}</Text> : {item.pickupLocation}
              </Text>
              <Text style={styles.headerLabelText}>
                  <Text caption2  primaryColor>{t("drop_of")}</Text> : {item.dropOfLocation ?? 'Completed'}
              </Text>
             
            
             <>
              {/* <Text style={styles.headerLabelText}>
             <Text caption2 primaryColor > No of Passangers</Text> : {item.noOfPassanger}
              </Text>
              <Text style={styles.headerLabelText}>
             <Text caption2 primaryColor > No of Suitcase</Text> : {item.noOfSuitcase}
              </Text>*/}
              <Text style={styles.headerLabelText}>
             <Text caption2 primaryColor >{t("user_name")}</Text> : {item.user.name}
              </Text>
              <Text style={styles.headerLabelText}>
             <Text caption2 primaryColor >{t("payment")}</Text> : {item.payment}
              </Text>
              
              <Text style={styles.headerLabelText}>
             <Text caption2 primaryColor >{t("user_type")}</Text> : {item.user.userType}
              </Text> 
              <Text style={styles.headerLabelText}>
             <Text caption2 primaryColor >{t("phone_no")}</Text> :
             <TouchableOpacity onPress={handlePress}>
             <Text caption2 primaryColor style={{textDecorationLine:"underline"}} >
          
             {item.phoneNumber}
             </Text>
             </TouchableOpacity>
              </Text>
              {/* <Text style={styles.headerLabelText}>
                  <Text caption2  primaryColor> instructions By Passanger</Text> : {item.instructionsByPassanger ?? 'Completed'}
              </Text> */}
              </>
              
            </View>


          </View>
          <View style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            width: 120,

          }}>


          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View>



            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  marginRight: 10,
                  borderRadius: 10,
                  backgroundColor: getStatusColor(
                    item.status ?? '',
                  ),
                }}
              />

              <Text style={styles.headerLabelText}>
                {item.status ?? 'Completed'}
              </Text>
            </View>


          </View>
          <View style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            width: 120,

          }}>


          </View>
        </View>
     
        <View  style={{
            marginTop:20,
                // flexDirection: 'row',
                alignItems: 'flex-end',
                // justifyContent:"space-between",
                width:120,
                alignSelf:"flex-end"
                
              }}>
            
            { 
             <TouchableOpacity onPress={()=>onPress(item)} style={{justifyContent:"center", alignItems:"center"}}  >
                <Entypo name="eye" size={28} color={'green'} />
                <Text>{t("view_details")}</Text>
              </TouchableOpacity>
               }
          </View>
      </View>
    </View>
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
