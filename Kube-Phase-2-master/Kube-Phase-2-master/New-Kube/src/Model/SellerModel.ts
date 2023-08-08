



export class SellerModel {
    id : string = "";
    userName : string = "";
    phoneNo : string = "";
    email : string = "";
    profileImage : string = "";
    store: StoreModel = new StoreModel();
    deleted : boolean = false;
    createdAt : Date = new Date();
    updatedAt : Date = new Date();
}
  
export class StoreModel {
    categoryId : string = "";
    categoryName : string = "";
    storeName : string = "";
    address : string = "";
    locality : string = "";
    pincode : string = "";
    city : string = "";
    state : string = "";
    location: {latitude: number, longitude: number} = {latitude: 0, longitude: 0};
    description : string = "";
    discount : number = 0;
    exclusive : boolean = false;
    featured : boolean = false;
    homeDelivery : boolean = false;
    storeImages : string[] = [];
    brandIds : string[] = [];
    isCoinVendor : string = "";
    onlineShop = false;
    package : string = "";
    packagePriority : number = 0;
    phoneNo : string = "";
    seasonBanner : string = "";
    subCategoryName : string = "";
    tags : string[] = [];
    reviews : ReviewModel[] = [];
    openingHours : OpeningHrs = new OpeningHrs();
}

export class ReviewModel {
    comment : string = "";
    url : string = "";
    createdAt : Date = new Date();
    id : string = "";
    userName : string = "";
    rating : number = 0;
}
  
export class OpeningHrs {
    mon: HourMinute = new HourMinute();
    tue: HourMinute = new HourMinute();
    wed: HourMinute = new HourMinute();
    thu: HourMinute = new HourMinute();
    fri: HourMinute = new HourMinute();
    sat: HourMinute = new HourMinute();
    sun: HourMinute = new HourMinute();
}
  
class HourMinute {
    hours: number = 0;
    minutes: number = 0;
}

  