import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ScrollView} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
  where,
} from '@react-native-firebase/firestore';
import {useTheme, BaseStyle, BaseColor} from '../../config';
import {useTranslation} from 'react-i18next';

import Ionicons from 'react-native-vector-icons/Ionicons';
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
// Your Firebase configuration

let priceList2 = [
  {
    from: 'St. Anton Center',
    persons: '1-8 Persons',
    rates: [
      {where: 'Zentrum St. Anton', day: '€15,00', night: '€18,00'},
      {where: 'Gastig / Mooserkreuz / Dengert', day: '€17,00', night: '€20,00'},
      {
        where: 'Stadle / Schülerhof / Arlbergstrasse / Skilehrerhaus',
        day: '€16,00',
        night: '€18,00',
      },
      {
        where: 'Mooserwirt / KK / Taps / Kaminstube',
        day: '€20,00',
        night: '€23,00',
      },
      {
        where: 'Nasserein 1 ab Reselhof / Nassereinerhof',
        day: '€18,00',
        night: '€21,00',
      },
      {
        where: 'Nasserein 2 Pfarrwieg und ab Kapelle',
        day: '€19,00',
        night: '€24,00',
      },
      {
        where: 'St. Jakob 1 Rafalt / Bach / Timmler / Brunnen',
        day: '€18,00',
        night: '€22,00',
      },
      {
        where: 'St. Jakob 2 ab Kirche / Gsör / Sägewerk / M-Preis',
        day: '€20,00',
        night: '€23,00',
      },
      {
        where: 'St. Jakob 3 Gand / Untergand / Obergand',
        day: '€22,00',
        night: '€25,00',
      },
      {where: 'Arlbergtunnel - Mautstelle', day: '€26,00', night: '€31,00'},
      {where: 'Bludenz', day: '€101,00', night: '€135,00'},
      {where: 'Dalaas', day: '€82,00', night: '€110,00'},
      {where: 'Ferwall', day: '€32,00', night: '€37,00'},
      {where: 'Flirsch', day: '€42,00', night: '€52,00'},
      {where: 'Flirsch Berg', day: '€52,00', night: '€62,00'},
      {where: 'Galtür', day: '€142,00', night: '€157,00'},
      {where: 'Hangar', day: '€27,00', night: '€32,00'},
      {where: 'Ischgl', day: '€125,00', night: '€145,00'},
      {where: 'Kappl', day: '€102,00', night: '€125,00'},
      {where: 'Klösterle', day: '€80,00', night: '€95,00'},
      {where: 'Landeck', day: '€75,00', night: '€88,00'},
      {where: 'Langen am Arlberg', day: '€75,00', night: '€85,00'},
      {where: 'Lech am Arlberg', day: '€78,00', night: '€88,00'},
      {where: 'Lech - Zug - Oberlech', day: '€85,00', night: '€110,00'},
      {where: 'Pettneu', day: '€31,00', night: '€36,00'},
      {where: 'Pettneu - Reit', day: '€36,00', night: '€41,00'},
      {where: 'Pians', day: '€62,00', night: '€72,00'},
      {where: 'Alpe Rauz Valfagehrbahn', day: '€42,00', night: '€55,00'},
      {where: 'Schnann', day: '€39,00', night: '€46,00'},
      {where: 'See', day: '€77,00', night: '€92,00'},
      {where: 'St. Christoph', day: '€33,00', night: '€40,00'},
      {where: 'Strengen', day: '€52,00', night: '€66,00'},
      {where: 'Strengen Berg', day: '€63,00', night: '€74,00'},
      {where: 'Stuben am Arlberg', day: '€64,00', night: '€78,00'},
      {where: 'Ulmerhütte Materialseilbahn', day: '€35,00', night: '€40,00'},
      {where: 'Wald am Arlberg', day: '€84,00', night: '€104,00'},
      {where: 'Zams Hospital', day: '€82,00', night: '€93,00'},
      {where: 'Zürs am Arlberg', day: '€64,00', night: '€78,00'},
      {where: 'Stanz', day: '€76,00', night: '€97,00'},
      {where: 'Längenfeld', day: '€190,00', night: '€235,00'},
    ],
  },
  {
    from: 'Mooserwirt and Krazy Kanguruh',
    persons: '1-8 Persons',
    rates: [
      {
        where: 'Nasserein 1 ab Schranke Parkplatz',
        day: '€23,00',
        night: '€28,00',
      },
      {
        where: 'Nasserein 2 Pfarrwieg und ab Kapelle',
        day: '€24,00',
        night: '€29,00',
      },
      {
        where: 'St. Jakob 1 Rafalt / Bach / Timmler / Brunnen',
        day: '€24,00',
        night: '€29,00',
      },
      {
        where: 'St. Jakob 2 ab Kirche / Gsör / Sägewerk / M-Preis',
        day: '€26,00',
        night: '€31,00',
      },
      {
        where: 'St. Jakob 3 Gand / Untergand / Obergand',
        day: '€29,00',
        night: '€36,00',
      },
      {where: 'Pettneu am Arlberg', day: '€39,00', night: '€47,00'},
      {where: 'Schnann', day: '€41,00', night: '€52,00'},
      {where: 'Flirsch', day: '€52,00', night: '€62,00'},
      {where: 'Flirsch Berg', day: '€67,00', night: '€77,00'},
      {where: 'Strengen', day: '€62,00', night: '€72,00'},
      {where: 'Strengen Berg', day: '€77,00', night: '€87,00'},
    ],
  },
  {
    from: 'St. Christoph am Arlberg',
    persons: '1-8 Persons',
    rates: [
      {where: 'Ferwall', day: '€42,00', night: '€52,00'},
      {where: 'Flirsch', day: '€57,00', night: '€67,00'},
      {where: 'Klösterle', day: '€70,00', night: '€78,00'},
      {where: 'Langen am Arlberg', day: '€62,00', night: '€73,00'},
      {where: 'Lech am Arlberg', day: '€67,00', night: '€77,00'},
      {where: 'Lech - Zug - Oberlech', day: '€78,00', night: '€95,00'},
      {where: 'Pettneu am Arlberg', day: '€42,00', night: '€50,00'},
      {where: 'Alpe Rauz Valfagehrbahn', day: '€31,00', night: '€37,00'},
      {where: 'Schnann', day: '€52,00', night: '€62,00'},
      {where: 'St. Anton bis Nassereinerhof', day: '€38,00', night: '€45,00'},
      {where: 'Stuben am Arlberg', day: '€52,00', night: '€62,00'},
      {where: 'Ulmerhütte Materialseilbahn', day: '€25,00', night: '€37,00'},
      {where: 'Zürs am Arlberg', day: '€85,00', night: '€110,00'},
    ],
  },
  {
    from: 'Transfers Austria',
    persons: '1-3 Persons',
    rates: [
      {
        where: 'Bregenz',
        price: '€240,00',
      },
      {
        where: 'Feldkirch',
        price: '€180,00',
      },
      {
        where: 'Innsbruck Airport',
        price: '€220,00',
      },
      {
        where: 'Innsbruck City/Bahnhof',
        price: '€250,00',
      },
      {
        where: 'Imst',
        price: '€110,00',
      },
      {
        where: 'Ötztal Bahnhof',
        price: '€147,00',
      },
      {
        where: 'Salzburg',
        price: '€600,00',
      },
      {
        where: 'Schruns',
        price: '€147,00',
      },
      {
        where: 'Sölden',
        price: '€260,00',
      },
      {
        where: 'Obergurgl',
        price: '€290,00',
      },
      {
        where: 'Dornbirn',
        price: '€210,00',
      },
    ],
  },

  {
    from: 'Transfers Austria',
    persons: '4-8 Persons',
    rates: [
      {
        where: 'Bregenz',

        price: '€260,00',
      },
      {
        where: 'Feldkirch',

        price: '€220,00',
      },
      {
        where: 'Innsbruck Airport',

        price: '€240,00',
      },
      {
        where: 'Innsbruck City/Bahnhof',

        price: '€260,00',
      },
      {
        where: 'Imst',

        price: '€140,00',
      },
      {
        where: 'Ötztal Bahnhof',

        price: '€185,00',
      },
      {
        where: 'Salzburg',

        price: '€630,00',
      },
      {
        where: 'Schruns',

        price: '€185,00',
      },
      {
        where: 'Sölden',

        price: '€295,00',
      },
      {
        where: 'Obergurgl',

        price: '€320,00',
      },
      {
        where: 'Dornbirn',

        price: '€249,00',
      },
    ],
  },

  {
    from: 'Airport Transfer Winter Season 2024-2025',
    persons: '1-3 Persons',
    rates: [
      {
        where: 'Zürich Airport',
        price: '€460,00',
      },
      {
        where: 'Innsbruck',
        price: '€220,00',
      },
      {
        where: 'St.Gallen/Altenrhein',
        price: '€270,00',
      },
      {
        where: 'St. Moritz',
        price: '€460,00',
      },
      {
        where: 'Davos',
        price: '€470,00',
      },
      {
        where: 'Vaduz',
        price: '€240,00',
      },
      {
        where: 'Buchs',
        price: '€220,00',
      },
      {
        where: 'Sargans',
        price: '€230,00',
      },
      {
        where: 'Munich Airport',
        price: '€630,00',
      },
      {
        where: 'Munich City',
        price: '€600,00',
      },
      {
        where: 'Friedrichshafen Airport',
        price: '€350,00',
      },
      {
        where: 'Memmingen Airport',
        price: '€370,00',
      },
    ],
  },
  {
    from: 'Airport Transfer Winter Season 2024-2025',
    persons: '4-8 Persons',
    rates: [
      {
        where: 'Zürich Airport',

        price: '€480,00',
      },
      {
        where: 'Innsbruck',

        price: '€240,00',
      },
      {
        where: 'St.Gallen/Altenrhein',

        price: '€280,00',
      },
      {
        where: 'St. Moritz',

        price: '€490,00',
      },
      {
        where: 'Davos',

        price: '€490,00',
      },
      {
        where: 'Vaduz',

        price: '€250,00',
      },
      {
        where: 'Buchs',

        price: '€260,00',
      },
      {
        where: 'Sargans',

        price: '€270,00',
      },
      {
        where: 'Munich Airport',

        price: '€660,00',
      },
      {
        where: 'Munich City',

        price: '€620,00',
      },
      {
        where: 'Friedrichshafen Airport',

        price: '€360,00',
      },
      {
        where: 'Memmingen Airport',

        price: '€380,00',
      },
    ],
  },
  {
    from: 'Hut and Alpine Pasture Rides',
    persons: 'Summer',
    rates: [
      {
        where: 'Ebene',
        price: '€45,00',
      },
      {
        where: 'Ferwall Gasthaus',
        price: '€35,00',
      },
      {
        where: 'Gampen',
        price: '€70,00',
      },
      {
        where: 'Kartellboden/Stausee',
        price: '€105,00',
      },
      {
        where: 'Konstanzer Hütte',
        price: '€85,00',
      },
      {
        where: 'Putzenalm',
        price: '€75,00',
      },
      {
        where: 'Rendlalm',
        price: '€75,00',
      },
      {
        where: 'Rodelhütte',
        price: '€35,00',
      },
      {
        where: 'Rossfallalpe',
        price: '€85,00',
      },
      {
        where: 'Salzhütte',
        price: '€45,00',
      },
      {
        where: 'Ulmerhütte Materialseilbahn',
        price: '€35,00',
      },
      {
        where: 'Schön Ferwall AbzweigerS',
        price: '€85,00',
      },
      {
        where: 'Tritschalpe',
        price: '€85,00',
      },
      {
        where: 'Ganatschalpe',
        price: '€85,00',
      },
      {
        where: 'Lavenar',
        price: '€45,00',
      },
      {
        where: 'Malfonalm',
        price: '€85,00',
      },
      {
        where: 'Nessleralm',
        price: '€75,00',
      },
      {
        where: 'Warth',
        price: '€90,00',
      },
      {
        where: 'Steeg',
        price: '€115,00',
      },
      {
        where: 'Kaisers',
        price: '€130,00',
      },
      {
        where: 'Schröcken',
        price: '€125,00',
      },
      {
        where: 'Formarinsee',
        price: '€130,00',
      },
      {
        where: 'Verpeilalm Kaunertal',
        price: '€220,00',
      },
      {
        where: 'Oberstdorf Deutschland',
        price: '€330,00',
      },
    ],
  },
];

