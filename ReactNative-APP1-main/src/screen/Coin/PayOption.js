import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Text from '../../components/MyText';
import {height, Image as Images, width} from '../../assets/ImageVariables';

import InAppReview from 'react-native-in-app-review';
import {useDispatch, useSelector, connect} from 'react-redux';

import {creditUser, getUsers} from '../../Services/UserServices';
import {
  getTransactionId,
  makeTransaction,
} from '../../Services/TransactionServices';

const PayOption = props => {
  const [orderId, setOrderId] = useState('');
  const price = props?.route?.params?.price;
  const percent = props?.route?.params?.percent;
  const coins = (price * parseInt(percent)) / 100;
  const cbpercent = props?.route?.params?.cBack;
  const Coinback = (coins * cbpercent) / 100;
  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setUserData(res[0]);
    });
  }, [props.authUser]);

  React.useEffect(() => {
    var transactionId = getTransactionId();
    setOrderId(transactionId);
  }, []);

  const creditUserCalling = () => {

      creditUser(userData?.uniqueId, "vKWxxankVPTQ8Wlbrgyv", Math.ceil(Coinback) ).then((res) => {
        console.log("credit calling")
        newTransactionCreate();
    })
  };

  const newTransactionCreate = data => {
    var transData = {
      creditUserId: userData?.uniqueId,
      debitUserId: "vKWxxankVPTQ8Wlbrgyv",
      credituser: userData?.phoneNo,
      debituser: 9560191189,
      transactionId: orderId,
      kubeCoin: Math.ceil(Coinback),
    };

    if(transData.credituser && transData.kubeCoin && transData.transactionId ){
      makeTransaction(transData).then((res) => {
        InAppReview.isAvailable();
        InAppReview.RequestInAppReview();
        console.log('Transaction Working');
      });
    }
  };

  const openPaymentApp = async payApp => {
    
    creditUserCalling()
    let url = '';
    switch (payApp) {
      case 'PAYTM':
        url = 'paytmmp://';
        break;
      case 'GPAY':
        url = 'tez://upi/';
        break;
      case 'PHONEPE':
        url = 'phonepe://pay';
        break;
    }

    console.log('URL : ', url);
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.error('ERROR : ', err);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('./../../assets/images/ad.png')}
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
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
                {userData?.kubeCoin == undefined
                  ? 0
                  : userData?.kubeCoin}{' '}
                Coins
              </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                color: '#26235C',
                fontSize: 23,
                fontWeight: '800',
              }}>
              Payment Methods
            </Text>
          </View>
        </View>

        <ScrollView style={{flexGrow: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 15,
            }}>
            <View>
              <Text
                style={{
                  color: '#ACACAC',
                  fontSize: 16,
                }}>
                Order Number
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '700',
                  width: width / 2,
                }}>
                {props?.route?.params?.orderId}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: '#ACACAC',
                  fontSize: 16,
                  textAlign: 'right',
                }}>
                Amount
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '700',
                  textAlign: 'right',
                }}>
                ₹{props?.route?.params?.pay}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '700',
              }}>
              CASH
            </Text>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Payment Successful !',
                  'As a reward, 20% KUBE COIN has been added to your account as coin back',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        creditUserCalling();
                        props.navigation.navigate('Home', {
                          isPopUpVisible: true,
                        });
                      },
                    },
                  ],
                )
              }
              activeOpacity={0.8}
              style={styles.listStyle}>
              <View
                style={{
                  width: 50,
                }}>
                <Image source={Images.cash} style={styles.iconStyle} />
              </View>
              <Text style={styles.listTextStyle}>Pay Cash</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 30,
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '700',
              }}>
              UPI APPS
            </Text>

            {/* google pay */}
            <TouchableOpacity
              onPress={()=>
                openPaymentApp('GPAY')
              }
              activeOpacity={0.8}
              style={styles.listStyle}>
              <View
                style={{
                  width: 50,
                }}>
                <Image source={Images.googlePay} style={styles.iconStyle} />
              </View>
              <Text style={styles.listTextStyle}>Google Pay</Text>
            </TouchableOpacity>

            {/* paytm */}
            <TouchableOpacity
              onPress={() => openPaymentApp('PAYTM')}
              activeOpacity={0.8}
              style={styles.listStyle}>
              <View
                style={{
                  width: 50,
                }}>
                <Image source={Images.paytm} style={styles.iconStyle} />
              </View>
              <Text style={styles.listTextStyle}>Paytm</Text>
            </TouchableOpacity>

            {/* phonePe */}
            <TouchableOpacity
              onPress={() => openPaymentApp('PHONEPE')}
              activeOpacity={0.8}
              style={styles.listStyle}>
              <View
                style={{
                  width: 50,
                }}>
                <Image source={Images.phonePay} style={styles.iconStyle} />
              </View>
              <Text style={styles.listTextStyle}>PhonePe</Text>
            </TouchableOpacity>

            {/* Amazon pay */}
            <TouchableOpacity activeOpacity={0.8} style={styles.listStyle}>
              <View
                style={{
                  width: 50,
                }}>
                <Image source={Images.amazonPay} style={styles.iconStyle} />
              </View>
              <Text style={styles.listTextStyle}>Amazon Pay</Text>
            </TouchableOpacity>

            {/* Bharat pay */}
            <TouchableOpacity activeOpacity={0.8} style={styles.listStyle}>
              <View
                style={{
                  width: 50,
                }}>
                <Image source={Images.bharatPay} style={styles.iconStyle} />
              </View>
              <Text style={styles.listTextStyle}>Bharat Pay</Text>
            </TouchableOpacity>

            {/* BHIM UPI */}
            <TouchableOpacity activeOpacity={0.8} style={styles.listStyle}>
              <View
                style={{
                  width: 50,
                }}>
                <Image source={Images.bhimUPI} style={styles.iconStyle} />
              </View>
              <Text style={styles.listTextStyle}>Bhim UPI</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: '#3F3F3F',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
  },

  iconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  listTextStyle: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '700',
  },
});

export default connect(({GetCategoryR, GetBlogR, AuthUserR, SetCityR}) => ({
  authUser: AuthUserR.user,
}))(PayOption);
