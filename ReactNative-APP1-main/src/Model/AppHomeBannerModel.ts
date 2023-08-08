
export class IAppBannerArray  {
  image: string = "";
  title: string = "";
  createdAt: Date = new Date();
}

export default class AppHomeBannerModel {
    appBannerArray: IAppBannerArray[];
  
    // constructor(appBannerArray: Array<{
    //   image: string;
    //   title: string;
    //   createdAt: Date;
    // }>) {
    //   this.appBannerArray = appBannerArray.map((appBanner) => ({
    //     image: appBanner.image,
    //     title: appBanner.title,
    //     createdAt: appBanner.createdAt
    //   }));
    // }
  }