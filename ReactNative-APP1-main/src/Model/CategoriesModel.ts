


export class ISubCategory {
    subCategoryName: string = "";
  }
  
  class CategoryModel {
    categoryName: string = "";
    subCategories: ISubCategory[];
    appUrl?: string = "";
    priority?: number= 0;
    createdAt?: Date = new Date();
  
    // constructor(
    //   categoryName: string,
    //   subCat: ISubCategory[],
    //   appUrl?: string,
    //   createdAt: Date = new Date(),
    // ) {
    //   this.categoryName = categoryName;
    //   this.subCat = subCat.map((subcat) => ({
    //     subcatName: subcat.subcatName,
    //   }));
    //   this.appUrl = appUrl;
    //   this.createdAt = createdAt;
    // }
  }
  
  export default CategoryModel;