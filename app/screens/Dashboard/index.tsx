import { View, ScrollView, StyleSheet,Dimensions, PermissionsAndroid, Platform, Alert } from 'react-native';
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
import firestore, { FirebaseFirestoreTypes, where } from '@react-native-firebase/firestore';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestUserPermission, notificationListener } from '../../utils/messagingSetup';
import Geolocation from 'react-native-geolocation-service';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, BaseStyle } from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
navigator.geolocation = require('react-native-geolocation-service');
import messaging from '@react-native-firebase/messaging';
// tsrnf
type Props = {};
const apiKey = Platform.OS === 'android' ? 'AIzaSyCBh......' : 'AIzaSyCBh......'
const data = {

  "from_st_anton_center": {
    "1_8_person": {
      "Zentrum_St_Anton": { "day": 15.00, "night": 18.00 },
      "Gastig_Mooserkreuz_Dengert": { "day": 17.00, "night": 20.00 },
      "Stadle_Schülerhof_Arlbergstrasse_Skilehrerhaus": { "day": 16.00, "night": 18.00 },
      "Mooserwirt_KK_Taps_Kaminstube": { "day": 20.00, "night": 23.00 },
      "Nasserein_1_ab_Reselhof_Nassereinerhof": { "day": 18.00, "night": 21.00 },
      "Nasserein_2_Pfarrwieg_ab_Kapelle": { "day": 19.00, "night": 24.00 },
      "St_Jakob_1_Rafalt_Bach_Timmler_Brunnen": { "day": 18.00, "night": 22.00 },
      "St_Jakob_2_ab_Kirche_Gsör_Sägewerk_M_Preis": { "day": 20.00, "night": 23.00 },
      "St_Jakob_3_Gand_Untergand_Obergand": { "day": 22.00, "night": 25.00 },
      "Arlbergtunnel_Mautstelle": { "day": 26.00, "night": 31.00 },
      "Bludenz": { "day": 101.00, "night": 135.00 },
      "Dalaas": { "day": 82.00, "night": 110.00 },
      "Ferwall": { "day": 32.00, "night": 37.00 },
      "Flirsch": { "day": 42.00, "night": 52.00 },
      "Flirsch_Berg": { "day": 52.00, "night": 62.00 },
      "Galtür": { "day": 142.00, "night": 157.00 },
      "Hangar": { "day": 27.00, "night": 32.00 },
      "Ischgl": { "day": 125.00, "night": 145.00 },
      "Kappl": { "day": 102.00, "night": 125.00 },
      "Klösterle": { "day": 80.00, "night": 95.00 },
      "Landeck": { "day": 75.00, "night": 88.00 },
      "Langen_am_Arlberg": { "day": 75.00, "night": 85.00 },
      "Lech_am_Arlberg": { "day": 78.00, "night": 88.00 },
      "Lech_Zug_Oberlech": { "day": 85.00, "night": 110.00 },
      "Pettneu": { "day": 31.00, "night": 36.00 },
      "Pettneu_Reit": { "day": 36.00, "night": 41.00 },
      "Pians": { "day": 62.00, "night": 72.00 },
      "Alpe_Rauz_Valfagehrbahn": { "day": 42.00, "night": 55.00 },
      "Schnann": { "day": 39.00, "night": 46.00 },
      "See": { "day": 77.00, "night": 92.00 },
      "St_Christoph": { "day": 33.00, "night": 40.00 },
      "Strengen": { "day": 52.00, "night": 66.00 },
      "Strengen_Berg": { "day": 63.00, "night": 74.00 },
      "Stuben_am_Arlberg": { "day": 64.00, "night": 78.00 },
      "Ulmerhütte_Materialseilbahn": { "day": 35.00, "night": 40.00 },
      "Wald_am_Arlberg": { "day": 84.00, "night": 104.00 },
      "Zams_Hospital": { "day": 82.00, "night": 93.00 },
      "Zürs_am_Arlberg": { "day": 64.00, "night": 78.00 },
      "Stanz": { "day": 76.00, "night": 97.00 },
      "Längenfeld": { "day": 190.00, "night": 235.00 }
    }
  },

  "from_mooserwirt_and_krazy_kanguruh": {
    "1_8_person": {
      "Nasserein_1_ab_Schranke_Parkplatz": { "day": 23.00, "night": 28.00 },
      "Nasserein_2_Pfarrwieg_ab_Kapelle": { "day": 24.00, "night": 29.00 },
      "St_Jakob_1_Rafalt_Bach_Timmler_Brunnen": { "day": 24.00, "night": 29.00 },
      "St_Jakob_2_ab_Kirche_Gsör_Sägewerk_M_Preis": { "day": 26.00, "night": 31.00 },
      "St_Jakob_3_Gand_Untergand_Obergand": { "day": 29.00, "night": 36.00 },
      "Pettneu_am_Arlberg": { "day": 39.00, "night": 47.00 },
      "Schnann": { "day": 41.00, "night": 52.00 },
      "Flirsch": { "day": 52.00, "night": 62.00 },
      "Flirsch_Berg": { "day": 67.00, "night": 77.00 },
      "Strengen": { "day": 62.00, "night": 72.00 },
      "Strengen_Berg": { "day": 77.00, "night": 87.00 }
    }
  },
  "from_st_cristoph_am_arlberg": {
    "1_8_person": {
      "Ferwall": { "day": 42.00, "night": 52.00 },
      "Flirsch": { "day": 57.00, "night": 67.00 },
      "Klösterle": { "day": 70.00, "night": 78.00 },
      "Langen_am_Arlberg": { "day": 62.00, "night": 73.00 },
      "Lech_am_Arlberg": { "day": 67.00, "night": 77.00 },
      "Lech_Zug_Oberlech": { "day": 78.00, "night": 95.00 },
      "Pettneu_am_Arlberg": { "day": 42.00, "night": 50.00 },
      "Alpe_Rauz_Valfagehrbahn": { "day": 31.00, "night": 37.00 },
      "Schnann": { "day": 52.00, "night": 62.00 },
      "St_Anton_bis_Nassereinerhof": { "day": 38.00, "night": 45.00 },
      "Stuben_am_Arlberg": { "day": 52.00, "night": 62.00 },
      "Ulmerhütte_Materialseilbahn": { "day": 25.00, "night": 37.00 },
      "Zürs_am_Arlberg": { "day": 54.00, "night": 63.00 }
    }
  },

  "transfers_austria_1": {
    "1_3_person": {
      "Bregenz": { "price": 240.00 },
      "Feldkirch": { "price": 180.00 },
      "Innsbruck_Airport": { "price": 220.00 },
      "Innsbruck_City_Bahnhof": { "price": 250.00 },
      "Imst": { "price": 110.00 },
      "Ötztal_Bahnhof": { "price": 147.00 },
      "Salzburg": { "price": 600.00 },
      "Schruns": { "price": 147.00 },
      "Sölden": { "price": 260.00 },
      "Obergurgl": { "price": 290.00 },
      "Dornbirn": { "price": 210.00 }
    },
    
  },
  "transfers_austria_2": {
    "4_8_person": {
      "Bregenz": { "price": 350.00 },
      "Feldkirch": { "price": 240.00 },
      "Innsbruck_Airport": { "price": 290.00 },
      "Innsbruck_City_Bahnhof": { "price": 320.00 },
      "Imst": { "price": 170.00 },
      "Ötztal_Bahnhof": { "price": 220.00 },
      "Salzburg": { "price": 800.00 },
      "Schruns": { "price": 220.00 },
      "Sölden": { "price": 350.00 },
      "Obergurgl": { "price": 380.00 },
      "Dornbirn": { "price": 290.00 }
    }
     
  },
  "airport_transfer_winter_season_2024_2025_1": {
    "1_3_person": {
      "Zürich_Airport": { "price": 460.00 },
      "Innsbruck": { "price": 220.00 },
      "St_Gallen_Altenrhein": { "price": 270.00 },
      "St_Moritz": { "price": 460.00 },
      "Davos": { "price": 470.00 },
      "Vaduz": { "price": 240.00 },
      "Buchs": { "price": 220.00 },
      "Sargans": { "price": 230.00 },
      "Munich_Airport": { "price": 630.00 },
      "Munich_City": { "price": 600.00 },
      "Friedrichshafen_Airport": { "price": 350.00 },
      "Memmingen_Airport": { "price": 370.00 }
    },
    
  },
  "airport_transfer_winter_season_2024_2025_2": {
     
    "4_8_person": {
      "Zürich_Airport": { "price": 480.00 },
      "Innsbruck": { "price": 240.00 },
      "St_Gallen_Altenrhein": { "price": 280.00 },
      "St_Moritz": { "price": 490.00 },
      "Davos": { "price": 490.00 },
      "Vaduz": { "price": 250.00 },
      "Buchs": { "price": 260.00 },
      "Sargans": { "price": 270.00 },
      "Munich_Airport": { "price": 660.00 },
      "Munich_City": { "price": 620.00 },
      "Friedrichshafen_Airport": { "price": 360.00 },
      "Memmingen_Airport": { "price": 380.00 }
    }
  },
  "hut_and_alpine_pasture_rides": {
    "summer": {
      "Ebene": { "price": 45.00 },
      "Ferwall_Gasthaus": { "price": 35.00 },
      "Gampen": { "price": 70.00 },
      "Kartellboden_Stausee": { "price": 105.00 },
      "Konstanzer_Hütte": { "price": 85.00 },
      "Putzenalm": { "price": 75.00 },
      "Rendlalm": { "price": 75.00 },
      "Rodelhütte": { "price": 35.00 },
      "Rossfallalpe": { "price": 85.00 },
      "Salzhütte": { "price": 45.00 },
      "Ulmerhütte_Materialseilbahn": { "price": 35.00 },
      "Schön_Ferwall_AbzweigerS": { "price": 85.00 },
      "Tritschalpe": { "price": 85.00 },
      "Ganatschalpe": { "price": 85.00 },
      "Lavenar": { "price": 45.00 },
      "Malfonalm": { "price": 85.00 },
      "Nessleralm": { "price": 75.00 },
      "Warth": { "price": 90.00 },
      "Steeg": { "price": 115.00 },
      "Kaisers": { "price": 130.00 },
      "Schröcken": { "price": 125.00 },
      "Formarinsee": { "price": 130.00 },
      "Verpeilalm_Kaunertal": { "price": 220.00 },
      "Oberstdorf_Deutschland": { "price": 330.00 }
    }
  },
   
 



};
const screenHeight = Dimensions.get('window').height;
const ninetyPercentHeight = screenHeight * 0.5;

