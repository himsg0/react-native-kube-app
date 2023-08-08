import firestore from "@react-native-firebase/firestore";
import AppHomeBannerModel from "../Model/AppHomeBannerModel";

const homeBannersCollection = firestore().collection('apphomebanner')

export const getHomeBanners = async() => {

    const appBanners = (await homeBannersCollection.get()).docs[0].data() as AppHomeBannerModel
    return appBanners;
}