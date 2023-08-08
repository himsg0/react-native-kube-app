import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LogBox,
} from 'react-native';
import Text from '../../components/MyText';
import {useDispatch, useSelector} from 'react-redux';
import {Image as Images, width} from '../../assets/ImageVariables';
import BlogModal from './BlogFilterModal';
import DateModal from './DateFilter';
import {getAllBlogs, getCategoryWiseBlogs} from '../../Services/BlogServices';
import {getBlogCategory} from '../../Services/BlogServices';

const BlogList = ({navigation}) => {
  const [allBlogCategories, setAllBlogCategories] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [blogCategory, setBlogCategory] = useState('');
  const [dateFilterData, setDateFilterData] = useState('');


  useEffect(() => {
    // getBlogs();
    getBlogCategory();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  useEffect(() => {
    if(!blogCategory){
      getAllBlogs(dateFilterData).then((res) => {
        setBlogData(res)
      })
    }
    else{
      getCategoryWiseBlogs(blogCategory, dateFilterData).then((res) => {
        setBlogData(res)
      })
    }
  }, [blogCategory, dateFilterData]);

  useEffect(() => {
    getBlogCategory().then((res) => {
      setAllBlogCategories(res);
    })
  },[])



  const Blogs = ({item}) => {
    const timestamp = item.createdAt
    const d = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    const LBlogDate = month + ' ' + date + ', ' + year;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BlogPage', {
            blogId: item._id,
            blogs: item,
          });
        }}>
        <View style={styles.blogcontainer}>
          <Image style={styles.blogImg} source={{uri: item.thumbnailImage}} />
          <View style={styles.blogDetails}>
            <Text style={styles.blogHeader}>
              {item.title?.length >= 50
                ? item.title.substring(0, 60) + '...'
                : item.title}
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image
                style={{width: 12, height: 12}}
                source={require('./Planner.png')}
              />
              <Text style={{fontSize: 7, color: 'white'}}>{LBlogDate}</Text>
            </View>
            <View style={{width: '70%', bottom: 0}}>
              {item.title?.length < 50 ? (
                <Text style={{fontSize: 11, color: '#F1F1F1'}}></Text>
              ) : null}
              <Text style={{fontSize: 9.5, color: '#F1F1F1'}}></Text>
              <Text style={{fontSize: 4, color: '#F1F1F1'}}></Text>
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: '700',
                  color: '#F1F1F1',
                }}>
                Read More
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: '#F1F1F1',
            padding: 15,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{width: 20, height: 20}}
            onPress={() => navigation.goBack()}>
            <Image source={Images.backArrow} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#26235C',
              fontSize: 20,
              fontWeight: '900',
              marginLeft: 10,
            }}>
            Latest Blogs
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <View
              style={{
                justifyContent: 'center',
                marginLeft: '5%',
                borderRadius: 7,
                backgroundColor: '#3F3F3F',
                padding: 10,
                marginTop: 20,
              }}>
              <BlogModal
                category={blogCategory}
                setCategory={setBlogCategory}
                data={allBlogCategories}
              />
            </View>
          </View>

          <View style={{width: '50%'}}>
            <View
              style={{
                marginLeft: '60%',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <DateModal setDateFilterData={setDateFilterData} />
            </View>
          </View>
        </View>
        <View style={{zIndex: 2}}>
          <FlatList
            keyExtractor={item => {
              item.id;
            }}
            data={blogData}
            renderItem={Blogs}
          />
        </View>
        <Image
          source={require('../Advertise/ad.png')}
          style={{width: width, height: 450, zIndex: 1, marginTop: -10}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#F1F1F1',
    margin: 15,
    width: '90%',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
  },
  plannerContainer: {
    backgroundColor: '#F1F1F1',
    marginTop: 15,
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '55%',
  },
  blogcontainer: {
    backgroundColor: '#3F3F3F',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  blogImg: {
    width: 120,
    height: 80,
    margin: 12,
  },
  blogDetails: {
    marginVertical: 8,
    width: width / 2.5,
  },
  blogHeader: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F1F1F1',
    overflow: 'hidden',
  },
});

export default BlogList;
