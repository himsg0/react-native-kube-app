class IUserPackage {
    packageTitle: number = 0;
    packageAmount: number = 0;
    packageCoins: number = 0;
    createdAt?: Date = new Date();
  }
  
  class KubecoinModel {
    coinTitle: string;
    coinUrl: string;
    userPackages: IUserPackage[];
  }

  export default KubecoinModel;