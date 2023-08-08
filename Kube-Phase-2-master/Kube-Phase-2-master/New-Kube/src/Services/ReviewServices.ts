


import { ReviewModel, StoreModel } from "../Model/SellerModel";
// import {useState} from 'react';
import {firestore} from "../Firebase";
import React from "react";
const ReviewCollection = firestore().collection('sellers');

export const addReviews = async( props: { id: string | undefined; username: any; rating: number; comment: any; image:string | undefined; } ) => {
 let reviews = <ReviewModel>{
    id: props.id,
    url: props.image ? props?.image : '', 
    userName: props.username,
    rating: props.rating ? props.rating : 0,
    comment: props.comment,
    createdAt: new Date()
 }

 var stores = ReviewCollection.doc(props.id)

   // stores.set({
   //    'store.reviews':  firestore.FieldValue.arrayUnion(reviews)
   // },{merge:true}).then(()=>{
   //    updateRatingsAndReviews(props.id)
   // })

   return stores.update({
      'store.reviews': firestore.FieldValue.arrayUnion(reviews)
    }).then((res) => {
      return updateRatingsAndReviews(props.id)
    });
 
}

export const updateRatingsAndReviews = async( storeId: string | undefined ) => {
   
   var stores = ReviewCollection.doc(storeId)
   
   var totalReviewRatings : number = 0
   var avgStoreRating: number | undefined 
 

   var getReviews = (await stores.get()).data()?.store as StoreModel
 
   var numberOfReviews = getReviews?.reviews?.length

   getReviews.reviews?.forEach((res) => {
      totalReviewRatings = totalReviewRatings + res.rating
   })

   avgStoreRating = numberOfReviews && totalReviewRatings / numberOfReviews

   return stores.update({
      "store.ratings" : avgStoreRating,
      "store.numOfReviews" : numberOfReviews,
   })
  
}

