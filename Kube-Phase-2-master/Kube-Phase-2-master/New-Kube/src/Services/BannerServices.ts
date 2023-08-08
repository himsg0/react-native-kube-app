import {firestore} from "../Firebase";
import WebHomeBannerModel from "../Model/WebHomeBannerModel";

const homeBannersCollection = firestore().collection('webHomeBanner')

export const getHomeBanners = async() => {

    const webBanners = (await homeBannersCollection.get()).docs[0].data() as WebHomeBannerModel
    return webBanners;
}

export const updateCounter = async(image) => {
    const counter = await homeBannersCollection.where("webBannerArray", "!=", null).get()
    counter.forEach((res) => {
        const dataArray = res.data().webBannerArray

        const updatedArray = dataArray.map((obj) => {
            if (obj.clickCount !== undefined && obj.image === image) {
                return {
                    ...obj,
                    clickCount: obj.clickCount + 1
                  };
            } else {
              return obj;
            }
        });

         res.ref.update({ webBannerArray: updatedArray });
    })
    return true
}