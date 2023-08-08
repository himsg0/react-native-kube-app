import React, {useEffect, useState} from 'react';
import {
  View,
  // Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  // TextInput,
  Alert
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import CustomInput from '../../components/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GetOTP from '../../components/GetOTP';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './../styles';
import {useDispatch, useSelector} from 'react-redux';
import {AuthUserA} from '../../redux/Action/GetAuthA';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {height, width} from '../../assets/ImageVariables';
import auth from '@react-native-firebase/auth';
import { addUsers, getUsers } from '../../Services/UserServices';

const OtpScreen = props => {
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    otpError: '',
  });
  const [confirm, setConfirm] = useState(props?.route?.params?.auth)
  const [loginPage, setLoginPage] = useState(props?.route?.params?.userData?.data?.isLogin)
  const [userData, setUserData] = useState(props.route.params.userData)
  // const []

  const dispatch = useDispatch();


  const storeUserData = async value => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const RegisterCall = () => {
    addUsers(userData?.user).then((res) =>{
      getUsers(userData?.user?.phoneNo).then((res) => {
        Object.assign(userData.user, res[0])
        storeUserData(userData).then(() => {
          dispatch(AuthUserA(userData));
        });
      })
    })
  }

  const LoginCall = () => {
    storeUserData(userData).then(() => {
      dispatch(AuthUserA(userData));
    });
  }

  async function confirmCode(code) {
    try {
      setLoading(true)
      await confirm.confirm(code).then((res) =>{
        if(loginPage == true){
          LoginCall()
        }
        else{
          RegisterCall()
        }
      });
    } catch (error) {
        setLoading(false)
        setState({
          ...state,
          otpError: 'Entered OTP is incorrect',
        });
    }
  }

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber).then((res) => {
      setConfirm(res);
    });
  }


  const resendOTP = () => {
    signInWithPhoneNumber(`+91${userData?.user?.phoneNo}`)
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
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
        <View
          style={{
            flexWrap: 'wrap',
            marginLeft: 20,
            marginVertical: 20,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            activeOpacity={0.8}
            style={styles.backButtonView}>
            <Image
              source={require('./../../assets/images/backArrow.png')}
              style={{
                height: 25,
                width: 15,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              alignItems: 'center',
              marginTop: 40,
            }}>
            <Text style={styles.welcomeTextStyle}>Enter OTP</Text>
            <Text style={styles.otpText}>
              A 6 digit code has been sent to your phone number.
            </Text>
          </View>

          <View
            style={{
              marginTop: 30,
            }}>
            <OTPInputView
              style={{width: '80%', height: 40, marginTop: 20}}
              pinCount={6}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => {
                setCode(code);
              }}
              autoFocusOnLoad
              codeInputHighlightStyle={{
                borderBottomColor: 'white',
              }}
              codeInputFieldStyle={styles.otpInputStyle}
              onCodeFilled={code => {
                confirmCode(code);
              }}
            />
          </View>
          <Text
            style={{
              color: 'red',
              marginHorizontal: 40,
              marginTop: 20,
            }}>
            {state.otpError}
          </Text>
        </View>

        <View
          style={{
            marginTop: 40,
            alignItems: 'center',
            zIndex: 2,
          }}>
          <GetOTP
            loading={loading}
            onPress={() => {
              // if (code?.length == 6) {
              //   submitOtp(code);
              // }
              confirmCode(code)
            }}
            label="Submit"
          />

          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.editPhoneStyle}>Edit Phone Number</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => resendOTP()}>
            <Text style={styles.signUpTextStyle}> Resend OTP</Text>
          </TouchableOpacity>

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
          style={{
            width: width,
            marginTop: -20,
            zIndex: 1,
          }}
          source={require('./../../assets/images/buildingImg.png')}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default OtpScreen;

