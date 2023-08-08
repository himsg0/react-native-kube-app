import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { AdvertiseModel } from "../Model/AdvertiseModel";

const advertiseCollection = firestore().collection('advertisewithus')

export const submitAdvertise = async(advertiseData: AdvertiseModel) => {
    await advertiseCollection.add(advertiseData).then((res) => {
        console.log("done");
        
    })
    // console.log("KKK", advertiseData)
}


// export const getAdvertiseData = async() => {
//     var advertise : any [] = []
//     await advertiseCollection.orderBy("Exclusive", "desc").orderBy("createdAt", "asc").get().then((res) => {
//        res.forEach((val) => {
//         advertise.push(val.data())
        
//        })
        
//     })
//     console.log("hola", advertise)
//     // console.log("KKK", advertiseData)
// }
