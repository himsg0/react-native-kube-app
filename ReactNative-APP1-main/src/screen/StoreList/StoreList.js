import React, {useEffect, useState} from 'react';
import {
  View,
  // Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ActivityIndicator,
  // TextInput,
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import {Image as ConstImg} from './../../assets/ImageVariables';
import {useDispatch, useSelector, connect} from 'react-redux';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreModal from './StoreFilterModal';
import SubCatModal from './SubCatModal';
import {getStores} from '../../Services/StoreServices';
import {getUsers, likeVendor, unLikeVendor} from '../../Services/UserServices';

function StoreList(props) {
  const [storeData, setStoreData] = useState([]);
  const dispatch = useDispatch();

  // const [searchKey, setSearchKey] = useState('');

  const [category, setCategory] = useState([]);
  const [city, setCity] = useState('');
  const [locality, setLocality] = useState('All');
  const [subCat, setSubCat] = useState('');
  const [isHomeDelivery, setIsHomeDelivery] = useState(false);
  const [Mcategory, setMCategory] = useState('');
  const [likedStores, setLikedStores] = useState(
    props?.authUser?.user?.favouriteStores,
  );

  // console.log(Mcategory,"category");
  // console.log(subCat,"sub-category");
  // console.log(props.route.params,"kk");
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({});

  const AdsImages = [
    {
      image:
        'https://www.kubeshop.in/wp-content/uploads/2023/03/notification-13.png',
    },
    {
      image:
        'https://www.kubeshop.in/wp-content/uploads/2023/03/notification-14.png',
    },
    {
      image:
        'https://www.kubeshop.in/wp-content/uploads/2023/03/notification-15.png',
    },
    {
      image:
        'https://www.kubeshop.in/wp-content/uploads/2023/03/notification-12.png',
    },
  ];

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setUserData(res[0]);
    });
  }, [userData]);

  React.useEffect(() => {
    setLikedStores(userData?.favouriteStores);
  }, [userData]);

  React.useEffect(() => {
    setCategory(props.categories);
  }, [props.categories]);

  useEffect(() => {
    setCity(props?.getCity?.city);
    setLocality(props?.getCity?.Locality?.item);
  }, [props.getCity]);

  const getCData = () => {
    AsyncStorage.getItem('Cdata').then(val => {
      setCity(val);
    });
  };
  const getLData = () => {
    AsyncStorage.getItem('Ldata').then(val => {
      setLocality(val);
    });
  };
  useEffect(() => {
    getCData();
    getLData();
  }, []);

  useEffect(() => {
    props.route.params && setMCategory(props.route.params.category);
  }, [props?.route?.params?.category]);

  useEffect(() => {
    props.route.params?.subCategory && setSubCat(props.route.params.subCategory);
  }, [props?.route?.params?.subCategory]);

  useEffect(() => {
    if (Mcategory != undefined && city && locality && subCat != undefined) {
      getStores(city, locality, isHomeDelivery, Mcategory, subCat).then(res => {
        setStoreData(res);
        setLoading(false);
      });
    }
  }, [Mcategory, subCat, locality, city, isHomeDelivery]);

  const likeButtonHandler = item => {
    likeVendor(item, userData?.uniqueId).then(res => {
      setLikedStores(oldArray => [...oldArray, item]);
    });
  };
  const unLikeButtonHandler = item => {
    unLikeVendor(item, userData?.uniqueId).then(res => {
      setLikedStores(prevState =>
        prevState.filter(prevItem => prevItem !== item),
      );
    });
  };

  const listItemView = ({item, index}) => {
    return (
      <View style={{padding: 0}}>
        <TouchableOpacity
          onPress={() => {
            likedStores?.includes(item?.uniqueId)
              ? props.navigation.navigate('VendorPage', {
                  storeData: item,
                  likeStatus: true,
                  // redirected: "StoreList"
                })
              : props.navigation.navigate('VendorPage', {
                  storeData: item,
                  likeStatus: false,
                  // redirected: "StoreList"
                });
          }}>
          <View
            style={{
              height: 260,
              width: '100%',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 351,
                height: 162,
                borderRadius: 10,
                zIndex: 0,
              }}
              resizeMode="contain"
              source={{uri: item?.images[0]?.url}}
            />

            <View
              style={{
                flex: 0,
                // marginBottom: -40,
                width: 334,
                // height: 120,
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
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 200}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
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
                      source={ConstImg.StarRatingIcon}
                      resizeMode="cover"
                    />
                    <Text style={{color: '#fff', fontSize: 13}}>
                      {item?.ratings?.toFixed(2)}
                    </Text>
                  </View>
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
                <View style={{paddingEnd: 20}}>
                  <Text style={{color: 'white', paddingStart: 5}}>
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
                  style={{paddingTop: 5, fontWeight: 'bold', color: 'white'}}>
                  Save {item?.discount}% on your total bill
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${item?.phoneNo}`)}>
                  <View
                    style={{
                      width: 60,
                      height: 20,
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      borderRadius: 2,
                      marginTop: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 4,
                    }}>
                    <Image
                      style={{width: 12, height: 12}}
                      source={ConstImg.CallIcon}
                      resizeMode="cover"
                    />
                    <Text style={{color: '#26235C', fontSize: 10}}>
                      Call now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {(index + 1) % 2 === 0 ? (
          AdsImages?.length != 0 ? (
            <Image
              style={{
                flex: 1,
                width: width * 0.8,
                // height: 200,
                aspectRatio: 1.8,
                alignSelf: 'center',
                marginBottom: 5,
              }}
              // source={{uri: item?.offer[0]?.image}}
              source={{
                uri: AdsImages[((index + 1) / 2 - 1) % AdsImages?.length].image,
              }}
              resizeMode="contain"
            />
          ) : (
            <View
              style={{
                alignSelf: 'center',
                marginTop: 100,
                paddingVertical: 50,
              }}>
              <Text style={{color: 'white'}}>No data available</Text>
            </View>
          )
        ) : null}

        {index == storeData?.length - 1 && (
          <View style={{zIndex: 1}}>
            <Image
              style={{width: width, height: 450, marginTop: 10}}
              source={require('../BecomeAPartner/ad.png')}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          backgroundColor: 'black',
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        }}>
        <View
          style={{
            backgroundColor: '#e7e7e7',
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
            <Text
              style={{
                color: '#26235C',
                fontSize: 24,
                fontWeight: 'bold',
                paddingStart: 5,
              }}>
              STORE LIST
            </Text>

            {/* Coin section */}
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
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
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#3f3f3f',
          borderRadius: 10,
        }}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <StoreModal
            nav={props.navigation}
            data={category}
            category={Mcategory}
            setCategory={setMCategory}
            setSubCategory={setSubCat}
          />
          <SubCatModal subCat={subCat} setSubCat={setSubCat} data={Mcategory} />

          <CheckBox
            style={{
              width: width / 4.3,
            }}
            checkBoxColor="#fff"
            selectedTextStyle={{
              fontSize: 13,
              color: '#fff',
              fontWeight: '500',
            }}
            leftTextStyle={{color: '#fff'}}
            onClick={() => {
              setIsHomeDelivery(!isHomeDelivery);
            }}
            isChecked={isHomeDelivery}
            leftText={'Home Delivery'}
          />
        </View>
      </View>

      <View
        style={{
          marginVertical: 10,
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
      {loading && storeData?.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <ActivityIndicator size={'large'} color="#fff" />
        </View>
      ) : !loading && storeData?.length !== 0 ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={storeData}
            renderItem={listItemView}
          />
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <Text
            style={{
              color: '#fff',
            }}>
            No Data Available
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2,
  },
  paginationBox: {
    margin: 10,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 5,
    justifyContent: 'center',
  },

  paginationText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },

  paginationDotText: {
    fontSize: 40,
    marginTop: 8,
    color: '#F26669',
    fontWeight: '500',
  },
});

export default connect(({GetCategoryR, AuthUserR, SetCityR}) => ({
  categories: GetCategoryR.category,
  authUser: AuthUserR.user,
  getCity: SetCityR.data,
}))(StoreList);
