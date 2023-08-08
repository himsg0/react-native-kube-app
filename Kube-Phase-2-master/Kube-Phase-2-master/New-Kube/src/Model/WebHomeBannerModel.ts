
export class IWebBannerArray  {
  image: string = "";
  title: string = "";
  clickCount : number = 0;
  createdAt: Date = new Date();
}

export default class WebHomeBannerModel {
    webBannerArray: IWebBannerArray[];
  
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