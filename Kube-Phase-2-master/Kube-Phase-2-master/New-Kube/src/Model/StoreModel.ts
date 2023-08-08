export class StoreModel {
  uniqueId: string = '';
  storeName: string = '';
  description: string = '';
  package?: string = '';
  season?: string = '';
  seasonBanner?: string = '';
  seasonTitle?: string = '';
  slot?: string = '';
  packagePriority?: number = -1;
  phoneNo: number = -1;
  userId: string = '';
  categoryId: string = '';
  altPhone?: number = -1;
  email?: string = '';
  city: string = '';
  locality: string = '';
  address: string = '';
  ratings: number = 0;
  numOfReviews: number = 0;
  reviews?: Review[];
  discount : number = 0;
}

export class Review {
  storeId: string = '';
  email?: string = '';
  url?: string = '';
  userName: string = '';
  rating: number = 0;
  comment: string = '';
  createdAt?: Date = new Date();
}
