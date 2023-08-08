import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Text from '../../components/MyText';
import {useDispatch, useSelector, connect} from 'react-redux';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import InAppReview from 'react-native-in-app-review';
import {creditUser, getUsers} from '../../Services/UserServices';
import {
  getCoinPackages,
  getTransaction,
  getTransactionId,
  getUniqueId,
  makeTransaction,
} from '../../Services/TransactionServices';

const todayDate = new Date();

const AddCoin = props => {
  const [coinPackageList, setCoinPackageList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [creditedCoins, setcreditedCoins] = useState();
  const [orderId, setOrderId] = useState('');
  const [Kcoins, setKcoins] = useState();
  const profile = props?.route?.params?.profile;

  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setUserData(res[0]);
    });
  }, [userData]);

  React.useEffect(() => {
    userData?.uniqueId &&
      getTransaction(userData?.uniqueId).then(res => {
        const transactions = res?.reverse();
        transactions != undefined &&
          setTransactionList(transactions.slice(0, 3));
      });
  }, [userData?.uniqueId]);

  // console.log("ll", userData)

  React.useEffect(() => {
    var transactionId = getTransactionId();
    setOrderId(transactionId);
  }, []);

  React.useEffect(() => {
    getCoinPackages().then(res => {
      setCoinPackageList(res[0]?.userPackages);
    });
  }, []);

  React.useEffect(() => {
    setcreditedCoins(userData?.kubeCoin);
  }, [userData]);

  const paymentHandler = async (amount, coins) => {
    const {
      data: {order},
    } = await axios.post(
      'https://us-central1-kube-dev-13e3f.cloudfunctions.net/app/checkout',
      {
        amount,
      },
    );

    const options = {
      key: 'rzp_test_mSdCzcIHF8kAxs',
      amount: order.amount,
      currency: 'INR',
      name: 'Kube Retail Tech Pvt. Ltd.',
      description: 'Kube Coins Payment',
      image:
        'https://www.kubeshop.in/wp-content/uploads/2022/07/Kube-NEw-Logo-01.webp',
      order_id: order.id,
      prefill: {
        name: userData?.username,
        email: userData?.email ? userData?.email : '',
        contact: userData?.phoneNo,
      },
      notes: {
        address: 'WTT',
      },
      theme: {
        color: '#121212',
      },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        console.log('Working');
        paymentVerify(data);
        coinCredit(coins);

        alert(
          `Your Payment is Successful. ${coins} coins has been added to your account`,
        );
      })
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
        alert('Transaction Cancelled');
      });
  };

  const coinCredit = async data => {
    creditUser(userData?.uniqueId, 'vKWxxankVPTQ8Wlbrgyv', data).then(res => {
      setcreditedCoins(+creditedCoins + +data);
      newTransactionCreate();
    });
  };

  const paymentVerify = async data => {
    const verified = await axios.post(
      'https://us-central1-kube-dev-13e3f.cloudfunctions.net/app/paymentverification',

      {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_order_id: data.razorpay_order_id,
        razorpay_signature: data.razorpay_signature,
      },
    );
  };

  const newTransactionCreate = data => {
    var transData = {
      creditUserId: userData?.uniqueId,
      debitUserId: 'vKWxxankVPTQ8Wlbrgyv',
      credituser: userData?.phoneNo,
      debituser: 9560191189,
      transactionId: orderId,
      kubeCoin: Kcoins,
    };

    if (transData.credituser && transData.kubeCoin && transData.transactionId) {
      makeTransaction(transData).then(res => {
        InAppReview.isAvailable();
        InAppReview.RequestInAppReview();
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {!userData || !transactionList ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <ActivityIndicator size={'large'} color="#fff" />
        </View>
      ) : (
        <View style={{backgroundColor: 'black'}}>
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
              {profile == true ? (
                <TouchableOpacity
                  style={{width: 20, height: 20}}
                  onPress={() => props.navigation.navigate('Profile')}>
                  <Image source={Images.backArrow} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{width: 20, height: 20}}
                  onPress={() => props.navigation.goBack()}>
                  <Image source={Images.backArrow} />
                </TouchableOpacity>
              )}

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

          <ScrollView
            style={{
              flexGrow: 1,
            }}>
            <View
              style={{
                backgroundColor: '#3F3F3F',
                padding: 15,
                flexDirection: 'row',
                borderRadius: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 30,
                marginVertical: 40,
              }}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: '800',
                  }}>
                  Coin Balance
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 25,
                  }}>
                  {userData?.kubeCoin == undefined ? 0 : creditedCoins} coins
                </Text>
              </View>

              <Image
                source={Images.coin}
                style={{
                  height: 50,
                  width: 50,
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: '#3F3F3F',
                padding: 15,
                borderRadius: 15,
                paddingHorizontal: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 30,
                      fontWeight: '800',
                    }}>
                    Add Coins
                  </Text>
                </View>

                <Image source={Images.coin} />
              </View>

              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    marginTop: 10,
                  }}>
                  Add Coins to Your Account -{'\n'}Choose from the available
                  options in the below tabs or type in your desired amount,
                  adding coins to your KUBE COIN account is simple and
                  straightforward. With flexible options to meet your needs, you
                  can enjoy the benefits of having a KUBE COIN balance for all
                  your payment needs.
                </Text>

                {coinPackageList?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedCoin(index);
                        setKcoins(item?.packageCoins);
                      }}
                      style={{
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        marginVertical: 8,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                        }}>
                        {item?.packageCoins} Coin / ₹{item?.packageAmount} Only.
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                {selectedCoin != null && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 10,
                      alignItems: 'center',
                      marginVertical: 8,
                    }}
                    onPress={() => {
                      paymentHandler(
                        coinPackageList[selectedCoin]?.packageAmount,
                        coinPackageList[selectedCoin].packageCoins,
                      );
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '800',
                      }}>
                      Proceed to add{' '}
                      {coinPackageList[selectedCoin]?.packageCoins} Coins
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View>
              <Image
                source={{
                  uri: 'https://www.nicepng.com/png/detail/9-91717_ticket-png-free-download-free-ticket-png.png',
                }}
                style={{
                  width: width,
                  aspectRatio: 10 / 6.66,
                  marginVertical: 40,
                }}
              />
            </View>

            {transactionList.length !== 0 && (
              <View
                style={{
                  backgroundColor: '#3F3F3F',
                  padding: 15,
                  borderRadius: 15,
                  paddingHorizontal: 14,
                  marginBottom: 160,
                  zIndex: 2,
                }}>
                {transactionList?.map((item, index) => {
                  const createdAt = item?.createdAt.toDate();
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginVertical: 4,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: 45,
                            width: 45,
                            backgroundColor: '#26235C',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 100,
                            marginRight: 5,
                          }}>
                          {/* <Text
                          style={{
                            color: '#fff',
                            fontWeight: '800',
                            fontSize: 20,
                          }}>
                          J
                        </Text> */}
                          <Image
                            style={{width: 20, height: 35}}
                            source={require('./user.png')}
                          />
                        </View>

                        <View>
                          {item.creditUser == userData?.phoneNo ? (
                            <>
                              <Text
                                style={{
                                  color: '#26235C',
                                  fontWeight: '800',
                                }}>
                                Recived from {item?.debitUserName}
                              </Text>
                              <Text
                                style={{
                                  color: '#000',
                                }}>
                                {(moment()
                                  .add(-1, 'days')
                                  .format('DD MM YYYY') ==
                                moment(createdAt).format('DD MM YYYY')
                                  ? 'Yesterday'
                                  : moment(createdAt).format('DD MM YYYY')) +
                                  ', ' +
                                  moment(createdAt).format('hh:mm a')}
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text
                                style={{
                                  color: '#26235C',
                                  fontWeight: '800',
                                }}>
                                Paid to{' '}
                                {item?.creditUserName == undefined
                                  ? item?.debitUser
                                  : item?.creditUserName}
                              </Text>
                              <Text
                                style={{
                                  color: '#000',
                                }}>
                                {(moment()
                                  .add(-1, 'days')
                                  .format('DD MM YYYY') ==
                                moment(createdAt).format('DD MM YYYY')
                                  ? 'Yesterday'
                                  : moment(createdAt).format('DD MM YYYY')) +
                                  ', ' +
                                  moment(createdAt).format('hh:mm a')}
                              </Text>
                            </>
                          )}
                        </View>
                      </View>

                      {item.creditUser == userData?.phoneNo ? (
                        <View>
                          <Text
                            style={{
                              color: '#26235C',
                              fontWeight: '800',
                              textAlign: 'right',
                            }}>
                            +{item?.kubeCoin}
                          </Text>
                          <Text
                            style={{
                              color: '#26235C',
                            }}>
                            Recived
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#26235C',
                              fontWeight: '800',
                              textAlign: 'right',
                            }}>
                            -{item?.kubeCoin}
                          </Text>
                          <Text
                            style={{
                              color: '#26235C',
                            }}>
                            Sent
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
            <Image
              style={{
                width: width,
                height: 500,
                marginBottom: 100,
                zIndex: 1,
                marginTop: -300,
              }}
              source={require('../Advertise/ad.png')}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default connect(({GetCategoryR, GetBlogR, AuthUserR, SetCityR}) => ({
  categories: GetCategoryR.category,
  blogs: GetBlogR.blog,
  authUser: AuthUserR.user,
  getCity: SetCityR.data,
}))(AddCoin);
