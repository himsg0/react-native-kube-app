import {firestore} from "../Firebase";
import { BecomeAPartnerModel } from '../Model/becomeAPartnerModel';
const partnerCollection = firestore().collection('Partner');

export const addPartner = async(props:BecomeAPartnerModel) => {
    const newData = props;
    await partnerCollection.add(props)      
    // var Data = await partnerCollection.get()
    // var Test = Data.docs[0].data() as ContactUsModel
    // console.log("Data",Data.docs[0])
    return true;
    
}
