import { Review, StoreModel } from "../Model/StoreModel";
// import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const ReviewCollection = firestore().collection('stores');

export const addReviews = async( props: { id: string | undefined; username: any; rating: number; comment: any; } ) => {
 let reviews = <Review>{
    storeId: props.id,
    url: '', 
    userName: props.username,
    rating: props.rating ? props.rating : 0,
    comment: props.comment,
    createdAt: new Date()
 }

 var stores = ReviewCollection.doc(props.id)

   stores.set({
      'reviews':  firestore.FieldValue.arrayUnion(reviews)
   },{merge:true}).then(()=>{
      updateRatingsAndReviews(props.id)
   })
 
}

export const updateRatingsAndReviews = async( storeId: string | undefined ) => {
   
   var stores = ReviewCollection.doc(storeId)
   
   var totalReviewRatings : number = 0
   var avgStoreRating: number | undefined 
 

   var getReviews = (await stores.get()).data() as StoreModel
 
   var numberOfReviews = getReviews.reviews?.length

   getReviews.reviews?.forEach((res) => {
      totalReviewRatings = totalReviewRatings + res.rating
   })

   avgStoreRating = numberOfReviews && totalReviewRatings / numberOfReviews

   stores.update({
      ratings : avgStoreRating,
      numOfReviews : numberOfReviews,
   }).then(() =>{
      console.log("update done");
      
   })
  
  
  
  }