const Index = (props: any) => {
  const mapRef = useRef<any>(null);
  const queryClient = useQueryClient();
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  Geocoder.init(apiKey);
  const [currentPosition, setcurrentPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [address, setAddress] = useState('');

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    // bottomSheetRef.current?.snapToIndex(3);
  }, []);

  const getAddressFromCoordinates = (latitude: number, longitude: number,destination:string) => {
    Geocoder.from(latitude, longitude)
      .then((json) => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
        navigation.navigate("ReserveTaxi", { currentPosition: addressComponent, destination: destination });
      })
      .catch((error) => console.warn(error));
  };
  useEffect(() => {
    // firestore().collection("priceList").doc("list").set(data)
    requestUserPermission();
   
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse');
        getLocation();
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location for accurate taxi services.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert('Permission Denied', 'Location permission is required for accurate taxi services.');
        }
      }
    };
    requestLocationPermission();
    
    notificationListener(navigation,queryClient);
  

 
    
  }, []);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Position:', position);
        const { latitude, longitude } = position.coords;
        
        setcurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        })
        const newRegion = {
          ...currentPosition,
          latitude,
          longitude,
        };

        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000); // Animate to current location
        }
      },
      (error) => {
        console.log('Error:', error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };
  const navigate=(destination:any)=>{
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Position:', position);
        const { latitude, longitude } = position.coords;
        getAddressFromCoordinates(latitude, longitude,destination)
        setcurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        })
      

       
      },
      (error) => {
        console.log('Error:', error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
    
  }
  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('quick_taxi')}
        onPressLeft={() => navigation.openDrawer()}
        onPressRight={() => { }}
        renderLeft={() => {
          return <Feather name="menu" size={20} color={colors.primary} />;
        }}
      />
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder={ t('where_to_go?')}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log({ data });
            if (data.description) {
              // getLocation()
              navigate( data.description )
              // navigation.navigate("ReserveTaxi", { currentPosition: address, destination: data.description });
            }
            // 
          }}
          
          // currentLocation={true}
          query={{
            key: apiKey,
            language: 'en',
          }}
          textInputProps={{placeholderTextColor:colors.text}}
          styles={{
            textInput: {
              ...BaseStyle.textInput,
            
              borderRadius: 0,
              backgroundColor: colors.card,
              width: "100%",
              color: colors.text
            }, row: { backgroundColor: colors.background },
            container: { width: "100%", zIndex: 1 },

            description: { color: colors.text },
            // loader: { backgroundColor: "red" }
          }}
        />
        <MapView
         ref={mapRef}
        
        
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={currentPosition}
          showsBuildings
          scrollEnabled
          showsCompass
          showsMyLocationButton
          showsIndoorLevelPicker
          showsPointsOfInterest
          showsScale
          showsTraffic
          showsUserLocation
          showsIndoors
          scrollDuringRotateOrZoomEnabled
          mapPadding={{bottom: 0, right: 20, top:ninetyPercentHeight, left: 20}}
        
          
        >

        </MapView>
        {/* <View style={{ width: '70%', marginVertical: 16 }}>
              <Button
                full
              
                style={{ marginTop: 20 }}
                onPress={getLocation}
              >
                Get Current Location
              </Button>
            </View>  */}
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: "red"
  },
  contentActionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    // flex:1,
    zIndex: 0,
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    width: "95%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: 'center',
  },
});
export default Index;
