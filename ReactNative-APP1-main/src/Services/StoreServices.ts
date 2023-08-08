import firestore from "@react-native-firebase/firestore";
import { StoreModel } from "../Model/StoreModel";
const storesCollection = firestore().collection('stores')



export const getStores = async( city: string, locality: string, homeDelivery: boolean, Category: string, subCategory: string) =>{
    // const {Category, subCategory, city, homeDelivery, locality} = props
    var storeData: StoreModel[] = [];

    console.log(city, locality, homeDelivery, Category, subCategory, "props")
    if(!Category && !subCategory && !homeDelivery && (locality == "All")){
        console.log("1")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .orderBy("exclusive", "desc")
    }
    else if(Category && !subCategory && !homeDelivery && (locality == "All"))
    {
        console.log("2")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("categoryName", "==" ,Category)
                                            .orderBy("exclusive", "desc")
    }
    else if (Category && subCategory && !homeDelivery && (locality == "All"))
    {
        console.log("3")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("categoryName", "==" ,Category)
                                            .where("subCategoryName", "==", subCategory)
                                            .orderBy("exclusive", "desc")
    }
    else if (Category && subCategory && homeDelivery && (locality == "All"))
    {
        console.log("4")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("categoryName", "==" ,Category)
                                            .where("subCategoryName", "==", subCategory)
                                            .where("homeDelivery", "==", homeDelivery)
                                            .orderBy("exclusive", "desc")
    }
    else if (!Category && !subCategory  && homeDelivery && (locality == "All"))
    {
        console.log("5")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("homeDelivery", "==", homeDelivery)
                                            .orderBy("exclusive", "desc")
    }
    else if (Category && !subCategory  && homeDelivery && (locality == "All"))
    {
        console.log("6")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("categoryName", "==" ,Category)
                                            .where("homeDelivery", "==", homeDelivery)
                                            .orderBy("exclusive", "desc")
    }
    else if(!Category && !subCategory && !homeDelivery && locality){
        console.log("7")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("locality" , "==" , locality)
                                            .orderBy("exclusive", "desc")
    }
    else if(Category && !subCategory && !homeDelivery && locality)
    {
        console.log("8")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("locality" , "==" , locality)
                                            .where("categoryName", "==" ,Category)
                                            .orderBy("exclusive", "desc")
    }
    else if (Category && subCategory && homeDelivery && locality)
    {
        console.log("9")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("locality" , "==" , locality)
                                            .where("categoryName", "==" ,Category)
                                            .where("subCategoryName", "==", subCategory)
                                            .where("homeDelivery", "==", homeDelivery)
                                            .orderBy("exclusive", "desc")
    }
    else if (!Category && !subCategory  && homeDelivery && locality)
    {
        console.log("10")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("locality" , "==" , locality)
                                            .where("homeDelivery", "==", homeDelivery)
                                            .orderBy("exclusive", "desc")
    }
    else if (Category && !subCategory  && homeDelivery && locality)
    {
        console.log("11")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("locality" , "==" , locality)
                                            .where("categoryName", "==" ,Category)
                                            .where("homeDelivery", "==", homeDelivery)
                                            .orderBy("exclusive", "desc")
    }
    else
    {
        console.log("12")
        var stores = storesCollection.where("isCoinVendor" , "==" , "yes")
                                            .where("city", "==" , city)
                                            .where("locality" , "==" , locality)
                                            .where("categoryName", "==" ,Category)
                                            .where("subCategoryName", "==", subCategory)
                                            .orderBy("exclusive", "desc")
    }
    
    await stores.get().then((val)=>{
        val.forEach((doc) => {
            var data = doc.data() as StoreModel
            
            storeData.push(data)
        })
    }) 
   
    return storeData;

}

export const getSingleStores = async(storeId: string | undefined) => {
    var storeData = (await storesCollection.doc(storeId).get()).data() as StoreModel
    return storeData

}


export const getFavouriteVendors = async(favList : string[]) => {

    const favStores : StoreModel[] = []
    await storesCollection.where(firestore.FieldPath.documentId(), "in", favList).get().then((favVendor) =>{
        favVendor.forEach((val) => {
            var values = val.data() as StoreModel
            favStores.push(values)
        })
    })

    // for(const favId of favList){
    //     await storesCollection.doc(favId).get().then((val) => {
    //         var values = val.data() as StoreModel
    //         favStores.push(values);
    //     })
    // }

    return favStores;
    
}

