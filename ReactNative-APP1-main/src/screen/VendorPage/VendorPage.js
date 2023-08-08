import React, {useEffect, useState} from 'react';
import {
  View,
  // Text,
  Image,
  ScrollView,
  // TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import {Image as ConstImg} from './../../assets/ImageVariables';
import CustomHeader from '../../components/CustomHeader';
import YoutubePlayer from 'react-native-youtube-iframe';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Share from 'react-native-share';
import axios from 'axios';
import {useDispatch, useSelector, connect} from 'react-redux';
import {height, Image as Images, width} from '../../assets/ImageVariables';

import {addReviews} from '../../Services/ReviewServices';
import {getUsers, likeVendor, unLikeVendor} from '../../Services/UserServices';
import {getHomeBanners} from '../../Services/BannerServices';
import {getSingleStores} from '../../Services/StoreServices';

function VendorPage(props) {
  const {storeData, likeStatus, redirected} = props.route.params;
  const [text, setText] = useState('');
  const [playing, setPlaying] = useState(false);
  const [review, setReview] = useState(storeData?.reviews);
  const [state, setstate] = useState(false);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [defaultRating, setDefaultRating] = useState(storeData?.ratings);
  const [like, setLike] = useState(likeStatus);
  const [result, setResult] = useState();
  const [openA, setOpenA] = useState(false);
  const [coinBack, setCoinBack] = useState(20);
  const [catUrl, setCatUrl] = useState('');
  const [userData, setUserData] = useState({});
  const [reviewPosted, setReviewPosted] = useState(false)

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setUserData(res[0]);
    });
  }, [props.authUser, like]);


  React.useEffect(() => {
    getHomeBanners().then(res => {
      setResult(res?.appBannerArray[0]?.image);
    });
  }, [result]);

  React.useEffect(() => {
    getSingleStores(storeData?.uniqueId).then((res) => {
      setReview(res?.reviews)
      setReviewPosted(false)
    })
  },[reviewPosted])


  const reviews =
    review &&
    review
      .slice()
      .sort(
        (a, b) =>
          new Date(
            b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000,
          ) -
          new Date(
            a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000,
          ),
      );

  const customShare = async () => {
    const shareOptions = {
      message: 'Checkout new store!',
      url: `http://kubecity.in/VendorDetails/${storeData?.uniqueId}`,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const likeButtonHandler = () => {
    setLike(true);
    likeVendor(storeData?.uniqueId,userData?.uniqueId).then((res) => {
    })
  };
  const unLikeButtonHandler = () => {
    setLike(false);
    unLikeVendor(storeData?.uniqueId,userData?.uniqueId).then((res) => {
      
    })
  };

  useEffect(() => {
    let val;
    props?.categories.map((item, key) => {
      if (item.categoryName == storeData?.categoryName) {
        val = item.appUrl;
      }
    });
    setCatUrl(val);
  });

  const Reviewdata = {
    id: storeData?.uniqueId,
    comment: text,
    rating: defaultRating,
    profileurl: '',
    username: userData?.userName,
    phone: userData?.phoneNo,
  };

  const listReviewItemView = ({item, index}) => {
    const timestamp = item.createdAt;
    const d = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
    );
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
    const LReviewsDate = month + ' ' + date + ', ' + year;
    // console.log('hdhd', item);
    const rating = item?.rating;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{flex: 0.21}}>
            <Image
              style={{width: 40, height: 40, borderRadius: 40}}
              resizeMode="cover"
              source={ConstImg.ProfilePic1}
            />
          </View>
          <View style={{flex: 0.9}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 13,
              }}>
              {item?.userName}
            </Text>
          </View>
          <Text style={{color: 'white', fontSize: 10, marginTop: 2}}>
            {LReviewsDate}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            left: 50,
            bottom: 20,
            marginVertical: 8,
          }}>
          {maxRating.map((val, key) => {
            return (
              <Image
                style={{width: 13, height: 12}}
                source={
                  val <= rating
                    ? require('./starFilled.png')
                    : require('./starEmpty.png')
                }
              />
            );
          })}
        </View>
        <Text style={{left: 50, color: 'white', bottom: 20}}>
          {item.comment}
        </Text>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'gray',
            paddingTop: 5,
          }}></View>
      </View>
    );
  };

  const listItemView = ({item}) => {
    return (
      <View style={{marginTop: 5}}>
        <Image
          style={{width: 160, height: 160, borderRadius: 10}}
          resizeMode="contain"
          source={{uri: item?.url}}
        />
      </View>
    );
  };


  const RedirectToMap = () => {
    if (storeData?.location == undefined && storeData?.location?.length != 0) {
      Alert.alert('', 'No data available', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      Linking.openURL(
        `geo:${storeData?.location[0] && storeData?.location[0]?.latitude},${
          storeData?.location[0] && storeData?.location[0]?.longitude
        }`,
      );
    }
  };

  const RedirectToPhone = () => {
    Linking.openURL(`tel:${storeData?.phoneNo}`);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{backgroundColor: 'black'}}>
        <View
          style={{
            backgroundColor: '#E7E7E7',
            padding: 4,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
            zIndex: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => props.navigation.goBack()}>
              <Image source={Images.backArrow} />
            </TouchableOpacity>

            {/* Coin section */}
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={Images.coin}
                style={{
                  height: 28,
                  width: 28,
                }}
              />

              <Text style={{color: '#26235C'}}>
                {userData?.kubeCoin == undefined ? 0 : userData?.kubeCoin} Coins
              </Text>
            </View>
          </View>
        </View>
        <CustomHeader
          style={{zIndex: 1, marginTop: -10}}
          label={'Vendor Page'}
        />
        <View
          style={{
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={customShare}
            style={{
              width: 25,
              height: 25,
              backgroundColor: '#F1F1F1',
              borderRadius: 20,
              position: 'absolute',
              zIndex: 1,
              right: 30,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15,
            }}>
            <Image
              style={{width: 16, height: 16}}
              resizeMode="cover"
              source={ConstImg.ShareIcon}
            />
          </TouchableOpacity>
          {like ? (
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                borderRadius: 20,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                right: 0,
                margin: 15,
              }}
              onPress={() => {
                like == false ? likeButtonHandler() : unLikeButtonHandler();
              }}>
              <Image
                style={{width: 17, height: 17}}
                source={ConstImg.LikeIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'white',
                borderRadius: 20,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
                right: 0,
                margin: 15,
              }}
              onPress={likeButtonHandler}>
              <Image
                style={{width: 17, height: 15}}
                source={ConstImg.UnlikeIcon}
              />
            </TouchableOpacity>
          )}
          <View style={{width: '100%', alignItems: 'center'}}>
            <Image
              style={{
                width: 351,
                height: 162,
                borderRadius: 10,
                zIndex: 0,
              }}
              resizeMode="contain"
              source={{uri: storeData?.images[0]?.url}}
            />
          </View>
          <View
            style={{
              marginBottom: -65,
              width: 334,
              height: '100%',
              backgroundColor: '#3f3f3f',
              borderRadius: 7,
              position: 'absolute',
              zIndex: 0,
              alignSelf: 'center',
              padding: 5,
              bottom: 0,
              padding: 3,
              margin: 15,
              padding: 10,
              // flex : 0,
              height: 'auto',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
                {storeData?.storeName}
              </Text>
              <View
                style={{
                  width: 40,
                  height: 20,
                  backgroundColor: '#26C940',
                  borderRadius: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 10, height: 10}}
                  source={ConstImg.StarRatingIcon}
                  resizeMode="cover"
                />
                <Text style={{color: '#fff', fontSize: 13}}>
                  {storeData?.ratings && storeData?.ratings.toFixed(2)}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 5}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 14,
                }}>
                Add.
              </Text>
              <View style={{paddingEnd: 17}}>
                <Text style={{color: 'white', paddingStart: 7}}>
                  {storeData?.address}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{paddingTop: 5, fontWeight: 'bold', color: 'white'}}>
                Save {storeData?.discount}% on your total bill
              </Text>
              <View
                style={{
                  width: 55,
                  height: 20,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  borderRadius: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginTop: 4,
                }}>
                <Image
                  style={{width: 12, height: 12}}
                  source={ConstImg.CallIcon}
                  resizeMode="cover"
                />
                <TouchableOpacity onPress={RedirectToPhone}>
                  <Text style={{color: '#25255c', fontSize: 10}}>Call now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Paying', {
              vendorImg: storeData?.images[0].url,
              shopName: storeData?.storeName,
              desc: storeData?.address,
              offer: storeData?.discount,
              phone: storeData?.phoneNo,
              cBack: coinBack,
              storeUserId: storeData?.userId,
            })
          }
          activeOpacity={0.8}
          style={{
            width: 350,
            height: 90,
            backgroundColor: '#FDBC12',
            alignSelf: 'center',
            marginTop: 80,
            borderRadius: 10,
            marginBottom: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
              alignItems: 'center',
            }}>
            <Image
              style={{width: 40, height: 40}}
              source={ConstImg.billIcon}
            />
            <View style={{marginLeft: -10}}>
              <Text style={{color: '#26235C', fontSize: 22, fontWeight: 'bold'}}>
                Pay Bill
              </Text>
              <Text style={{color: '#26235C', fontSize: 15, fontWeight: 'bold'}}>
                Save {storeData?.discount}% on your total bill
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{color: '#26235C', fontSize: 15, fontWeight: 'bold'}}>
                SAVE
              </Text>
              <Text
                style={{color: '#26235C', fontSize: 24, fontWeight: 'bold'}}>
                {storeData?.discount}%
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: 350,
            backgroundColor: '#3f3f3f',
            alignSelf: 'center',
            margin: 20,
            borderRadius: 10,
            padding: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: '#fff',
            }}>
            About
          </Text>
          {openA == false ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{paddingTop: 10, color: '#fff', marginBottom: 7}}>
                {storeData.description && storeData?.description.slice(0, 35)}
                ...
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenA(true);
                }}>
                <Text
                  style={{
                    paddingTop: 10,
                    color: '#fff',
                    marginBottom: 7,
                    marginLeft: 8,
                    textDecorationLine: 'underline',
                  }}>
                  Read More
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{display: 'flex'}}>
              <Text style={{paddingTop: 10, color: '#fff', marginBottom: 7}}>
                {storeData?.description}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenA(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    marginBottom: 15,
                    textDecorationLine: 'underline',
                  }}>
                  Read Less
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {storeData?.media && storeData?.media[0]?.youtube !== undefined ? (
            <YoutubePlayer
              height={200}
              play={playing}
              webViewStyle={{opacity: 0.99}}
              resumePlayAndroid={false}
              videoId={storeData?.media && storeData?.media[0]?.youtube}
            />
          ) : null}
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 16,
            }}>
            Rate This
          </Text>
          <View
            style={{
              paddingVertical: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  style={{padding: 5}}
                  activeOpacity={0.7}
                  key={item}
                  onPress={() => setDefaultRating(item)}>
                  <Image
                    style={{width: 22, height: 21}}
                    source={
                      item <= defaultRating
                        ? require('./starFilled.png')
                        : require('./starEmpty.png')
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 16,
            }}>
            Write Your Review
          </Text>

          <View
            style={{
              height: 200,
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              data={reviews}
              renderItem={listReviewItemView}
            />
          </View>

          <View style={{bottom: 0}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 16,
                marginTop: 20,
              }}>
              Leave A Comment
            </Text>
            <TextInput
              style={{
                width: 330,
                height: 150,
                borderWidth: 2,
                borderRadius: 7,
                borderColor: 'white',
                color: 'white',
                marginTop: 10,
                textAlignVertical: 'top',
              }}
              value={text}
              onChangeText={newText => setText(newText)}
              multiline={true}
            />
            <TouchableOpacity
              onPress={() => {
                addReviews(Reviewdata).then((res) => {
                  setReviewPosted(true)
                });
                setText('');
              }}>
              <View
                style={{
                  width: 100,
                  height: 30,
                  backgroundColor: 'white',
                  marginTop: 10,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    color: '#26235C',
                    textAlign: 'center',
                    padding: 4,
                    fontWeight: '700',
                  }}>
                  Post
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: 350,
            height: 'auto',
            backgroundColor: '#3f3f3f',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <View style={{padding: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}>
              Location & Contact
            </Text>
          </View>
          {storeData?.location && storeData?.location?.length > 0 && storeData?.location[0]?.latitude?.length != 0 
            && storeData?.location[0]?.longitude?.length != 0 ? (
            <>
            {storeData?.location &&
                storeData?.location?.map((item,index) => (
                  
                  <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                      latitude: parseFloat(item?.latitude),
                      longitude: parseFloat(item?.longitude),
                      latitudeDelta: 0.00348,
                      longitudeDelta: 0.00315,
                    }}>
                    <Marker
                      coordinate={{
                        latitude: parseFloat(item?.latitude),
                        longitude: parseFloat(item?.longitude),
                      }}
                    />
                  </MapView>
                ))}
            </>
          ) : (
            <>
              <View style={{alignSelf: 'center', paddingVertical: 70}}>
                <Text style={{color: 'white'}}>No data available</Text>
              </View>
            </>
          )}
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            <View style={{flex: 0.2}}>
              <Image
                style={{width: 18, height: 16, marginTop: 5}}
                source={require('../StoreList/Sadd.png')}
              />
            </View>
            <View style={{flex: 2}}>
              <Text style={{color: 'white'}}>{storeData?.address}</Text>
            </View>
            <TouchableOpacity onPress={RedirectToMap}>
              <Image
                style={{width: 14, height: 20}}
                resizeMode="cover"
                source={require('../StoreList/location.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{flex: 0.1}}>
              <Image
                style={{width: 18, height: 18}}
                source={require('../StoreList/call.png')}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: 'white'}}>{storeData?.phoneNo}</Text>
            </View>
            <TouchableOpacity onPress={RedirectToPhone}>
              <Text style={{color: 'white'}}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: 'black'}}>
        <>
          {storeData?.products != undefined &&
          storeData?.products?.length != 0 ? (
            <View
              style={{
                width: 350,
                backgroundColor: '#3f3f3f',
                margin: 20,
                borderRadius: 10,
                padding: 10,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'white',
                }}>
                Product
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  paddingVertical: 4,
                }}
                data={storeData?.products}
                numColumns={2}
                renderItem={listItemView}
                ListEmptyComponent={
                  storeData?.products && storeData?.products?.length <= 0
                    ? null
                    : null
                }
              />
            </View>
          ) : null}
        </>

        <View
          style={{
            width: 350,
            height: 160,
            backgroundColor: 'white',
            marginTop: 20,
            marginBottom: 20,
            alignSelf: 'center',
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#3f3f3f',
            zIndex: 2,
          }}>
          <View style={{paddingVertical: 9}}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
              THIS{'\n'}STORE{'\n'}IS IN{'\n'}
              {storeData?.categoryName?.toUpperCase()}
              {'\n'}CATEGORIES
            </Text>
          </View>
          <View
            style={{
              width: 80,
              height: 140,
              backgroundColor: '#3f3f3f',
              borderRadius: 5,
              padding: 5,
            }}>
            <Image
              style={{width: 70, height: 110, borderRadius: 5}}
              source={{uri: catUrl}}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingTop: 5,
              }}>
              {storeData?.categoryName?.toUpperCase()}
            </Text>
          </View>
        </View>
        <Image
          source={require('../BecomeAPartner/ad.png')}
          style={{width: width, height: 450, marginTop: -200, zIndex: 1}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 170,
  },
});

export default connect(({GetCategoryR, AuthUserR, SetCityR}) => ({
  categories: GetCategoryR.category,
  authUser: AuthUserR.user,
  getCity: SetCityR.data,
}))(VendorPage);
