import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Text from '../../components/MyText';
import {connect} from 'react-redux';
import styles from '../styles';
import {Dimensions} from 'react-native';
import {Image as Images} from '../../assets/ImageVariables';
import {getUsers} from '../../Services/UserServices';
import {getFavouriteVendors} from '../../Services/StoreServices';

function FavoriteVendor(props) {
  const [loading, setLoading] = useState(true);
  const [paginationArr, setPaginationArr] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [newList, setNewList] = useState();
  const [getUserData, setUserData] = useState();
  const [FavVendor, setFavVendor] = useState([]);
  const [favVendorId, setFavVendorId] = useState([]);

  useEffect(() => {
    setCount(Math.ceil(FavVendor?.length / 10));
  });

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setFavVendorId(res[0]?.favouriteStores);
      setUserData(res[0]);
    });
  }, []);

  React.useEffect(() => {
    favVendorId.length != 0 &&
    getFavouriteVendors(favVendorId).then(val => {
      setLoading(false)
      setFavVendor(val);
    }).catch((err) => {
      setLoading(false)
    });
  }, [favVendorId]);

  setTimeout(()=>{
    setLoading(false)
  },4000)

  useEffect(() => {
    let list = [];
    paginationArr.map((item, key) => {
      if (item == selectedPage) {
        const init = (item - 1) * 10;
        const end = init + 10;
        list = FavVendor?.slice(init, end);
      }
      setNewList(list);
    });
  }, [selectedPage, paginationArr]);

  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    var i = 1;
    var pageArr = [];
    while (i <= count) {
      pageArr.push(i);
      i++;
    }
    setPaginationArr(pageArr);
  }, [count]);

  const showShortPaginationList = () => {
    return paginationArr.map((item, index) => {
      index = index + 1;
      return (
        <TouchableOpacity
          key={item.id}
          style={[
            {
              backgroundColor: index == selectedPage ? 'red' : '#F26669',
            },
            {
              margin: 10,
              paddingHorizontal: 8,
              paddingVertical: 14,
              borderRadius: 5,
              justifyContent: 'center',
            },
          ]}
          onPress={() => setSelectedPage(item)}>
          <Text
            style={{
              fontSize: 12,
              color: 'white',
              fontWeight: '600',
            }}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const showLongPaginationList = () => {
    if (selectedPage < 4) {
      return [1, 2, 3].map((item, index) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              {
                backgroundColor: index + 1 == selectedPage ? 'red' : '#F26669',
              },
              {
                margin: 10,
                paddingHorizontal: 8,
                paddingVertical: 14,
                borderRadius: 5,
                justifyContent: 'center',
              },
            ]}
            onPress={() => setSelectedPage(index + 1)}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
                fontWeight: '600',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      });
    } else {
      return [2, 1, 0].map((item, index) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              {
                backgroundColor:
                  selectedPage - item == selectedPage ? 'red' : '#F26669',
              },
              {
                margin: 10,
                paddingHorizontal: 8,
                paddingVertical: 14,
                borderRadius: 5,
                justifyContent: 'center',
              },
            ]}
            onPress={() => setSelectedPage(selectedPage - item)}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
                fontWeight: '600',
              }}>
              {selectedPage - item}
            </Text>
          </TouchableOpacity>
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#dfdfdf',
          padding: 15,
          borderBottomEndRadius: 7,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{width: 20, height: 20}}
          onPress={() => props.navigation.goBack()}>
          <Image source={Images.backArrow} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#26235C',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          Favorite Vendor
        </Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <ActivityIndicator size={'large'} color="#fff" />
        </View>
      ) :
      !loading && newList.length != 0 ? (
        <View>
          <ScrollView>
            {newList?.map((item, index) => {
              return (
                <View key={item.userId} style={{padding: 10, zIndex: 2}}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('VendorPage', {
                        storeData: item,
                        likeStatus: true,
                      })
                    }
                    activeOpacity={0.9}>
                    <View>
                      <Image
                        style={{
                          width: width - 20,
                          height: height / 5,
                          borderRadius: 10,
                        }}
                        // resizeMode="contain"
                        source={{uri: item?.images[0].url}}
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
                          <Image
                            style={{width: 20, height: 20, marginEnd: 10}}
                            source={Images.LikeIcon}
                          />
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
                              {item && item?.ratings?.toFixed(2)}
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
                            {item?.address}
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
                          Save {item?.discount}% on your total bill
                        </Text>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(`tel:${item?.phone}`)}>
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
                  {index == newList?.length - 1 && (
                    <View style={{marginBottom: 50}}>
                      <View style={{display: 'flex', flexDirection: 'column'}}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'center',
                            zIndex: 2,
                          }}>
                          <TouchableOpacity
                            style={{marginHorizontal: 10}}
                            onPress={() =>
                              selectedPage > 1 &&
                              setSelectedPage(selectedPage - 1)
                            }>
                            <Image
                              source={require('./../../assets/images/redLeft.png')}
                            />
                          </TouchableOpacity>
                          {count < 4 ? (
                            <View style={{flexDirection: 'row'}}>
                              {showShortPaginationList()}
                            </View>
                          ) : (
                            <View style={{flexDirection: 'row'}}>
                              {selectedPage ==
                                paginationArr[paginationArr?.length - 1] && (
                                <View style={{flexDirection: 'row'}}>
                                  <TouchableOpacity
                                    style={[
                                      {
                                        backgroundColor:
                                          paginationArr[0] == selectedPage
                                            ? 'red'
                                            : '#F26669',
                                      },
                                      {
                                        margin: 10,
                                        paddingHorizontal: 8,
                                        paddingVertical: 14,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                      },
                                    ]}
                                    onPress={() =>
                                      setSelectedPage(paginationArr[0])
                                    }>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'white',
                                        fontWeight: '600',
                                      }}>
                                      {paginationArr[0]}
                                    </Text>
                                  </TouchableOpacity>
                                  <Text
                                    style={{
                                      fontSize: 40,
                                      marginTop: 8,
                                      color: '#F26669',
                                      fontWeight: '500',
                                    }}>
                                    ......
                                  </Text>
                                </View>
                              )}
                              {showLongPaginationList()}
                              {selectedPage !=
                                paginationArr[paginationArr?.length - 1] && (
                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      fontSize: 40,
                                      marginTop: 8,
                                      color: '#F26669',
                                      fontWeight: '500',
                                    }}>
                                    ......
                                  </Text>

                                  <TouchableOpacity
                                    style={[
                                      {
                                        backgroundColor:
                                          paginationArr[
                                            paginationArr?.length - 1
                                          ] == selectedPage
                                            ? 'red'
                                            : '#F26669',
                                      },
                                      {
                                        margin: 10,
                                        paddingHorizontal: 8,
                                        paddingVertical: 14,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                      },
                                    ]}
                                    onPress={() =>
                                      setSelectedPage(
                                        paginationArr[
                                          paginationArr?.length - 1
                                        ],
                                      )
                                    }>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        color: 'white',
                                        fontWeight: '600',
                                      }}>
                                      {paginationArr[paginationArr?.length - 1]}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              )}
                              <View></View>
                            </View>
                          )}

                          <TouchableOpacity
                            style={{marginTop: 10}}
                            onPress={() =>
                              selectedPage <
                                paginationArr[paginationArr?.length - 1] &&
                              setSelectedPage(selectedPage + 1)
                            }>
                            <Image
                              source={require('./../../assets/images/redRight.png')}
                            />
                          </TouchableOpacity>
                        </View>
                        {/*  */}
                      </View>
                    </View>
                  )}
                </View>
              );
            })}

            <Image
              source={require('../Advertise/ad.png')}
              style={{
                width: width,
                height: height / 1.75,
                zIndex: 1,
                marginTop: -100,
                // position: 'absolute',
              }}
            />
          </ScrollView>
        </View>
      ) : 
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
      </View>}
    </View>
  );
}

export default connect(({AuthUserR}) => ({
  authUser: AuthUserR.user,
}))(FavoriteVendor);
