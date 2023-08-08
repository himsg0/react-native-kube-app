
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  // Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  // TextInput,
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import CustomInput from '../../components/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GetOTP from '../../components/GetOTP';
import {userLoggedIn} from '../../redux/actions/actions';
import {LoginUserA} from '../../redux/actions/LoginUserA';
import {useDispatch, useSelector} from 'react-redux';
import styles from './../styles/';
import ValidationCheck from '../../validation/ValidationChecker';
// import firebase from 'react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import {subscribeToTopic} from '../../Utils/notificationService';
import {height, width} from '../../assets/ImageVariables';
import { getUsers } from '../../Services/UserServices';
import auth from '@react-native-firebase/auth';

const Login = props => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    mobileNo: 0,
    mobileError: '',
  });
  const [loading, setLoading] = useState(false);

  var objectData = { data:{} , user:{} }

  const checkValidation = () => {
    var number = ValidationCheck('contact', state.mobileNo);

    if (number) {
      setState({
        ...state,
        mobileError: number,
      });
      return true;
    } else {
      setState({
        ...state,
        mobileError: '',
      });
      return false;
    }
  };

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber).then((res) => {
      
      props.navigation.navigate('OtpScreen', {
        auth: res,
        userData: objectData
      });
    }).catch((err) => {
      Alert.alert("Firebase SignInWith PhoneNumber Error",err);
      setLoading(false)
    });
  }


  const loginUser = () => {
    if (checkValidation()) {
      return;
    }
    var data = {
      phone: '+91' + state.mobileNo,
    };

    console.log("object",objectData)
    
    getUsers(state.mobileNo).then((res) => {
      console.log(typeof(state.mobileNo),"why error")
      if(res.length > 0){
        Object.assign(objectData.data, {
          isLogin: true,
          isBannerVisible: false,
        });
        Object.assign(objectData.user, res[0]);
        setLoading(true)
        signInWithPhoneNumber(`+91${state.mobileNo}`)
      }
      else{
        setState({
          ...state,
          mobileError: 'Mobile number does not exists',
        })
      }
    })

  };

  useEffect(() => {
    subscribeToTopic('news');
  });

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* <ImageBackground
        source={require('./../../assets/images/ad.png')}
        style={{
          flex: 1,
        }}> */}
        <Image
          style={{width: width, height: height * 0.13, marginTop: 30}}
          source={require('../../assets/images/authPageAds.png')}
        />
        <View
          style={{
            width: width,
            height: height * 0.05,
            backgroundColor: 'black',
            marginTop: -24,
            borderRadius: 15,
          }}></View>
        <View style={{marginTop: -80}}>
          <View style={styles.titleText}>
            <View style={styles.subTextStyle}>
              <Text style={styles.welcomeTextStyle}>Welcome Back</Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                }}>
                Login to your account
              </Text>
            </View>

            <View
              style={{
                marginTop: 30,
              }}>
              <CustomInput
                placeholder="+91 xxxxx xxxxx"
                value={(state.mobileNo)}
                errorText={state.mobileError}
                maxLength={10}
                onChangeText={text => {
                  setState({
                    ...state,
                    mobileNo: text,
                  });
                }}
                isNumeric={true}
                iconPath={require('./../../assets/images/call.png')}
              />
            </View>
          </View>

          <View style={styles.buttonViewStyle}>
            <GetOTP
              loading={loading}
              onPress={() => {
                loginUser();
              }}
              label="Get OTP"
            />

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.subTextAccountStyle}>
                Don’t have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Registration')}>
                <Text style={styles.signUpTextStyle}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            style={{width: width, marginTop: 70}}
            source={require('../../assets/images/buildingImg.png')}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;




// props {"data": {"hash": "a5ea96ddb361be26a0d71238bb7e545e89db2e33c515c5d160225ff17ce4d025.1680673757413", "isBannerVisible": false, "isLogin": true, "phone": "+919821564729", "res": {}}, "data2": {"result": {}}, "message": "Login successfull", "user": {"_id": "641ef8fea91c53ee3c83ebba", "createdAt": "2023-03-25T13:37:02.411Z", "deleted": false, "device": {"browser": "Unknown", "name": "Other 0.0.0", "type": "unavailable"}, "favouriteStores": [], "isVendor": false, "kubecoin": 1000, "phone": "+919821564729", "promoused": "HIM2023", "username": "Harsh"}}
//  LOG  {"loading": false, "user": {"data": {"hash": "a5ea96ddb361be26a0d71238bb7e545e89db2e33c515c5d160225ff17ce4d025.1680673757413", "isBannerVisible": false, "isLogin": true, "phone": "+919821564729", "res": [Object]}, "data2": {"result": [Object]}, "message": "Login successfull", "user": {"_id": "641ef8fea91c53ee3c83ebba", "createdAt": "2023-03-25T13:37:02.411Z", "deleted": false, "device": [Object], "favouriteStores": [Array], "isVendor": false, "kubecoin": 1000, "phone": "+919821564729", "promoused": "HIM2023", "username": "Harsh"}}} user