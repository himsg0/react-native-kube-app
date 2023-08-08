import firestore from "@react-native-firebase/firestore";
import UserModel from "../Model/UserModel";

const userCollection = firestore().collection('users')


export const getUsers = async(phoneNumber : string) => {
    var User : UserModel[] = []
    await userCollection.where("phoneNo" , "==" , phoneNumber).get().then((user) => {
        user.forEach((val) => {
            var userData = val.data() as UserModel
            
            User.push(userData)
        })
    })
    // console.log("test", User)
    return User;
}

export const addUsers = async(props) => {
    const userModel = new UserModel();
    userModel.userName = props.userName;
    userModel.phoneNo = props.phoneNo;
    userModel.kubeCoin = 1000;
  
    // Create a new document reference with a unique ID
    const newDocRef = await userCollection.add(userModel);
  
    // Set the uniqueId field to the ID of the newly created document
    await newDocRef.update({ uniqueId: newDocRef.id });
  
    return true;
  }

export const editUser = async(props) => {

    const { userName, phoneNo, email, userId } = props;
    const updatedUser = <UserModel>{
        userName : userName,
        email : email ? email : "",
        phoneNo: phoneNo,
        updatedAt : new Date(),
    };

    var userEdit = userCollection.doc(userId)

    await userEdit.update({
        userName: updatedUser.userName,
        email: updatedUser.email,
        updatedAt : updatedUser.updatedAt
    })
    
}

export const likeVendor = async(vendorId : string , userId : string) => {

    var likeUser = userCollection.doc(userId)
    
    await likeUser.update({
        favouriteStores: firestore.FieldValue.arrayUnion(vendorId)
    });
    
} 

export const unLikeVendor = async(vendorId : string , userId : string) => {

    var unlikeUser = userCollection.doc(userId)

    await unlikeUser.update({
        favouriteStores: firestore.FieldValue.arrayRemove(vendorId)
    })
    
} 


export const creditUser = async(creditUserId : string | undefined, debitUserId : string | undefined, addCoins : number) => {
    
          
    const findCreditUser =  userCollection.doc(creditUserId)
    const findDebitUser =  userCollection.doc(debitUserId)

    const creditUserExist = (await findCreditUser.get()).exists
    const debitUserExist = (await findDebitUser.get()).exists


    if(creditUserExist && debitUserExist){
        findCreditUser.update({
            kubeCoin : firestore.FieldValue.increment(addCoins)
        })
    }

}

export const debitUser = async(creditUserId : string | undefined, debitUserId : string | undefined, addCoins : number) => {
    
          
    const findCreditUser = userCollection.doc(creditUserId)
    const findDebitUser = userCollection.doc(debitUserId)

    const creditUserExist = (await findCreditUser.get()).exists
    const debitUserExist = (await findDebitUser.get()).exists


    if(creditUserExist && debitUserExist){
        findDebitUser.update({
            kubeCoin : firestore.FieldValue.increment(-addCoins)
        })
    }

}