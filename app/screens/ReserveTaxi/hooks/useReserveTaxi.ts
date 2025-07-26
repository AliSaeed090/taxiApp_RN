// src/hooks/useSignup.ts
import { useMutation } from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
interface payload {
  pickupLocation: string;
  dropOfLocation: string;
  dateTime: Date;
  phoneNumber: string;
  noOfPassanger: string;
  noOfSuitcase: string;
  noOfChildSeat: string;
  noOfSkiis: string;
  instructionsByPassanger: string;
  isQuickTaxi: boolean
  payment:string
}



const saveReservation = async ({
  pickupLocation,
  dropOfLocation,
  dateTime,
  phoneNumber,
  noOfPassanger,
  noOfSuitcase,
  noOfChildSeat,
  noOfSkiis,
  instructionsByPassanger,
  isQuickTaxi,
  payment,
}: payload) => {
  const user = auth().currentUser;
  if (user) {
    const userDocRef = firestore().collection('users').doc(user.uid);
    await firestore().collection('reservations').add({
      pickupLocation,
      dropOfLocation,
      dateTime,
      phoneNumber,
      noOfPassanger,
      noOfSuitcase,
      noOfChildSeat,
      noOfSkiis,
      instructionsByPassanger,
      isQuickTaxi,
      status:"Pending",
      fare:null,
      taxPercentage:null,
      currency:"",
      notesByAdmin:"",
      createdAt: firestore.FieldValue.serverTimestamp(),
      user:userDocRef,
      userId:user.uid,
      payment:payment,

    });
  }
};

export const useReservation = () => {
  return useMutation({
    mutationFn: (data: payload) => saveReservation(data),
  });
};