let priceslist = [
  {
    from_st_anton_center: {
      '1_8_person': {
        Zentrum_St_Anton: {day: 15.0, night: 18.0},
        Gastig_Mooserkreuz_Dengert: {day: 17.0, night: 20.0},
        Stadle_Schülerhof_Arlbergstrasse_Skilehrerhaus: {
          day: 16.0,
          night: 18.0,
        },
        Mooserwirt_KK_Taps_Kaminstube: {day: 20.0, night: 23.0},
        Nasserein_1_ab_Reselhof_Nassereinerhof: {day: 18.0, night: 21.0},
        Nasserein_2_Pfarrwieg_ab_Kapelle: {day: 19.0, night: 24.0},
        St_Jakob_1_Rafalt_Bach_Timmler_Brunnen: {day: 18.0, night: 22.0},
        St_Jakob_2_ab_Kirche_Gsör_Sägewerk_M_Preis: {day: 20.0, night: 23.0},
        St_Jakob_3_Gand_Untergand_Obergand: {day: 22.0, night: 25.0},
        Arlbergtunnel_Mautstelle: {day: 26.0, night: 31.0},
        Bludenz: {day: 101.0, night: 135.0},
        Dalaas: {day: 82.0, night: 110.0},
        Ferwall: {day: 32.0, night: 37.0},
        Flirsch: {day: 42.0, night: 52.0},
        Flirsch_Berg: {day: 52.0, night: 62.0},
        Galtür: {day: 142.0, night: 157.0},
        Hangar: {day: 27.0, night: 32.0},
        Ischgl: {day: 125.0, night: 145.0},
        Kappl: {day: 102.0, night: 125.0},
        Klösterle: {day: 80.0, night: 95.0},
        Landeck: {day: 75.0, night: 88.0},
        Langen_am_Arlberg: {day: 75.0, night: 85.0},
        Lech_am_Arlberg: {day: 78.0, night: 88.0},
        Lech_Zug_Oberlech: {day: 85.0, night: 110.0},
        Pettneu: {day: 31.0, night: 36.0},
        Pettneu_Reit: {day: 36.0, night: 41.0},
        Pians: {day: 62.0, night: 72.0},
        Alpe_Rauz_Valfagehrbahn: {day: 42.0, night: 55.0},
        Schnann: {day: 39.0, night: 46.0},
        See: {day: 77.0, night: 92.0},
        St_Christoph: {day: 33.0, night: 40.0},
        Strengen: {day: 52.0, night: 66.0},
        Strengen_Berg: {day: 63.0, night: 74.0},
        Stuben_am_Arlberg: {day: 64.0, night: 78.0},
        Ulmerhütte_Materialseilbahn: {day: 35.0, night: 40.0},
        Wald_am_Arlberg: {day: 84.0, night: 104.0},
        Zams_Hospital: {day: 82.0, night: 93.0},
        Zürs_am_Arlberg: {day: 64.0, night: 78.0},
        Stanz: {day: 76.0, night: 97.0},
        Längenfeld: {day: 190.0, night: 235.0},
      },
    },
  },
  {
    from_mooserwirt_and_krazy_kanguruh: {
      '1_8_person': {
        Nasserein_1_ab_Schranke_Parkplatz: {day: 23.0, night: 28.0},
        Nasserein_2_Pfarrwieg_ab_Kapelle: {day: 24.0, night: 29.0},
        St_Jakob_1_Rafalt_Bach_Timmler_Brunnen: {day: 24.0, night: 29.0},
        St_Jakob_2_ab_Kirche_Gsör_Sägewerk_M_Preis: {day: 26.0, night: 31.0},
        St_Jakob_3_Gand_Untergand_Obergand: {day: 29.0, night: 36.0},
        Pettneu_am_Arlberg: {day: 39.0, night: 47.0},
        Schnann: {day: 41.0, night: 52.0},
        Flirsch: {day: 52.0, night: 62.0},
        Flirsch_Berg: {day: 67.0, night: 77.0},
        Strengen: {day: 62.0, night: 72.0},
        Strengen_Berg: {day: 77.0, night: 87.0},
      },
    },
  },
  {
    from_st_cristoph_am_arlberg: {
      '1_8_person': {
        Ferwall: {day: 42.0, night: 52.0},
        Flirsch: {day: 57.0, night: 67.0},
        Klösterle: {day: 70.0, night: 78.0},
        Langen_am_Arlberg: {day: 62.0, night: 73.0},
        Lech_am_Arlberg: {day: 67.0, night: 77.0},
        Lech_Zug_Oberlech: {day: 78.0, night: 95.0},
        Pettneu_am_Arlberg: {day: 42.0, night: 50.0},
        Alpe_Rauz_Valfagehrbahn: {day: 31.0, night: 37.0},
        Schnann: {day: 52.0, night: 62.0},
        St_Anton_bis_Nassereinerhof: {day: 38.0, night: 45.0},
        Stuben_am_Arlberg: {day: 52.0, night: 62.0},
        Ulmerhütte_Materialseilbahn: {day: 25.0, night: 37.0},
        Zürs_am_Arlberg: {day: 54.0, night: 63.0},
      },
    },
  },
  {
    transfers_austria_1: {
      '1_3_person': {
        Bregenz: {price: 240.0},
        Feldkirch: {price: 180.0},
        Innsbruck_Airport: {price: 220.0},
        Innsbruck_City_Bahnhof: {price: 250.0},
        Imst: {price: 110.0},
        Ötztal_Bahnhof: {price: 147.0},
        Salzburg: {price: 600.0},
        Schruns: {price: 147.0},
        Sölden: {price: 260.0},
        Obergurgl: {price: 290.0},
        Dornbirn: {price: 210.0},
      },
    },
  },
  {
    transfers_austria_2: {
      '4_8_person': {
        Bregenz: {price: 350.0},
        Feldkirch: {price: 240.0},
        Innsbruck_Airport: {price: 290.0},
        Innsbruck_City_Bahnhof: {price: 320.0},
        Imst: {price: 170.0},
        Ötztal_Bahnhof: {price: 220.0},
        Salzburg: {price: 800.0},
        Schruns: {price: 220.0},
        Sölden: {price: 350.0},
        Obergurgl: {price: 380.0},
        Dornbirn: {price: 290.0},
      },
    },
  },
  {
    airport_transfer_winter_season_2024_2025_1: {
      '1_3_person': {
        Zürich_Airport: {price: 460.0},
        Innsbruck: {price: 220.0},
        St_Gallen_Altenrhein: {price: 270.0},
        St_Moritz: {price: 460.0},
        Davos: {price: 470.0},
        Vaduz: {price: 240.0},
        Buchs: {price: 220.0},
        Sargans: {price: 230.0},
        Munich_Airport: {price: 630.0},
        Munich_City: {price: 600.0},
        Friedrichshafen_Airport: {price: 350.0},
        Memmingen_Airport: {price: 370.0},
      },
    },
  },
  {
    airport_transfer_winter_season_2024_2025_2: {
      '4_8_person': {
        Zürich_Airport: {price: 480.0},
        Innsbruck: {price: 240.0},
        St_Gallen_Altenrhein: {price: 280.0},
        St_Moritz: {price: 490.0},
        Davos: {price: 490.0},
        Vaduz: {price: 250.0},
        Buchs: {price: 260.0},
        Sargans: {price: 270.0},
        Munich_Airport: {price: 660.0},
        Munich_City: {price: 620.0},
        Friedrichshafen_Airport: {price: 360.0},
        Memmingen_Airport: {price: 380.0},
      },
    },
  },
  {
    hut_and_alpine_pasture_rides: {
      summer: {
        Ebene: {price: 45.0},
        Ferwall_Gasthaus: {price: 35.0},
        Gampen: {price: 70.0},
        Kartellboden_Stausee: {price: 105.0},
        Konstanzer_Hütte: {price: 85.0},
        Putzenalm: {price: 75.0},
        Rendlalm: {price: 75.0},
        Rodelhütte: {price: 35.0},
        Rossfallalpe: {price: 85.0},
        Salzhütte: {price: 45.0},
        Ulmerhütte_Materialseilbahn: {price: 35.0},
        Schön_Ferwall_AbzweigerS: {price: 85.0},
        Tritschalpe: {price: 85.0},
        Ganatschalpe: {price: 85.0},
        Lavenar: {price: 45.0},
        Malfonalm: {price: 85.0},
        Nessleralm: {price: 75.0},
        Warth: {price: 90.0},
        Steeg: {price: 115.0},
        Kaisers: {price: 130.0},
        Schröcken: {price: 125.0},
        Formarinsee: {price: 130.0},
        Verpeilalm_Kaunertal: {price: 220.0},
        Oberstdorf_Deutschland: {price: 330.0},
      },
    },
  },
];

