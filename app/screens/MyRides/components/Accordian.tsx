import React from 'react';
import moment from 'moment';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme, BaseStyle, BaseColor} from '../../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import {useUpdateReservation} from '../hooks/myRides';
import {sendNotification} from '../../../utils/messagingSetup';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

function Accordian({item}: any) {
  const {t} = useTranslation();

  const {name} = useSelector((state: any) => state.Auth);
  const {mutateAsync, isPending} = useUpdateReservation();
  const queryClient = useQueryClient();
  const handleUpdate = (status: string) => {
    mutateAsync({
      docId: item.id,
      status: status,
      // Add more fields as needed
    }).then(() => {
      sendNotification(
        t('ride_request_response'),
        `${name} has  ${status.toLowerCase()} a taxi request`,
        true,
      );
      queryClient.invalidateQueries({queryKey: ['fetchMyRides']});
    });
  };
  // console.log({ item })
  const {colors} = useTheme();
  const getStatusColor = (status: string) => {
    if (status === 'Pending') {
      return 'orange';
    } else if (status === 'Accepted') {
      return 'blue';
    } else if (status === 'Confirmed') {
      return 'green';
    } else if (status === 'Canceled') {
      return 'yellow';
    } else if (status === 'Rejected') {
      return 'red';
    } else {
      return 'orange';
    }
  };
  return (
    <View
      style={{
        width: '95%',
        alignSelf: 'center',
        borderRadius: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,

        // elevation: 6,
        // backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderColor: '#c2c2c2',
      }}>
      <View style={{width: '95%', alignSelf: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
           
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
            <View style={{width: '50%'}}>
            <View
              style={{
              
              }}>
             
              
              {item.status === 'Accepted' ? 
                <Text primaryColor headline >
                {t("ride_proposal")}
                </Text>
                :  <Text headline primaryColor >
               
                {t("ride_detail")}
                </Text>
              }
             
            </View>
         
          </View>
          <View style={{width: '50%'}}>
            <View
              style={{
              alignSelf: 'flex-end',
              }}>
              <Text primaryColor style={{...styles.headerLabelText}}>
                {moment(item.createdAt.toDate()).format('M/D/Y HH:mm ')}
              </Text>
            </View>
         
          </View>
        </View>
        <View
              style={{
                width: '100%',
                height: 2,
                backgroundColor: colors.primary,
                marginTop: 5,
                marginBottom: 5,
              }}
            />
        <View style={{  flexDirection: 'row',  }}>
        <View style={{width: '30%'}}>
            <Text style={styles.headerLabelText}>{t('booking_date')}</Text>
            
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.headerLabelText}>
             : {moment(item.dateTime.toDate()).format('M/D/Y HH:mm')}
            </Text>
            
          </View>
        </View>

        <View style={{  flexDirection: 'row',  }}>
        <View style={{width: '30%'}}>
        <Text style={styles.headerLabelText}>{t('pickup')}</Text>
            
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.headerLabelText}>
            <Text style={styles.headerLabelText}>: {item.pickupLocation}</Text>
            </Text>
            
          </View>
        </View>
        <View style={{  flexDirection: 'row',  }}>
        <View style={{width: '30%'}}>
        <Text style={styles.headerLabelText}>{t('payment')}</Text>
            
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.headerLabelText}>
            <Text style={styles.headerLabelText}>: { t(item.payment)}</Text>
            </Text>
            
          </View>
        </View>

        <View style={{  flexDirection: 'row',  }}>
        <View style={{width: '30%'}}>
        <Text style={styles.headerLabelText}>{t('drop_of')}</Text>
            
          </View>
          <View style={{width: '80%'}}>
          
            <Text style={styles.headerLabelText}>: {item.dropOfLocation}</Text>
            
            
          </View>
        </View>

        <View style={{  flexDirection: 'row',  }}>
        <View style={{width: '30%'}}>
        <Text style={styles.headerLabelText}>{t('notes_from_admin')}</Text>
            
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.headerLabelText}>
            <Text style={styles.headerLabelText}>{item.notesByAdmin}</Text>
            </Text>
            
          </View>
        </View>
        {item.status != 'Pending' && (
              <Text headline>{item.currency + item.fare}</Text>
            )}
    
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
                  backgroundColor: getStatusColor(item.status ?? ''),
                }}
              />

              <Text style={styles.headerLabelText}>
                {t(item.status) ?? 'Completed'}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 120,
            }}></View>
        </View>
        {item.status === 'Accepted' && (
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // width: 120,
              alignSelf: 'flex-end',
              gap:10
            }}>
            {isPending ? (
              <ActivityIndicator size={'small'} color={colors.primary} />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => handleUpdate('Confirmed')}
                  style={{justifyContent: 'center', alignItems: 'center', backgroundColor:colors.primary, paddingHorizontal:10, paddingVertical:5, borderRadius:5}}>
                  {/* <Entypo name="check" size={28} color={'green'} /> */}
                  <Text whiteColor>{t('confirm')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{justifyContent: 'center', alignItems: 'center', backgroundColor:"red",  paddingHorizontal:10, paddingVertical:5, borderRadius:5}}
                
                
                onPress={() => handleUpdate('Cancelled')}>
                  {/* <Entypo name="cross" size={32} color={'red'} /> */}
                  <Text>{t('cancel')}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
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
