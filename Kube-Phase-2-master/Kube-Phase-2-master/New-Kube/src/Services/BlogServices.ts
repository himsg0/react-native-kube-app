import {firestore} from "../Firebase";
const blogsCollection = firestore().collection('blogposts');

export const getAllBlogs = async (dateFilterData : string) => {
    
    var blogsData : any[] = []

    if(dateFilterData == 'Oldest'){
        var blogs = blogsCollection.orderBy("createdAt", "asc")
    }
    else{
        var blogs = blogsCollection.orderBy("createdAt", "desc")
    }

    await blogs.get().then((data) => {
        data.forEach((val) => {
            blogsData.push(val.data())
        })
    })

    return blogsData;

}

export const getCategoryWiseBlogs = async (blogCategory : string, dateFilterData : string) => {
    
    var blogsData : any[] = []

    console.log(dateFilterData)

    if(dateFilterData == 'Oldest'){
        var blogs = blogsCollection.where("category" , "==" , blogCategory).orderBy("createdAt", "asc")
    }
    else{
        var blogs = blogsCollection.where("category" , "==" , blogCategory).orderBy("createdAt", "desc")
    }

    await blogs.get().then((data) => {
        data.forEach((val) => {
            blogsData.push(val.data())
        })
    })

    return blogsData;
}


export const getBlogCategory = async () => {
    let bCat:string[] = [] ;
    await blogsCollection.get().then((snap)=>{
        snap.forEach((doc)=>{
            bCat.push(doc.data().category);
           
        })
    })
    let blogCategory = [...new Set(bCat)];
    return blogCategory;
}

export const getSingleBlog = async (title : string) => {
    
    var singleBlogsData : any[] = []

    await blogsCollection.where("slugtitle", "==", title).get().then((data) => {
        
        data.forEach((val) => {
            console.log(val, ";;")
            singleBlogsData.push(val.data())
        })
    })

    return singleBlogsData;

}