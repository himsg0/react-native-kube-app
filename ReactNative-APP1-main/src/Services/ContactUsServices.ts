import { ContactUsModel } from "../Model/contactUsModel";
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('contacts');

export const setContact = async(props:ContactUsModel) => {
    usersCollection.add(props)
    
}
