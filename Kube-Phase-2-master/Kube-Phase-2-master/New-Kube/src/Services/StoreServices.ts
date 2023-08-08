


import {firestore} from "../Firebase";
import { SellerModel,StoreModel } from "../Model/SellerModel";

const sellersCollection = firestore().collection('sellers')
const storesCollection = firestore().collection('stores')



export const getSellers = async( city: string, locality: string, homeDelivery: boolean , onlineShop : boolean, Category: string, subCategory: string) => {
    var sellerData: SellerModel[] = [];

    console.log(city, locality, homeDelivery, Category, subCategory,onlineShop, "props")
if(!Category && !subCategory && !homeDelivery && !onlineShop && (locality == "All Locality") ){
    console.log("1")
    var sellers = sellersCollection.where("store.city", "==" , city)
}
else if(Category && !subCategory && !homeDelivery && !onlineShop && (locality == "All Locality") )
{
    console.log("2")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
}
else if (Category && subCategory && !homeDelivery && !onlineShop && (locality == "All Locality") )
{
    console.log("3")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
}
else if (Category && subCategory && homeDelivery && !onlineShop && (locality == "All Locality") )
{
    console.log("4")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
                                        .where("store.homeDelivery", "==", homeDelivery)
}
else if (!Category && !subCategory  && homeDelivery && !onlineShop && (locality == "All Locality") )
{
    console.log("5")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.homeDelivery", "==", homeDelivery)
}
else if (Category && !subCategory  && homeDelivery && !onlineShop && (locality == "All Locality") )
{
    console.log("6")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.homeDelivery", "==", homeDelivery)
}
else if(!Category && !subCategory && !homeDelivery && onlineShop  && (locality == "All Locality") ){
    console.log("7")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if(Category && !subCategory && !homeDelivery && onlineShop && (locality == "All Locality") )
{
    console.log("8")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if (Category && subCategory && !homeDelivery && onlineShop && (locality == "All Locality") )
{
    console.log("9")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if (Category && subCategory && homeDelivery && onlineShop && (locality == "All Locality") )
{
    console.log("10")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
                                        .where("store.homeDelivery", "==", homeDelivery)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if (!Category && !subCategory  && homeDelivery && onlineShop && (locality == "All Locality") )
{
    console.log("11")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.homeDelivery", "==", homeDelivery)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if (Category && !subCategory  && homeDelivery && onlineShop && (locality == "All Locality") )
{
    console.log("12")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.homeDelivery", "==", homeDelivery)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if(!Category && !subCategory && !homeDelivery && !onlineShop && locality ){
    console.log("13")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
}
else if(Category && !subCategory && !homeDelivery && !onlineShop && locality )
{
    console.log("14")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
}
else if (Category && subCategory && homeDelivery && !onlineShop && locality )
{
    console.log("15")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
                                        .where("store.homeDelivery", "==", homeDelivery)
}
else if (!Category && !subCategory  && homeDelivery && !onlineShop && locality )
{
    console.log("16")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.homeDelivery", "==", homeDelivery)
}
else if (Category && !subCategory  && homeDelivery && !onlineShop && locality )
{
    console.log("17")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.homeDelivery", "==", homeDelivery)
}
else if (Category && subCategory  && !homeDelivery && !onlineShop && locality )
{
    console.log("18")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
}
else if(!Category && !subCategory && !homeDelivery && onlineShop && locality ){
    console.log("19")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if(Category && !subCategory && !homeDelivery && onlineShop && locality )
{
    console.log("20")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if (Category && subCategory && homeDelivery && onlineShop && locality )
{
    console.log("21")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
                                        .where("store.homeDelivery", "==", homeDelivery)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if (!Category && !subCategory  && homeDelivery && onlineShop && locality )
{
    console.log("22")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.homeDelivery", "==", homeDelivery)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else if (Category && !subCategory  && homeDelivery && onlineShop && locality )
{
    console.log("23")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.homeDelivery", "==", homeDelivery)
                                        .where("store.onlineShop", "==" , onlineShop)
}
else 
{
    console.log("24")
    var sellers = sellersCollection.where("store.city", "==" , city)
                                        .where("store.locality" , "==" , locality)
                                        .where("store.categoryName", "==" ,Category)
                                        .where("store.subCategoryName", "==", subCategory)
                                        .where("store.onlineShop", "==" , onlineShop)
}
    
    await sellers.get().then((val)=>{
        val.forEach((doc) => {
            var data = doc.data() as SellerModel
            sellerData.push(data)
        })
    }) 
   
    return sellerData;
}








export const getSingleStores = async(storeId: string | undefined) => {
    var storeData = await sellersCollection.doc(storeId).get()
    var singleStore = storeData.data() as SellerModel;
    return singleStore;

}


export const getFavouriteVendors = async(favList : string[]) => {

    const favStores : SellerModel[] = []
    await sellersCollection.where(firestore.FieldPath.documentId(), "in", favList).get().then((favVendor) =>{
        favVendor.forEach((val) => {
            var values = val.data() as SellerModel
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

// export const searchStores = async (SearchText, city, locality) => {
//     try {
//     if(locality == 'All Locality'){
    
//         var searchSnapshot = sellersCollection.where("store.city", "==", city)
//                                                 .where('store.storeName', '>=', SearchText)
//                                                 .where('store.storeName', '<=', SearchText + '\uf8ff')
//     }
//     else{
//         var searchSnapshot = sellersCollection
//         .where('store.city', '==', city)
//         .where('store.locality', '==', locality)
//         .where('store.storeName', '>=', SearchText)
//         .where('store.storeName', '<=', SearchText + '\uf8ff')
//     }
    
//       const querySnapshot = await searchSnapshot.get();
//       const collectionData = [];
//       querySnapshot.forEach(documentSnapshot => {
//         collectionData.push(documentSnapshot.data());

//       });
//       console.log("collection Data", collectionData)
//       return collectionData;
//     } catch (error) {
//       console.log('Error getting collection data: ', error);
//       return [];
//     }
//   };

  export const getOffersSingleStores = async(storeId: string | undefined) => {
    var storeData = await storesCollection.doc(storeId).get()
    var offersingleStore = storeData.data();
    return offersingleStore;

}

  export const getOffers = async (category, subCategory,city, locality) => {
    var offersData: any[] = [];

    console.log(city, locality, category, subCategory, "props")

    if(!category && !subCategory && (locality == "All Locality")){
        console.log("1")
        var offers = storesCollection.where("city", "==", city)
    }
    else if(category && !subCategory && (locality == "All Locality")){
        console.log("2")
        var offers = storesCollection.where("city", "==", city)
                                        .where("categoryName", "==", category )
    }
    else if(category && subCategory && (locality == "All Locality")){
        console.log("3")
        var offers = storesCollection.where("city", "==", city)
                                        .where("categoryName", "==", category )
                                        .where("subCategoryName", "==", subCategory)
    }
    else if(!category && !subCategory && locality){
        console.log("4")
        var offers = storesCollection.where("city", "==", city)
                                        .where("locality", "==", locality)
    }
    else if(category && !subCategory && locality){
        console.log("5")
        var offers = storesCollection.where("city", "==", city)
                                        .where("locality", "==", locality)
                                        .where("categoryName", "==", category )
    }
    else{
        console.log("6")
        var offers = storesCollection.where("city", "==", city)
                                        .where("locality", "==", locality)
                                        .where("categoryName", "==", category )
                                        .where("subCategoryName", "==", subCategory)
    }

    await offers.get().then((val)=>{
        val.forEach((doc) => {
            var data = doc?.data()
            // data.uniqueId = doc?.id
            data?.offer &&
            offersData.push(data)
        })
    }) 
   
    return offersData;
  }

export const getDiscountWiseOffers = async(city, locality) => {
    const data = []
    if((locality == "All Locality")){
        var discountOffers = storesCollection.where("city", "==", city)
                                                .where('offer', '!=', null)
    }
    else{
        var discountOffers = storesCollection.where("city", "==", city)
                                                .where("locality", "==", locality)
                                                .where('offer', '!=', null)
    }
    await discountOffers.get().then((res)=>{
        
        res.forEach((val) => {
            data.push(val.data())
        })
    })
    // console.log(data, "KK")
    
    return data;
}

