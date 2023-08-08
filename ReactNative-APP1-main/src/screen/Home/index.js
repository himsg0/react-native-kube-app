import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  // Text,
  View,
  Linking,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector, connect} from 'react-redux';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import Text from '../../components/MyText';
import {Image as ConstImg} from './../../assets/ImageVariables';
import {AuthUserA} from '../../redux/Action/GetAuthA';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import InAppReview from 'react-native-in-app-review';
import {getUsers, likeVendor, unLikeVendor} from '../../Services/UserServices';
import {getStores} from '../../Services/StoreServices';
import {getCategories} from '../../Services/CategoriesServices';
import {GetCategoriesA} from '../../redux/Action/GetCategoriesA';
import {getAllBlogs} from '../../Services/BlogServices';
import {GetBlogsA} from '../../redux/Action/GetBlogsA';
import {getHomeBanners} from '../../Services/BannerServices';
import {getCollectionData} from '../Search.js';

const Home = props => {

  const scrollRef = useRef();

  const [isEarnCoinVisible, setIsEarnCoinVisible] = useState(true);
  const [cvalue, setCValue] = useState('');
  const [lvalue, setLValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [vendorArr, setVendorArr] = useState([]);
  const [blogArr, setBlogArr] = useState([]);
  const [results, setResults] = useState(null);
  const [likedStores, setLikedStores] = useState(
    props?.authUser?.user?.favouriteStores,
  );
  const [userData, setUserData] = useState({})

  const dispatch = useDispatch()


  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setUserData(res[0]);
    });
  },[userData])


  React.useEffect(() => {
    setLikedStores(userData?.favouriteStores)
  },[userData])

  React.useEffect(() => {
    getCategories().then(res => {
      if (res != null) {
        dispatch(GetCategoriesA(res));
      }
    });
    getAllBlogs().then(res => {
      if (res != null) {
        dispatch(GetBlogsA(res));
      }
    });
  }, []);

  React.useEffect(() => {
    setCategoriesArr(props?.categories?.slice(0, 6));
  }, [props.categories]);

  React.useEffect(() => {
    setBlogArr(props?.blogs);
  }, [props.blogs]);

  React.useEffect(() => {
    if (cvalue && lvalue) {
      getStores(cvalue, lvalue, false, '', '').then(res => {
        if (res.length != 0) setVendorArr(res.slice(0, 2));
      });
    }
  }, [cvalue, lvalue]);

  React.useEffect(() => {
    getHomeBanners().then(res => {
      setResults(res?.appBannerArray);
    });
  }, [results]);

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    setCValue(props?.getCity?.city);
    setLValue(props?.getCity?.Locality);
  }, [props.getCity]);

  const getCData = () => {
    AsyncStorage.getItem('Cdata').then(val => {
      setCValue(val);
    });
  };
  const getLData = () => {
    AsyncStorage.getItem('Ldata').then(val => {
      setLValue(val);
    });
  };
  useEffect(() => {
    getCData();
    getLData();
  }, []);

  const storeUserData = async value => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const likeButtonHandler = item => {
    likeVendor(item,userData?.uniqueId).then((res) => {
      setLikedStores(oldArray => [...oldArray, item]);
    });
  };
  const unLikeButtonHandler = item => {
    unLikeVendor(item,userData?.uniqueId).then((res) => {
      setLikedStores(prevState =>
        prevState.filter(prevItem => prevItem !== item),
      );
    });
  };

  const renderBanner = ({item, index}) => {
    return (
      <View>
        <Image
          source={{
            uri: item.image,
          }}
          style={{
            width: width,
            aspectRatio: 10 / 6.66,
          }}
        />
      </View>
    );
  };

  const renderCategories = ({item, index}) => {
    if (index < 5) {
      return (
        <View
          style={{
            backgroundColor: '#3F3F3F',
            padding: 8,
            alignItems: 'center',
            marginHorizontal: 5,
            marginVertical: 10,
            borderRadius: 10,
            width: width / 3.3,
            height: height / 3.7,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('StoreList', {
                category: item.categoryName,
              });
            }}>
            <Image
              source={{uri: item?.appUrl}}
              style={{
                height: height / 5,
                width: width / 4,
                marginBottom: 10,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: '#fff',
                fontWeight: '800',
              }}>
              {item?.categoryName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Categories');
          }}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#3F3F3F',
            padding: 8,
            alignItems: 'center',
            marginHorizontal: 5,
            marginVertical: 10,
            width: width / 3.3,
            borderRadius: 10,
            height: height / 3.7,
          }}>
          <Image
            source={Images.categories}
            style={{
              height: height / 5,
              width: width / 4,
              marginBottom: 10,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: '#fff',
              fontWeight: '800',
            }}>
            All Categories
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const renderOffers = ({item, index}) => {
    return (
      <View
        style={{
          margin: 10,
        }}>
        <Image
          source={{
            uri: 'https://img.paisawapas.com/ovz3vew9pw/2020/08/19022918/Arata.jpg',
          }}
          style={{
            height: 100,
            width: width / 2 - 20,
            borderRadius: 10,
            shadowOffset: {width: 1, height: 1},
            shadowColor: '#000',
            shadowOpacity: 0.8,
            shadowRadius: 5,
          }}
        />
      </View>
    );
  };

  const renderHorizontalCategories = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: '#3f3f3f',
          padding: 8,
          alignItems: 'center',
          marginHorizontal: 5,
          marginVertical: 10,
          borderRadius: 10,
          width: width / 3.3,
        }}>
        <TouchableOpacity>
          <Image
            source={{uri: item?.appUrl}}
            style={{
              height: height / 5,
              width: width / 4,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: '#fff',
              fontWeight: '800',
            }}>
            {item?.categoryName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBlogs = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          margin: 10,
        }}
        onPress={() => {
          props.navigation.navigate('BlogPage', {
            blogId: item._id,
            blogs: item,
          });
        }}>
        <Image
          source={{uri: item?.thumbnailImage}}
          style={{
            height: 100,
            width: width / 2.3,
            borderRadius: 10,
            shadowOffset: {width: 1, height: 1},
            shadowColor: '#000',
            shadowOpacity: 0.8,
            shadowRadius: 5,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}></View>
        </View>
        <View style={{width: 180, marginTop: 10}}>
          <Text style={{color: 'white', fontSize: 12}}>{item?.title}</Text>
        </View>
        <Text
          style={{
            marginVertical: 5,
            marginHorizontal: 5,
            color: '#fff',
            fontWeight: '700',
            textDecorationLine: 'underline',
          }}>
          Read more
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {props?.authUser?.data?.isBannerVisible == true && (
        <View
          style={{
            backgroundColor: '#3F3F3FB2',
            position: 'absolute',
            height: height,
            width: width,
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props?.authUser?.data?.isBannerVisible && (
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  var data = props?.authUser;
                  Object.assign(data?.data, {isBannerVisible: false});
                  dispatch(AuthUserA(data));
                  storeUserData(data);
                  setIsEarnCoinVisible(false);
                }}>
                <Image
                  source={Images.earncoin}
                  style={{
                    height: 260,
                    width: 260,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {props?.route?.params?.isPopUpVisible == true && (
        <View
          style={{
            backgroundColor: '#3F3F3FB2',
            position: 'absolute',
            height: height,
            width: width,
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props?.route?.params?.isPopUpVisible && (
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  InAppReview.isAvailable();
                  InAppReview.RequestInAppReview()
                    .then(res => {})
                    .catch(e => console.log('review error', e));
                  // Object.assign(data?.data, {isBannerVisible: false});
                  props.navigation.navigate('Home', {
                    isPopUpVisible: false,
                  });
                }}>
                <Image
                  source={Images.billpayed}
                  style={{
                    height: 260,
                    width: 260,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <ScrollView ref={scrollRef} style={{flexGrow: 1, flex: 1}}>
        <View
          style={{
            flex: 0.7,
            backgroundColor: 'black',
            zIndex: 2,
          }}>
          <View>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderBottomEndRadius: 10,
                borderBottomStartRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('City')}>
                    <Text
                      style={{
                        color: '#26235C',
                        fontWeight: '600',
                        fontSize: 21,
                      }}>
                      {cvalue != undefined ? cvalue : 'Select City'}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#26235C',
                          fontWeight: '400',
                          fontSize: 13,
                          // fontFamily: 'segoeuii',
                          marginTop: 3,
                        }}>
                        {lvalue == 'All' ? 'All Localities' : lvalue}
                      </Text>
                      <View style={{marginHorizontal: 12, marginVertical: 8}}>
                        <Image
                          style={{height: 7.5, width: 12}}
                          source={Images.bottomArrow}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

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
                    {userData?.kubeCoin == undefined ? 0 : userData?.kubeCoin}{' '}
                    Coins
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                marginVertical: 15,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Search')}
                style={{
                  backgroundColor: '#fff',
                  marginHorizontal: 13,
                  padding: 8,
                  flexDirection: 'row',
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Image source={Images.search} />

                <Text
                  style={{
                    fontSize: 20,
                    color: '#26235C',
                    marginLeft: 10,
                  }}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Banner section  */}

          <View
            style={{
              paddingTop: 20,
            }}>
            <SwiperFlatList
              autoplay
              autoplayLoop
              paginationStyleItem={{height: 7, width: 7, marginTop: 10}}
              data={results}
              renderItem={renderBanner}
            />
          </View>
          <View
            style={{
              paddingVertical: 35,
              height: height / 1.37,
            }}>
            <View style={{alignSelf: 'center'}}>
              <FlatList
                data={categoriesArr}
                renderItem={renderCategories}
                numColumns={3}
              />
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#3F3F3F',
              marginTop: -20,
              paddingVertical: 20,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AddCoin')}
              style={{alignItems: 'center'}}>
              <Image
                source={Images.coin}
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                }}>
                My Coins
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('AddCoin')}
              style={{alignItems: 'center', marginLeft: 20}}>
              <Image
                source={Images.coinAdd}
                style={{
                  height: 50,
                  width: 50,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                }}>
                Add Coins
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Transaction')}
              style={{alignItems: 'center'}}>
              <Image
                source={Images.transaction}
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 10,
                  width: width / 4,
                  textAlign: 'center',
                }}>
                Previously Transaction
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {cvalue=='Ghaziabad' ?
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '600',
                paddingHorizontal: 10,
                paddingVertical: 20,
                zIndex: 2,
              }}>
              Exclusive Vendors
            </Text>:
            <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '600',
              paddingHorizontal: 10,
              paddingVertical: 20,
              zIndex: 2,
            }}>
            Platinum Vendors
          </Text>
            }

            {vendorArr?.map(item => {
              return (
                <View style={{padding: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      likedStores?.includes(item?.uniqueId)
                        ? props.navigation.navigate('VendorPage', {
                            storeData: item,
                            likeStatus: true,
                          })
                        : props.navigation.navigate('VendorPage', {
                            storeData: item,
                            likeStatus: false,
                          });
                    }}
                    activeOpacity={0.9}>
                    <View style={{alignSelf: 'center'}}>
                      <Image
                        style={{
                          width: width - 20,
                          height: height / 5,
                          borderRadius: 10,
                        }}
                        // resizeMode="contain"
                        source={{uri: item?.images && item?.images[0].url}}
                      />
                    </View>
                    <View
                      style={{
                        width: width - 40,
                        backgroundColor: '#3F3F3F',
                        borderRadius: 7,
                        alignSelf: 'center',
                        padding: 15,
                        marginTop: -30,
                        zIndex: 2,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{width: 200}}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 16,
                            }}>
                            {item?.storeName}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          {likedStores?.includes(item?.uniqueId) ? (
                            <TouchableOpacity
                              onPress={() => {
                                unLikeButtonHandler(item?.uniqueId);
                              }}>
                              <Image
                                style={{width: 20, height: 20, marginEnd: 10}}
                                source={ConstImg.LikeIcon}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                likeButtonHandler(item?.uniqueId);
                              }}>
                              <Image
                                style={{width: 20, height: 18, marginEnd: 10}}
                                source={ConstImg.UnlikeIcon}
                              />
                            </TouchableOpacity>
                          )}
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
                              source={Images.StarRatingIcon}
                              resizeMode="cover"
                            />
                            <Text style={{color: '#fff', fontSize: 13}}>
                              {item?.ratings && item?.ratings.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', paddingTop: 5}}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: 14,
                          }}>
                          Add.
                        </Text>
                        <View style={{paddingEnd: 20}}>
                          <Text style={{color: '#fff', paddingStart: 5}}>
                            {item.address}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            paddingTop: 5,
                            fontWeight: 'bold',
                            color: '#fff',
                            width: width / 1.6,
                          }}>
                          Save {item?.discount}% on your total bill.
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(`tel:${item?.phoneNo}`)
                          }>
                          <View
                            style={{
                              width: 60,
                              height: 20,
                              backgroundColor: '#fff',
                              flexDirection: 'row',
                              borderRadius: 2,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              style={{width: 12, height: 12}}
                              source={Images.CallIcon}
                              resizeMode="cover"
                            />
                            <Text style={{color: '#26235C', fontSize: 10}}>
                              Call now
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}

            <View
              style={{
                alignItems: 'center',
                marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('StoreList')}
                activeOpacity={0.8}
                style={{
                  backgroundColor: '#3F3F3F',
                  paddingVertical: 8,
                  paddingHorizontal: 13,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '800',
                  marginVertical: 30,
                  marginHorizontal: 10,
                }}>
                Trending Offers!
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#3F3F3F',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({item, index}) => renderOffers(item, index)}
                numColumns={2}
              />
            </View>

            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '800',
                  marginVertical: 30,
                  marginHorizontal: 10,
                }}>
                The next things on your mind
              </Text>
            </View>

            <View
              style={{
                backgroundColor: 'black',
                paddingVertical: 10,
              }}>
              <FlatList
                data={categoriesArr}
                renderItem={({item, index}) =>
                  renderHorizontalCategories(item, index)
                }
                horizontal
              />
            </View> */}

            {/* <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '800',
                  marginVertical: 30,
                  marginHorizontal: 10,
                }}>
                Top Brands
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#3F3F3F',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({item, index}) => renderTopBrands(item, index)}
                horizontal
              />
            </View> */}

            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '800',
                  marginVertical: 30,
                  marginHorizontal: 10,
                }}>
                Latest Blog
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#3F3F3F',
                paddingVertical: 10,
              }}>
              <FlatList
                data={blogArr}
                renderItem={({item, index}) => renderBlogs(item, index)}
                horizontal
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 30,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('BlogList')}
                activeOpacity={0.8}
                style={{
                  backgroundColor: '#3F3F3F',
                  paddingVertical: 8,
                  paddingHorizontal: 13,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: '800',
                  }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#3F3F3F',
              paddingVertical: 10,
              marginVertical: 30,
              alignItems: 'center',
              marginBottom: 70,
            }}>
            <TouchableOpacity
              onPress={onPressTouch}
              style={{
                backgroundColor: '#fff',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000',
                  fontWeight: '700',
                }}>
                Back to top
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require('./../../assets/images/ad.png')}
          style={{
            width: width,
            height: 450,
            marginBottom: 25,
            zIndex: 1,
            marginTop: -170,
          }}
        />
      </ScrollView>
    </>
  );
};

export default connect(({GetCategoryR, GetBlogR, AuthUserR, SetCityR}) => ({
  categories: GetCategoryR.category,
  blogs: GetBlogR.blog,
  authUser: AuthUserR.user,
  getCity: SetCityR.data,
}))(Home);
