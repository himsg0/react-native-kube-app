import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  // Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  // TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import {useDispatch, useSelector, connect} from 'react-redux';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import CustomButton from '../../components/CustomButton';

import {creditUser, debitUser, getUsers} from '../../Services/UserServices';
import {
  getTransactionId,
  makeTransaction,
} from '../../Services/TransactionServices';

const Paying = props => {
  const dispatch = useDispatch();

  const [showPrice, setShowPrice] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [discountPercent, setDiscountPrice] = useState(
    props?.route?.params?.offer == undefined ? 0 : props?.route?.params?.offer,
  );
  const [usedCoin, setUsedCoins] = useState();
  const coinBack = props?.route?.params?.cBack;
  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setUserData(res[0]);
    });
  }, [props.authUser]);

  const calculation = () => {
    setUsedCoins((showPrice * parseInt(discountPercent)) / 100);
  };

  const creditUserCalling = () => {
    var discount =
      discountPercent != undefined
        ? parseInt((showPrice * parseInt(discountPercent)) / 100)
        : 0;
    creditUser(props?.route?.params?.storeUserId, userData?.uniqueId, discount).then(
      res => {
        console.log('Credit Working');
        newTransactionCreate();
      },
    );
  };

  const disCoin = (discountPercent / 100) * 1000;

  const debitUserCalling = data => {
    var discount =
      discountPercent != undefined
        ? parseInt((showPrice * parseInt(discountPercent)) / 100)
        : 0;
    debitUser(props?.route?.params?.storeUserId, userData?.uniqueId, discount).then(
      res => {
        console.log('debit working');
        creditUserCalling();
      },
    );
  };
  console.log(userData.uniqueId,"unique id")

  const newTransactionCreate = data => {
    var discount =
      discountPercent != undefined
        ? parseInt((showPrice * parseInt(discountPercent)) / 100)
        : 0;
    var transData = {
      creditUserId: props?.route?.params?.storeUserId,
      debitUserId: userData?.uniqueId,
      credituser: props?.route?.params?.phone,
      debituser: userData?.phoneNo,
      transactionId: orderId,
      kubeCoin: discount,
      billAmount: showPrice,
      totalAmount: showPrice - (showPrice * parseInt(discountPercent)) / 100,
    };

    if (
      transData.credituser &&
      transData.kubeCoin &&
      transData.transactionId &&
      transData.billAmount &&
      transData.totalAmount
    ) {
      makeTransaction(transData).then(res => {
        props.navigation.navigate('PayOption', {
          pay: showPrice - (showPrice * parseInt(discountPercent)) / 100,
          orderId: orderId,
          price: showPrice,
          percent: discountPercent,
          cBack: coinBack,
        });
        console.log('Transaction Working');
      });
    }
  };

  React.useEffect(() => {
    var transactionId = getTransactionId();
    setOrderId(transactionId);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        }}>
        <View
          style={{
            backgroundColor: '#E7E7E7',
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
      </View>

      <ScrollView style={{flexGrow: 1, backgroundColor: 'black'}}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 15,
            margin: 15,
            borderRadius: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#25255C',
                fontSize: 22,
                fontWeight: '800',
                width: width / 2,
              }}>
              {props.route?.params?.shopName}
            </Text>

            <Image
              source={{uri: props.route.params?.vendorImg}}
              style={{
                height: 80,
                width: width / 3,
                borderRadius: 15,
              }}
            />
          </View>
          <Text
            style={{
              color: '#25255C',
              fontSize: 14,
              marginTop: 10,
            }}>
            <Text style={{fontWeight: '800'}}>ADD:</Text>{' '}
            {props.route?.params?.desc}
          </Text>
        </View>

        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 10,
          }}>
          <Image
            source={Images.kubeLogo}
            style={{
              height: 70,
              width: width / 4,
              resizeMode: 'contain',
            }}
          />

          <View
            style={{
              height: 2,
              backgroundColor: '#fff',
            }}
          />
        </View>

        <View
          style={{
            borderWidth: 2,
            borderColor: '#fff',
            margin: 15,
            padding: 15,
            borderRadius: 15,
            zIndex: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '800',
                fontSize: 17,
              }}>
              Total Bill Amount
            </Text>
            <KeyboardAvoidingView>
              <TextInput
                style={{
                  fontSize: 20,
                  color: '#FDBC12',
                  textAlign: 'right',
                }}
                maxLength={6}
                onChangeText={txt => setEnteredAmount(txt)}
                onSubmitEditing={() => {
                  setShowPrice(parseInt(enteredAmount));
                  calculation();
                }}
                placeholder="Enter Amount"
                placeholderTextColor={'#FDBC12'}
                keyboardType="number-pad"
              />
            </KeyboardAvoidingView>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {/* <Image
                                        source={Images.percent}
                                        style={{
                                            height: 20,
                                            width: 20,
                                        }}
                                    /> */}

                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    borderRadius: 40,
                    backgroundColor:
                      userData?.kubeCoin >=
                      (showPrice * parseInt(discountPercent)) / 100
                        ? 'green'
                        : 'red',
                  }}>
                  <Text
                    style={{
                      fontWeight: '800',
                      color: '#fff',
                    }}>
                    %
                  </Text>
                </View>
                {userData?.kubeCoin >=
                (showPrice * parseInt(discountPercent)) / 100 ? (
                  <Text
                    style={{
                      color: '#26C940',
                      fontWeight: '800',
                      marginLeft: 10,
                      width: width / 2,
                    }}>
                    Use {disCoin} KUBE COIN on purchase of ₹1000
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: '800',
                      marginLeft: 10,
                      width: width / 2,
                    }}>
                    You don't have enough coins.{' '}
                  </Text>
                )}
              </View>

              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  width: width / 1.6,
                }}>
                Every time you make a purchase using KUBE COIN, a portion of
                your spending will be added back into your account. It's a
                simple and easy way to earn while you spend. Start using KUBE
                COIN today and experience the benefits of hassle-free, secure
                and rewarding payments
              </Text>
            </View>

            {userData?.kubeCoin <=
              (showPrice * parseInt(discountPercent)) / 100 && (
              <View>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('AddCoin')}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#FFBE69',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      fontWeight: '800',
                      color: '#25255C',
                    }}>
                    Add Coin
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontWeight: '800',
                color: '#fff',
                marginTop: 5,
                fontSize: 18,
              }}>
              Original Bill Amount{'\n'}
              KUBE Listed Outlet Offer{'\n'}
              KUBE Coin Used{'\n'}
              New Bill Amount{'\n'}
            </Text>

            <Text
              style={{
                fontWeight: '800',
                color: '#fff',
                marginTop: 5,
                textAlign: 'right',
                fontSize: 18,
              }}>
              ₹{showPrice}
              {'\n'}
              {discountPercent}%{'\n'}-
              {(showPrice * parseInt(discountPercent)) / 100}
              {'\n'}₹{showPrice - (showPrice * parseInt(discountPercent)) / 100}
              {'\n'}
            </Text>
          </View>
        </View>

        <View
          style={{
            padding: 15,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}>
          <Image source={Images.piggyBank} />
          <Text
            style={{
              color: '#25255C',
              marginLeft: 5,
            }}>
            You’re saving{'\t'}
            <Text
              style={{
                fontWeight: '800',
              }}>
              ₹{(showPrice * parseInt(discountPercent)) / 100} (
              {parseInt(discountPercent)}%)
            </Text>{' '}
            on your bill.{' '}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            marginVertical: 30,
            marginHorizontal: 20,
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            zIndex: 2,
          }}>
          <Text
            style={{
              padding: 15,
              color: '#25255C',
              fontWeight: '800',
              fontSize: 20,
            }}>
            Grand Total
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                padding: 15,
                color: '#ACACAC',
                fontWeight: '800',
                fontSize: 16,
                textDecorationLine: 'line-through',
                marginRight: -10,
              }}>
              ₹{showPrice}
            </Text>
            <Text
              style={{
                padding: 15,
                color: '#25255C',
                fontWeight: '800',
                fontSize: 18,
              }}>
              ₹{showPrice - (showPrice * parseInt(discountPercent)) / 100}
            </Text>
          </View>
        </View>

        <View
          style={{
            margin: 30,
            zIndex: 2,
          }}>
          <CustomButton
            txtStyle={{textAlign: 'center', color: '#25255C'}}
            btnStyle={{borderRadius: 15}}
            disabled={
              showPrice - (showPrice * parseInt(discountPercent)) / 100 == 0
            }
            label={
              'Pay Bill ' +
              '₹' +
              (
                showPrice -
                (showPrice * parseInt(discountPercent)) / 100
              ).toString()
            }
            onPress={() => {
              userData?.kubeCoin <=
              (showPrice * parseInt(discountPercent)) / 100
                ? Alert.alert('Sorry', "You don't have enough coins to proceed")
                : debitUserCalling();
              setUsedCoins((showPrice * parseInt(discountPercent)) / 100);
            }}
          />
        </View>
        <Image
          style={{width: width, height: 450, marginTop: -300, zIndex: 1}}
          source={require('./../../assets/images/ad.png')}
        />
      </ScrollView>
    </View>
  );
};

export default connect(({GetCategoryR, GetBlogR, AuthUserR, SetCityR}) => ({
  authUser: AuthUserR.user,
}))(Paying);
