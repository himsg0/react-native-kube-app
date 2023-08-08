import React, {useEffect} from 'react';
import {
  View,
  // Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Text from '../../components/MyText';
import {ScrollView} from 'react-native-gesture-handler';
import {format} from 'date-fns';
import {WebView} from 'react-native-webview';
// import RenderHtml from 'react-native-rende
import {getRelatedBlog} from '../../redux/actions/BlogAction';
import {useDispatch, useSelector} from 'react-redux';
import Share, {Social} from 'react-native-share';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import { getCategoryWiseBlogs } from '../../Services/BlogServices';

const BlogPage = ({navigation, route}) => {
  const id = route.params.blogId;
  const Blogs = route.params.blogs;
  // console.log(id, 'LLLL');
  const dispatch = useDispatch();

  const [webViewHeight, setWebViewHeight] = React.useState(null);
  const [relatedBlogData, setRelatedBlogData] = React.useState([])

  const onMessage = event => {
    setWebViewHeight(Number(event.nativeEvent.data) * 0.55);
  };

  const clickedBlog = Blogs;

  const Cate = clickedBlog.category;
  // console.log(Cate);

  useEffect(() => {
    getCategoryWiseBlogs(Cate).then((res) =>{
      setRelatedBlogData(res)
    })
  }, [Cate]);


  const link = `https://kubecity.in/LatestBlogs/${clickedBlog.slugtitle}`;

  const customShare = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'CheckOut This Blog',
      url: link,
    };

    Share.open(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const timestamp = clickedBlog.createdAt
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

  //  console.log(format(clickedBlog.createdAt, 'dd/mm/yyyy'));
  console.log(month, '000');

  const descript = clickedBlog.desc;

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#dfdfdf',
          padding: 15,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{width: 20, height: 20}}
            onPress={() => navigation.goBack()}>
            <Image source={Images.backArrow} />
          </TouchableOpacity>
          <Text style={{color: '#26235C', fontSize: 20, fontWeight: 'bold'}}>
            Latest Blogs
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '80%', paddingTop: 17, paddingBottom: 9}}>
              <Text
                style={{
                  marginLeft: '5%',
                  color: '#25255C',
                  fontSize: 25,
                  fontWeight: '900',
                }}>
                {clickedBlog.title}
              </Text>
            </View>
            <TouchableOpacity
              style={{marginTop: 20, marginLeft: '7%'}}
              onPress={customShare}>
              <Image
                style={{width: 30, height: 30}}
                source={require('./ShareLarge.png')}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginLeft: '5%',
              color: '#25255C',
              fontWeight: '600',
              fontSize: 15,
              paddingVertical: 7,
            }}>
            {clickedBlog.author}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 10,
            marginLeft: '5%',
          }}>
          <View>
            <Image
              style={{width: 20, height: 20}}
              source={require('./Planner.png')}
            />
          </View>
          <Text
            style={{
              marginLeft: 13,
              color: '#25255C',
              fontWeight: '300',
              fontSize: 12,
            }}>
            {month + ' ' + date + ', ' + year}
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image
            style={{
              width: '90%',
              height: 200,
              borderRadius: 7,
              marginBottom: 10,
              resizeMode: 'stretch',
            }}
            source={{uri: clickedBlog.thumbnailImage}}
          />
        </View>
        <WebView
          originWhitelist={['*']}
          bounces={true}
          scrollEnabled={false}
          onMessage={onMessage}
          injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight);"
          source={{
            html:
              `<html><head><meta name="viewport" content="width=device-width, initial-scale=0.55"></head><body>` +
              clickedBlog.desc +
              `</body></html>`,
            // clickedBlog.desc
          }}
          style={{marginVertical: 0, height: webViewHeight}}
        />
        <View>
          <View></View>

          <View>
            <FlatList
              data={relatedBlogData}
              horizontal
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      margin: 10,
                      height: 140,
                      width: 120,
                      backgroundColor: '#dfdfdf',
                      borderRadius: 9,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: item.thumbnailImage}}
                      style={{
                        height: 80,
                        width: 110,
                        marginTop: -19,
                        borderRadius: 9,
                        resizeMode: 'contain',
                      }}
                    />
                    <View style={{width: 110, alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#25255C',
                        }}>
                        {' '}
                        {item.title?.length >= 30
                          ? item.title.substring(0, 40) + '...'
                          : item.title}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BlogPage;
