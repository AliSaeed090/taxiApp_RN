import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData,useMutation } from '@tanstack/react-query';
import firestore, { FirebaseFirestoreTypes, where } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Define types for your data
interface Ride {
  id: string;
  createdAt: FirebaseFirestoreTypes.Timestamp; // Correct type from @react-native-firebase/firestore
  [key: string]: any; // Include other fields that your ride documents contain
}

interface FetchMyRidesResponse {
  rides: Ride[];
  lastDoc: FirebaseFirestoreTypes.QueryDocumentSnapshot<Ride> | null;
}

// Function to fetch paginated data from Firestore
const fetchMyRides = async ({
  pageParam = null,
}: {
  pageParam?: FirebaseFirestoreTypes.QueryDocumentSnapshot<Ride> | null;
}): Promise<FetchMyRidesResponse> => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  let query = firestore()
    .collection('reservations')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .where('status', '==', 'Confirmed'); // Number of documents per page

  if (pageParam) {
    query = query.startAfter(pageParam);
  }

  try {
    const snapshot = await query.get();

    const lastDoc: any =
      snapshot.docs[snapshot.docs.length - 1] || null;

    const rides: Ride[] = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const rideData = doc.data() as Ride;

        if (rideData.user) {
          const userDoc = await rideData.user.get();
          const userData = userDoc.data();
          return {
            ...rideData,
            id: doc.id,
           
            user: userData,
          };
        }

        return {
          ...rideData,
          id: doc.id,
         
        };
      })
    );

    return { rides, lastDoc };
  } catch (e: any) {
    console.log({ e });
    throw new Error(e);
  }
};
interface UpdatePayload {
  docId: string;
  pickupLocation?: string;
  dropOfLocation?: string;
  dateTime?: Date;
  phoneNumber?: string;
  noOfPassanger?: string;
  noOfSuitcase?: string;
  noOfChildSeat?: string;
  noOfSkiis?: string;
  instructionsByPassanger?: string;
  isQuickTaxi?: boolean;
  status?: string;
  fare?: number | null;
  taxPercentage?: number | null;
  currency?: string;
  notesByAdmin?: string;
}
const updateReservation = async ({
  docId,
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
  status,
  fare,
  taxPercentage,
  currency,
  notesByAdmin,
}: UpdatePayload) => {
  const user = auth().currentUser;
  
  if (user) {
    const reservationDocRef = firestore().collection('reservations').doc(docId);

    const updatedData: Partial<UpdatePayload> = {};

    if (pickupLocation) updatedData.pickupLocation = pickupLocation;
    if (dropOfLocation) updatedData.dropOfLocation = dropOfLocation;
    if (dateTime) updatedData.dateTime = dateTime;
    if (phoneNumber) updatedData.phoneNumber = phoneNumber;
    if (noOfPassanger) updatedData.noOfPassanger = noOfPassanger;
    if (noOfSuitcase) updatedData.noOfSuitcase = noOfSuitcase;
    if (noOfChildSeat) updatedData.noOfChildSeat = noOfChildSeat;
    if (noOfSkiis) updatedData.noOfSkiis = noOfSkiis;
    if (instructionsByPassanger) updatedData.instructionsByPassanger = instructionsByPassanger;
    if (isQuickTaxi) updatedData.isQuickTaxi = isQuickTaxi;
    if (status) updatedData.status = status;
    if (fare !== undefined) updatedData.fare = fare;
    if (taxPercentage !== undefined) updatedData.taxPercentage = taxPercentage;
    if (currency) updatedData.currency = currency;
    if (notesByAdmin) updatedData.notesByAdmin = notesByAdmin;

    await reservationDocRef.update({
      ...updatedData,
      updatedAt: firestore.FieldValue.serverTimestamp(), // Optionally track the update timestamp
    });
  }
};
export const useUpdateReservation = () => {
  return useMutation({
    mutationFn: (data: UpdatePayload) => updateReservation(data),
  });
};

export const useMyRides = () => {
  return useInfiniteQuery<FetchMyRidesResponse, Error>({
    queryKey: ['fetchRidesHistory'],
    queryFn: fetchMyRides,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.lastDoc,
  })
}