const TransferPrices = ({navigation}: any) => {
  const {colors} = useTheme();
  const [prices, setPrices] = useState<any>(null);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    // firestore().collection("priceList").doc("list").set({priceList:priceList2})
    const fetchData = async () => {
      try {
        const docSnap = await firestore()
          .collection('priceList')
          .doc('list')
          .get();

        if (docSnap.exists) {
          // let arr =docSnap.docs.map((x)=>x)
          let priceList2:any = docSnap.data();
          console.log({data:priceList2.priceList});
         
          setPrices(priceList2?.priceList);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const renderPriceItem = ({item, index}: any) => {
    return (
      <View
        style={{
          ...styles.itemContainer,
          backgroundColor: index % 2 === 0 ? colors.card : '#f0f0f0',
        }}>
        {/* <Text style={styles.location}>{item.location.toUpperCase()}:</Text>
        <Text style={styles.price}>
         {item.day&& "Day: €" + item.day}  {item.night&& "/ Night : €" + item.night} 
         {item.price&& "Price : €" + item.price} 
        </Text> */}

        <View
          style={{
            width: '100%',
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{width: '60%'}}>
            <Text caption1>{item.where}</Text>
          </View>

          <Text style={styles.subcategoryTitle}>
            {item.price && '' + item.price}
            {item.day && '' + item.day}
          </Text>
          <Text style={styles.subcategoryTitle}>
            {item.price && '' + item.price}
            {item.night && '' + item.night}
          </Text>
        </View>
      </View>
    );
  };
  function capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }
  const renderCategory = (categoryData: any, categoryName: any) => {
    console.log({categoryData});
    return Object.keys(categoryData).map(personKey => {
      const formattedData = Object.keys(categoryData[personKey]).map(key => {
        const item = categoryData[personKey][key];
        return {
          location: key.replace(/_/g, '  '),
          day: item.day,
          night: item.night,
          price: item.price,
        };
      });

      return (
        <View style={styles.subcategoryContainer} key={personKey}>
          <View
            style={{
              width: '100%',
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '60%'}}>
              <Text style={styles.subcategoryTitle}>Where</Text>
            </View>
            <Text style={styles.subcategoryTitle}>Day</Text>
            <Text style={styles.subcategoryTitle}>Night</Text>
          </View>
          <FlatList
            data={formattedData}
            renderItem={renderPriceItem}
            keyExtractor={item => item.location}
          />
        </View>
      );
    });
  };

  if (!prices) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={'Price List'}
        renderLeft={() => {
          return (
            <Ionicons name="arrow-back" size={20} color={colors.primary} />
            // <Icon
            //   name="angle-left"
            //   size={20}
            //   style={{colors:colors.primary}}
            //   // color={colors.primary}
            //   enableRTL={true}
            // />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <ScrollView>
          {prices.map((categoryName: any, i: number) => (
            <View style={styles.categoryContainer} key={i}>
              <View style={styles.categoryContainer}>
                <View
                  style={{
                    paddingHorizontal: 16,

                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text caption2 bold primaryColor>
                    {categoryName.from.toLocaleUpperCase()}
                  </Text>
                  <Text style={styles.subcategoryTitle}>
                    {categoryName.persons}
                  </Text>
                </View>
              </View>

              <View style={styles.subcategoryContainer}>
                <View
                  style={{
                    width: '100%',
                    padding: 16,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{width: '60%'}}>
                    <Text style={styles.subcategoryTitle}>Where</Text>
                  </View>
                  <Text style={styles.subcategoryTitle}>Day</Text>
                  <Text style={styles.subcategoryTitle}>Night</Text>
                </View>
                <FlatList
                  data={categoryName.rates}
                  renderItem={renderPriceItem}
                  keyExtractor={item => item.where}
                />
              </View>
              {/* <Text primaryColor  style={styles.categoryTitle}>
            {categoryName.replace(/_/g, ' ').toUpperCase()}
          </Text>
          {renderCategory(categoryName, categoryName)} */}

              {/* {Object.keys(categoryName).map(categoryNameInner => {
                return (
                  <View
                    style={styles.categoryContainer}
                    key={categoryNameInner}>
                    <View
                      style={{
                        width: '100%',
                        padding: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.categoryTitle}>
                        {categoryNameInner.replace(/_/g, ' ').toUpperCase()}
                      </Text>
                      {Object.keys(prices[categoryNameInner]).map(personKey => {
                        console.log({personKey});
                        return (
                          <Text style={styles.subcategoryTitle}>
                            {capitalize(personKey.replace(/_/g, '-'))}
                          </Text>
                        );
                      })}
                    </View>

                    <View
                      style={{
                        width: '100%',
                        height: 2,
                        backgroundColor: 'black',
                      }}
                    />
                    {renderCategory(
                      prices[categoryNameInner],
                      categoryNameInner,
                    )}
                  </View>
                );
              })} */}
            </View>
          ))}
          <View style={{width: '95%', alignSelf: 'center'}}>
            <Text style={styles.heading}>{t('title')}</Text>

            <View style={styles.section}>
              <Text style={styles.subHeading}>
                {t('baggageFee')}
              </Text>
              <Text style={styles.listItem}>
                • {t('baggageFeeDetails')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeading}>
                {t('waitingFee')}
              </Text>
              <Text style={styles.listItem}>
                • {t('waitingFeeDetailsDay')}
              </Text>
              <Text style={styles.listItem}>
                • {t('waitingFeeDetailsNight')}
              </Text>
              <Text style={styles.listItem}>
                • {t('waitingFeeDetailsLongDistance')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeading}>
                {t('tunnelFee')}
              </Text>
              <Text style={styles.listItem}>
                • {t('tunnelFeeDetails')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeading}>
                {t('nightRate')}
              </Text>
              <Text style={styles.listItem}>
                • {t('nightRateDetails')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeading}>
                {t('additionalInfo')}
              </Text>
              <Text style={styles.listItem}>
                • {t('additionalInfoDetails1')}
              </Text>
              <Text style={styles.listItem}>
                • {t('additionalInfoDetails2')}
              </Text>
              <Text style={styles.listItem}>
                • {t('additionalInfoDetails3')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeading}>
                {t('paymentOptions')}
              </Text>
              <Text style={styles.listItem}>
                • {t('paymentOptionsDetails')}
              </Text>
            </View>
          </View>

          {/* {Object.keys(prices).map((categoryName) => (
        <View  style={styles.categoryContainer} key={categoryName}>
          <Text primaryColor  style={styles.categoryTitle}>
            {categoryName.replace(/_/g, ' ').toUpperCase()}
          </Text>
          {renderCategory(prices[categoryName], categoryName)}
          
        </View>
      ))} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    // backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    // marginBottom: 10,
    // marginLeft:16
  },
  subcategoryContainer: {
    marginBottom: 15,
  },
  subcategoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    // marginBottom: 5,
  },
  itemContainer: {
    padding: 10,

    borderRadius: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  location: {
    fontSize: 16,
    // fontWeight: 'bold',
  },
  price: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  // container: {
  //   padding: 20,
  //   backgroundColor: '#fff',
  // },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    color: '#444',
    lineHeight: 24,
  },
});

export default TransferPrices;
