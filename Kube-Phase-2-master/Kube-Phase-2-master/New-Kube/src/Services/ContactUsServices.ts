import { ContactUsModel } from "../Model/contactUsModel";
import {firestore} from "../Firebase";
import { useEffect } from "react";
const usersCollection = firestore().collection('contacts');

export const setContact = async(props:ContactUsModel) => {
    usersCollection.add(props)
    
}
