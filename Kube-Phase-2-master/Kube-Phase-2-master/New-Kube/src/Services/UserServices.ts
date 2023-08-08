import {firestore, storage} from "../Firebase";
import UserModel from "../Model/UserModel";

const userCollection = firestore().collection('users')


export const getUsers = async(phoneNumber : number) => {
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
    var userModel = <UserModel>{
        uniqueId: "" ,
        userName: props.userName,
        email: props.email ? props.email : "",
        cloudinaryId:"",
        kubeCoin: 1000,
        phoneNo: props.phoneNo,
        isVendor: false,
        createdAt: new Date(),
        deleted: false,
        updatedAt: new Date(),
        image: "",
        favouriteStores: [],
    }
    
    var newDocRef = await userCollection.add(userModel)

    await newDocRef.update({ uniqueId: newDocRef.id });
    
    return true;
}

export const editUser = async(props) => {

    const { userName, phoneNo, email, userId } = props;
    const updatedUser = <UserModel>{
        userName : userName,
        email : email ? email : "",
        updatedAt : new Date(),
    };

    var userEdit = userCollection.doc(userId)

    await userEdit.update({
        userName: updatedUser.userName,
        email: updatedUser.email,
        updatedAt: updatedUser.updatedAt
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


export const uploadProfileImage = async(imageData, userId) => {
    const fileName = imageData.name;
    const reference = storage().ref(`userImage/${fileName}`);
    const pathToFile = URL.createObjectURL(imageData);

    try{
        const response = await fetch(pathToFile);
        const blob = await response.blob();
        await reference.put(blob);
        console.log('Image Uploaded Successfully');
        
    }
    catch(err){
        console.log("Error While Uploading Image:",err);
        
    }
    const url = await reference.getDownloadURL();
    console.log(url,"url");

    var userImageUpdate = userCollection.doc(userId)
    await userImageUpdate.update({
        image : url
    })

    return "Updated";

}
