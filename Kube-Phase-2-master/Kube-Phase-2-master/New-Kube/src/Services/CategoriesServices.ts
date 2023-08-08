import {firestore} from "../Firebase";
import CategoryModel, { ISubCategory } from "../Model/CategoriesModel";
import {useDispatch, useSelector} from 'react-redux';

const categoryCollection = firestore().collection('category')


export const getCategories = async() => {
    var Categories : CategoryModel[] = []
    await categoryCollection.get().then((cats) => {
    cats.forEach((val) => {
        var values = val.data()
        if ('categoryName' in values && 'appUrl' in values && 'subCategories' in values) {
            var category = values as CategoryModel;
            Categories.push(category);
        }
    })
   })

   return Categories;
}


export const getSubCategories = async(category: string) => {
    var subCategories : ISubCategory[] = []
    await categoryCollection.where("categoryName" , "==" , category).get().then((subCat) => {
    subCat.forEach((val) => {
            var values = val.data()
            var subCategory = values as ISubCategory;
            subCategories.push(subCategory);
    })
   })

   return subCategories;
}