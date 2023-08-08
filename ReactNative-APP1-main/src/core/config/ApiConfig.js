import {BaseUrl, ApiName} from './ApiNames';

export const ApiConfig = {
  getBaseUrl: () => BaseUrl.url,
  getUrl1: () => BaseUrl.url1,

  Categories: {
    getCategories: () => `${BaseUrl.url}/${ApiName.getCategories}`,
  },
  ContactUs: {
    postContact: () => `${BaseUrl.url1}/${ApiName.postContact}`,
  },
  StoreList: {
    getStoreList: () => `${BaseUrl.url}/${ApiName.getStoreList}`,
  },
};
