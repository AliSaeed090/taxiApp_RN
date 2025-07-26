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
import {useFtchComplainById, useMutationSaveNotes} from '../hooks/complain';
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
  const queryClient = useQueryClient();
  const {mutateAsync, isPending} = useMutationSaveNotes();
  const {data} = useFtchComplainById(selectedData?.id);
  const {userId, selectedLocation, LocationUsers, firstName, lastName} =
    useSelector((state: any) => state.Auth);
  const {colors} = useTheme();
  const [state, setState] = useState(initialState);
  const [ticketNumber, setTicketNumber] = useState<any>(null);
  const [notes, setNotes] = useState<any>('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [ViewHistory, setViewHistory] = useState<any>(null);

  const [openDropDownStatus, setOpenDropDownStatus] = useState(false);
  const [ticketHistory, setTicketHistory] = useState<any>([]);
  const [ticketNote, setTicketNote] = useState<any>([]);
  const [openDropDownAssignTo, setOpenDropDownAssignTo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const shhetRef: any = useRef();
  const flahRef: any = useRef();

  const [image, setImage] = useState<any>({
    imageName: '',
    fileTyp: '',
    PhotosUrl: '',
    imageString: '',
    isImageDeleted: false,

    path: null,
  });
  const [validations, setValidations] = useState({
    photos: null,
  });
  const [invalidState, setInvalidState] = useState({
    issue: '',
    locationId: '',
    description: '',
    attachement: '',
    ticketPriorityId: '',
    file: '',
  });

  useEffect(() => {
    if (data?.result[0]) {
      let obj = data?.result[0];
      console.log({ticketHistory: obj.ticketHistory});
      setTicketNumber(obj.id);
      setState((prvState: any) => ({
        ...prvState,
        issue: obj.issue,
        description: obj.description,
        ticketPriorityId: obj.ticketPriorityId,
        userId: obj.userId,
        ticketStatusId: obj.ticketStatus?.id ?? null,
      }));
      setTicketHistory(obj.ticketHistory);
      setTicketNote(obj.ticketNote);
    }
  }, [data]);
  useEffect(() => {
    console.log({selectedData});
    if (selectedData) {
      setTicketNumber(selectedData.id);
      setState((prvState: any) => ({
        ...prvState,
        issue: selectedData.issue,
        description: selectedData.description,
        ticketPriorityId: selectedData.ticketPriorityId,
        userId: selectedData.userId,
        ticketStatusId: selectedData.ticketStatus?.id ?? null,
      }));
      setTicketHistory(selectedData.ticketHistory);
      setTicketNote(selectedData.ticketNote);
    }
  }, [selectedData]);
  const updateState = (prop: string, val: any) => {
    setState((prvState: any) => ({...prvState, [prop]: val}));
    setInvalidState((prvState: any) => ({...prvState, [prop]: ''}));
  };

  const setValueStatus = (callback: any) => {
    setState((prvState: any) => ({
      ...prvState,
      ticketStatusId: callback(state.ticketStatusId),
    }));
  };
  const setValue = (callback: any) => {
    setState((prvState: any) => ({
      ...prvState,
      ticketPriorityId: callback(state.ticketPriorityId),
    }));
  };
  const setValueAssignTo = (callback: any) => {
    setState((prvState: any) => ({
      ...prvState,
      userId: callback(state.userId),
    }));
  };
  const requestCameraPermission = async (index: number) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Photo access Permission',
          message:
            'App needs access to your gallery ' +
            'so you can take pick pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        index === 0 ? openCame() : openPicker();
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const openCame = () => {
  
  };
  const openPicker = () => {
    
  };
  const checks = () => {
    if (state.issue === '') {
      setInvalidState(prvState => ({...prvState, issue: 'Title is required'}));
      return false;
    } else if (state.ticketPriorityId === null) {
      setInvalidState(prvState => ({
        ...prvState,
        ticketPriorityId: 'Please select priority ',
      }));
      return false;
    } else if (state.description === '') {
      setInvalidState(prvState => ({
        ...prvState,
        description: 'Please write description ',
      }));
      return false;
    }
    return true;
  };
  const submit = async () => {
    Keyboard.dismiss();
    if (checks()) {
      setIsLoading(true);

      let response;
      try {
        if (ticketNumber) {
          let payload = {
            url: `${rootUrl}/v1/Complain/${ticketNumber}`,
            data: {
              userId: state.userId,
              locationId: selectedLocation,
              issue: state.issue,
              description: state.description,
              attachement: '',
              ticketPriorityId: state.ticketPriorityId,
              file: '',
              ticketStatusId: state.ticketStatusId,
            },
          };
          response = await put(payload);
        } else {
          let payload = {
            url: `${rootUrl}/v1/Complain`,
            data: {
              userId: state.userId,
              locationId: selectedLocation,
              issue: state.issue,
              description: state.description,
              attachement: '',
              ticketPriorityId: state.ticketPriorityId,
              file: '',
              ticketStatusId: state.ticketStatusId,
            },
          };
          response = await post(payload);
        }

        setIsLoading(false);
        if (response?.data?.success) {
          setTicketNumber(response?.data?.result?.id ?? '');
          queryClient.invalidateQueries({queryKey: ['fetchComplains']});
          queryClient.invalidateQueries({queryKey: ['fetchComplainById']});

          flahRef.current.showMessage({
            description: `Complain ${
              ticketNumber ? 'Updated' : 'Submitted'
            } Successfully`,
            message: 'Success',
            type: 'success',
            position: 'bottom',
          });
        } else {
          flahRef.current.showMessage({
            description: 'Complain faild',
            message: 'Error',
            type: 'danger',
          });
        }
      } catch (err) {
        flahRef.current.showMessage({
          description: 'Complain faild',
          message: 'Error',
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  const saveNotes = async () => {
    if (notes === '') return;
    try {
      let payload = {
        notes: notes,
        ticketId: ticketNumber,
      };
      let res = await mutateAsync(payload);
      setNotes('');
      queryClient.invalidateQueries({queryKey: ['fetchComplainById']});
      queryClient.invalidateQueries({queryKey: ['fetchComplains']});
    } catch (err) {
      console.log({err});
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlashMessage ref={flahRef} duration={2000} position="bottom" />
      <Spinner
        visible={isLoading}
        textContent={'Saving...'}
        textStyle={{color: 'white'}}
      />
      <Header
        title={'Add Complain'}
        onPressLeft={() => close()}
        onPressRight={() => submit()}
        renderLeft={() => {
          return (
            <Ionicons name="arrow-back" size={20} color={colors.primary} />
          );
        }}
        renderRight={() => {
          return (
            <Button
              full
              loading={isLoading}
              style={{
                marginTop: 0,
                height: 30,
                borderRadius: 4,
                padding: 0,
                paddingHorizontal: 10,
              }}
              styleText={{fontSize: 14}}
              onPress={submit}>
              {ticketNumber ? 'Update' : 'Save'}
            </Button>
          );
        }}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{width: '95%', alignSelf: 'center'}}>
          {ticketNumber && (
            <Text primaryColor textAlign="center" bold headline>
              Complain#{ticketNumber}
            </Text>
          )}
          <TextInput
            editable={[...ticketHistory, ...ticketNote].length ? false : true}
            style={[BaseStyle.textInput]}
            onChangeText={(text: string) => {
              updateState('issue', text);
            }}
            onFocus={() => {}}
            autoCorrect={false}
            placeholder={'Enter complain title here'}
            placeholderTextColor={BaseColor.grayColor}
            value={state.issue}
            label="Title"
            errorMessage={invalidState.issue}
            selectionColor={colors.primary}
          />
          <Text style={{marginBottom: 5}} subhead>
            Priority
          </Text>

          <Dropdown
            zIndex={2}
            listMode="SCROLLVIEW"
            value={state.ticketPriorityId}
            setOpen={setOpenDropDown}
            open={openDropDown}
            placeholder="Please select"
            items={[
              { label: 'High ', value: 1 },
              { label: 'Medium ', value: 2 },
              { label: 'Low ', value: 3 },
            ]}
            setValue={setValue} errorMessage={''}          />

          <Text style={{marginBottom: 5}} subhead>
            Status
          </Text>

          <Dropdown
            zIndex={1}
            listMode="SCROLLVIEW"
            value={state.ticketStatusId}
            setOpen={setOpenDropDownStatus}
            open={openDropDownStatus}
            placeholder="Please select"
            items={[
              { label: 'Pending', value: 1 },
              { label: 'Inprocess', value: 2 },
              { label: 'Closed', value: 3 },
              { label: 'Hold', value: 4 },
            ]}
            setValue={setValueStatus} errorMessage={''}          />
          <Text footnote style={{color: 'red'}}>
            {invalidState.ticketPriorityId}
          </Text>
          <Text style={{marginBottom: 5}} subhead>
            Assign to
          </Text>

          <Dropdown
            zIndex={0}
            searchable={true}
            listMode="MODAL"
            value={state.userId}
            setOpen={setOpenDropDownAssignTo}
            open={openDropDownAssignTo}
            placeholder="Please select"
            items={LocationUsers.map((x: any) => {
              return {
                label: x.name,
                value: x.id,
              };
            })}
            setValue={setValueAssignTo} errorMessage={''}          />
          <TextInput
            editable={[...ticketHistory, ...ticketNote].length ? false : true}
            style={[BaseStyle.textInput]}
            numberOfLines={8}
            onChangeText={(text: string) => {
              updateState('description', text);
            }}
            textAlignVertical="top"
            multiline={true}
            onFocus={() => {}}
            autoCorrect={false}
            placeholder={'Enter complain description here'}
            placeholderTextColor={BaseColor.grayColor}
            value={state.description}
            label="Description"
            errorMessage={invalidState.description}
            selectionColor={colors.primary}
          />

          <Text footnote style={{color: 'red'}}>
            {validations.photos}
          </Text>
         
          {image.PhotosUrl?.length ? (
            <>
              <Image
                source={{uri: image.PhotosUrl}}
                style={{
                  width: 100,
                  borderRadius: 4,
                  height: 100,
                  marginTop: 10,
                }}
                resizeMode="cover"
              />
            </>
          ) : null}

          {/* Notes/History */}

          {ticketNumber && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}>
                <View style={{width: '15%', overflow: 'hidden'}}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{textTransform: 'uppercase'}}
                      bold
                      title2
                      whiteColor>
                      {firstName[0] + lastName[0]}
                    </Text>
                  </View>
                </View>
                <View style={{width: '85%'}}>
                  <TextInput
                    style={[BaseStyle.textInput]}
                    numberOfLines={8}
                    onChangeText={(text: string) => {
                      setNotes(text);
                    }}
                    textAlignVertical="top"
                    multiline={true}
                    onFocus={() => {}}
                    autoCorrect={false}
                    placeholder={'Type Notes here..'}
                    placeholderTextColor={BaseColor.grayColor}
                    value={notes}
                    // label="Notes"
                    errorMessage={invalidState.description}
                    selectionColor={colors.primary}
                  />
                </View>
              </View>

              <View style={{width: '100%', alignItems: 'flex-end'}}>
                <Button
                  full
                  loading={isPending}
                  style={{
                    marginTop: 0,
                    height: 30,
                    borderRadius: 4,
                    padding: 0,
                    paddingHorizontal: 10,
                    width: '15%',
                  }}
                  styleText={{fontSize: 14}}
                  onPress={saveNotes}>
                  save
                </Button>
              </View>
            </>
          )}
          {ticketNumber && (
            <TouchableOpacity
              onPress={() => setViewHistory(!ViewHistory)}
              style={{marginTop: 0, marginBottom: 20}}>
              <Text primaryColor style={{textDecorationLine: 'underline'}}>
                {ViewHistory ? 'View Discussion' : 'View History'}
              </Text>
            </TouchableOpacity>
          )}
          {ViewHistory === true ? (
            <>
              <Text style={{marginBottom: 10}} title3 bold>
                Ticket History
              </Text>

              {ticketHistory.map((x: any, i: number) => {
                return (
                  <View key={x.id} style={{flexDirection: 'row', marginTop: 5}}>
                    <Text bold grayColor>
                      #{i + 1}
                    </Text>
                    <View
                      style={{
                        borderWidth: 0.5,
                        padding: 5,
                        borderRadius: 5,
                        marginLeft: 5,
                        backgroundColor: colors.card,
                        width: '80%',
                      }}>
                      <Text body2 bold>
                        Ticket Status
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
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
                                getTiketstatus(x.fromTicketStatusId),
                              ),
                            }}
                          />

                          <Text>
                            {getTiketstatus(x.fromTicketStatusId) ??
                              'undefined'}
                          </Text>
                        </View>
                        <Text style={{marginLeft: 5, marginRight: 5}}>
                          ={'>'}
                        </Text>
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
                                getTiketstatus(x.toTicketStatusId),
                              ),
                            }}
                          />

                          <Text>
                            {getTiketstatus(x.toTicketStatusId) ?? 'undefined'}
                          </Text>
                        </View>
                      </View>
                      <Text body2 bold>
                        Assignment
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <Text>{x.fromUser?.name ?? 'unassigned'}</Text>
                        <Text style={{marginLeft: 5, marginRight: 5}}>
                          ={'>'}
                        </Text>
                        <Text>{x.toUser?.name ?? 'unassigned'}</Text>
                      </View>
                      <Text body2 bold>
                        Priority
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <FontAwesome
                          name={
                            x.fromTicketPriorityId?.id === 2
                              ? 'angle-up'
                              : x.fromTicketPriorityId?.id === 3
                              ? 'angle-down'
                              : 'angle-double-up'
                          }
                          size={20}
                          color={
                            x.fromTicketPriorityId?.id === 2
                              ? 'orange'
                              : x.fromTicketPriorityId?.id === 3
                              ? 'blue'
                              : 'red'
                          }
                        />

                        <Text style={{color: 'black', fontSize: 14}}>
                          {x.fromTicketPriorityId?.id === 2
                            ? 'Medium'
                            : x.fromTicketPriorityId?.id === 3
                            ? 'Low'
                            : 'Hight'}
                        </Text>
                        <Text style={{marginLeft: 5, marginRight: 5}}>
                          ={'>'}
                        </Text>
                        <FontAwesome
                          name={
                            x.toTicketPriorityId?.id === 2
                              ? 'angle-up'
                              : x.toTicketPriorityId?.id === 3
                              ? 'angle-down'
                              : 'angle-double-up'
                          }
                          size={20}
                          color={
                            x.toTicketPriorityId?.id === 2
                              ? 'orange'
                              : x.toTicketPriorityId?.id === 3
                              ? 'blue'
                              : 'red'
                          }
                        />

                        <Text style={{color: 'black', fontSize: 14}}>
                          {x.toTicketPriorityId?.id === 2
                            ? 'Medium'
                            : x.toTicketPriorityId?.id === 3
                            ? 'Low'
                            : 'Hight'}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          ) : ViewHistory === false ? (
            <>
              <Text style={{marginBottom: 10}} title3 bold>
                Discussion
              </Text>
              {ticketNote.map((x: any) => {
                return (
                  <View>
                    <View
                      key={x.id}
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '10%', overflow: 'hidden'}}>
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                            backgroundColor: colors.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{textTransform: 'uppercase'}}
                            overline
                            whiteColor>
                            {getAvtar(x.createdBy)}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '90%',
                          backgroundColor: colors.card,
                          padding: 10,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: BaseColor.dividerColor,
                        }}>
                        <Text>{x.notes}</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '80%',
                        alignSelf: 'center',
                      }}>
                      <Text bold overline>
                        {x.createdBy}
                      </Text>
                      <Text overline grayColor>
                        {moment(moment.utc(x.createdAt).toDate()).fromNow()}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </>
          ) : null}
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
}
