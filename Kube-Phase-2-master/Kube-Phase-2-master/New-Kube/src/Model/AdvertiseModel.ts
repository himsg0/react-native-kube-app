export class AdvertiseModel {
    firstName: string = "";
    phoneNo: number = 0;
    email?: string = "";
    cityName?: string = "";
    createdAt: Date = new Date();
  
    // constructor(
    //   firstName: string,
    //   contactNo: number,
    //   createdAt?: Date,
    //   email?: string,
    //   cityName?: string
    // ) {
    //   this.firstName = firstName;
    //   this.contactNo = contactNo;
    //   this.email = email;
    //   this.cityName = cityName;
    //   this.createdAt = createdAt || new Date();
    // }
}