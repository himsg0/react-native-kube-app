
  
  class UserModel {
    uniqueId: string ;
    userName: string = "";
    email?: string = "";
    cloudinaryId?: string = "";
    kubeCoin?: number = 0;
    phoneNo: string = "";
    isVendor: boolean = false;
    createdAt?: Date = new Date();
    deleted?: boolean = false;
    updatedAt?: Date = new Date();
    image?: string = "";
    favouriteStores?: string[] = [];
  
    // constructor(
    //   userName: string,
    //   phoneNumber: number,
    //   isVendor: boolean = false,
    //   email?: string,
    //   cloudinary_id: string = "",
    //   kubeCoin?: number,
    //   createdAt: Date = new Date(),
    //   deleted: boolean = false,
    //   deletedAt?: Date,
    //   updatedAt?: Date,
    //   image?: string,
    //   favouriteStores: string[] = []
    // ) {
    //   this.userName = userName;
    //   this.email = email;
    //   this.cloudinary_id = cloudinary_id;
    //   this.kubeCoin = kubeCoin;
    //   this.phoneNumber = phoneNumber;
    //   this.isVendor = isVendor;
    //   this.createdAt = createdAt;
    //   this.deleted = deleted;
    //   this.deletedAt = deletedAt;
    //   this.updatedAt = updatedAt;
    //   this.image = image;
    //   this.favouriteStores = favouriteStores;
    // }
  }
  
  export default UserModel;
  