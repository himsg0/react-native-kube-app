// import React, {useState} from 'react';
// import {
//   View,
//   // Text,
//   ImageBackground,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   // TextInput,
// } from 'react-native';
// import Text from '../../components/MyText';
// import TextInput from '../../components/MyTextInput';
// import CustomInput from '../../components/CustomInput';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import GetOTP from '../../components/GetOTP';
// import styles from './../styles';
// import ValidationCheck from '../../validation/ValidationChecker';
// import {registerUserA} from '../../redux/actions/RegisterA';
// import {useDispatch, useSelector} from 'react-redux';
// import {width, height} from '../../assets/ImageVariables';

// const Registration = props => {
//   const dispatch = useDispatch();
//   const tasks = useSelector(state => state.registerUserR);
//   const [loading, setLoading] = useState(false);

//   const [state, setState] = useState({
//     name: '',
//     nameError: '',
//     email: '',
//     emailError: '',
//     mobile: '',
//     mobileError: '',
//   });

//   React.useEffect(() => {
//     setLoading(tasks?.loading);

//     // console.log('See registration log :', tasks);

//     if (tasks?.error != undefined) {
//       setState({
//         ...state,
//         mobileError: 'Mobile number already exists',
//       });
//     } else if (tasks?.user != undefined && tasks?.loading != true) {
//       var data = tasks?.user != null ? tasks?.user : {};
//       Object.assign(data.data, {isLogin: false, isBannerVisible: true});
//       props.navigation.navigate('OtpScreen', data);
//     }
//   }, [tasks]);

//   const checkValidation = () => {
//     var name = ValidationCheck('name', state.name);
//     var email = ValidationCheck('email', state.email);
//     var number = ValidationCheck('contact', state.mobile);

//     if (name || email || number) {
//       setState({
//         ...state,
//         nameError: name,
//         emailError: email,
//         mobileError: number,
//       });
//       return true;
//     } else {
//       setState({
//         ...state,
//         nameError: '',
//         emailError: '',
//         mobileError: '',
//       });
//       return false;
//     }
//   };

//   const registerUser = () => {
//     if (checkValidation()) {
//       return;
//     } else {
//       var data = {
//         username: state.name,
//         email: state.email,
//         phone: '+91' + state.mobile,
//       };
//       dispatch(registerUserA(data));
//     }
//   };
//   //exist

//   return (
//     <View style={styles.container}>
//       <KeyboardAwareScrollView>
//         <Image
//           style={{width: width, height: height * 0.13, marginTop: 30}}
//           source={require('../../assets/images/authPageAds.png')}
//         />
//         <View
//           style={{
//             width: width,
//             height: height * 0.05,
//             backgroundColor: 'black',
//             marginTop: -24,
//             borderRadius: 15,
//           }}></View>
//         <View style={{marginTop: -30}}>
//           <View style={styles.titleText}>
//             <View
//               style={{
//                 flexWrap: 'wrap',
//               }}>
//               <TouchableOpacity
//                 onPress={() => props.navigation.goBack()}
//                 activeOpacity={0.8}
//                 style={styles.backButtonView}>
//                 <Image
//                   source={require('./../../assets/images/backArrow.png')}
//                   style={{
//                     height: 25,
//                     width: 15,
//                   }}
//                 />
//               </TouchableOpacity>
//             </View>

//             <View
//               style={{
//                 alignItems: 'center',
//                 marginTop: 40,
//               }}>
//               <Text style={styles.welcomeTextStyle}>REGISTRATION</Text>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 15,
//                 }}>
//                 Create Your New Account
//               </Text>
//             </View>

//             <View
//               style={{
//                 marginTop: 30,
//               }}>
//               <CustomInput
//                 placeholder="Name"
//                 value={state.name}
//                 errorText={state.nameError}
//                 onChangeText={text => setState({...state, name: text})}
//                 iconPath={require('./../../assets/images/user.png')}
//               />

//               <CustomInput
//                 placeholder="Your Email"
//                 value={state.email}
//                 errorText={state.emailError}
//                 onChangeText={text => setState({...state, email: text})}
//                 iconPath={require('./../../assets/images/mail.png')}
//               />

//               <CustomInput
//                 placeholder="+91 xxxxx xxxxx"
//                 maxLength={10}
//                 value={state.mobile}
//                 errorText={state.mobileError}
//                 onChangeText={text => setState({...state, mobile: text})}
//                 isNumeric={true}
//                 iconPath={require('./../../assets/images/call.png')}
//               />
//             </View>
//           </View>

//           <View style={styles.buttonViewStyle}>
//             <GetOTP
//               onPress={() => {
//                 // props.navigation.navigate("OtpScreen")
//                 registerUser();
//               }}
//               label="Get OTP"
//             />

//             <Text style={styles.privacyTextStyle}>
//               By signing you agree to our{' '}
//               <Text
//                 style={{
//                   textDecorationLine: 'underline',
//                 }}>
//                 Privacy Policy
//               </Text>{' '}
//               and
//               <Text
//                 style={{
//                   textDecorationLine: 'underline',
//                 }}>
//                 Terms & Services
//               </Text>
//             </Text>

//             <View style={{display: 'flex', flexDirection: 'row'}}>
//               <Text style={styles.subTextAccountStyle}>
//                 Already have an account?{'  '}
//               </Text>
//               <View style={{marginTop: 30}}>
//                 <TouchableOpacity
//                   onPress={() => props.navigation.navigate('Login')}>
//                   <Text
//                     style={{
//                       textDecorationLine: 'underline',
//                       fontSize: 18,
//                       fontWeight: '600',
//                       color: 'white',
//                     }}>
//                     Sign In
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//           <Image
//             style={{width: width, bottom: 0}}
//             source={require('../../assets/images/buildingImg.png')}
//           />
//         </View>
//       </KeyboardAwareScrollView>
//     </View>
//   );
// };

// export default Registration;



import React, {useState} from 'react';
import {
  View,
  // Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  // TextInput,
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import CustomInput from '../../components/CustomInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GetOTP from '../../components/GetOTP';
import styles from './../styles';
import ValidationCheck from '../../validation/ValidationChecker';
import {registerUserA} from '../../redux/actions/RegisterA';
import {useDispatch, useSelector} from 'react-redux';
import {width, height} from '../../assets/ImageVariables';
import { getUsers } from '../../Services/UserServices';
import auth from '@react-native-firebase/auth';

const Registration = props => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.registerUserR);
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    name: '',
    nameError: '',
    mobile: '',
    mobileError: '',
  });

  var objectData = { data:{} , user:{} }

  const checkValidation = () => {
    var name = ValidationCheck('name', state.name);
    var number = ValidationCheck('contact', state.mobile);

    if (name || number) {
      setState({
        ...state,
        nameError: name,
        mobileError: number,
      });
      return true;
    } else {
      setState({
        ...state,
        nameError: '',
        mobileError: '',
      });
      return false;
    }
  };

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber).then((res) => {
      setLoading(false)
      props.navigation.navigate('OtpScreen', {
        auth: res,
        userData: objectData
      });
    }).catch((err) => {
      Alert.alert("Firebase SignInWith PhoneNumber Error",err);
      setLoading(false)
    });
  }

  const registerUser = () => {
    if (checkValidation()) {
      return;
    } 
      var data = {
        userName: state.name,
        phoneNo: state.mobile,
      };
      getUsers(state.mobile).then((res) => {
        console.log(res.length)
        if(res.length == 0){
          Object.assign(objectData.data, {
            isLogin: false,
            isBannerVisible: true,
          });
          Object.assign(objectData.user, data);
          setLoading(true)
          signInWithPhoneNumber(`+91${state.mobile}`)
        }
        else{
          setState({
            ...state,
            mobileError: 'Mobile number already exists',
          })
        }
      })
    
  };
  //exist

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
        <View style={{marginTop: -30}}>
          <View style={styles.titleText}>
            <View
              style={{
                flexWrap: 'wrap',
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

            <View
              style={{
                alignItems: 'center',
                marginTop: 40,
              }}>
              <Text style={styles.welcomeTextStyle}>REGISTRATION</Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                }}>
                Create Your New Account
              </Text>
            </View>

            <View
              style={{
                marginTop: 30,
              }}>
              <CustomInput
                placeholder="Name"
                value={state.name}
                errorText={state.nameError}
                onChangeText={text => setState({...state, name: text})}
                iconPath={require('./../../assets/images/user.png')}
              />

              <CustomInput
                placeholder="+91 xxxxx xxxxx"
                maxLength={10}
                value={state.mobile}
                errorText={state.mobileError}
                onChangeText={text => setState({...state, mobile: text})}
                isNumeric={true}
                iconPath={require('./../../assets/images/call.png')}
              />
            </View>
          </View>

          <View style={styles.buttonViewStyle}>
            <GetOTP
              loading={loading}
              onPress={() => {
                // props.navigation.navigate("OtpScreen")
                registerUser();
              }}
              label="Get OTP"
            />

            <Text style={styles.privacyTextStyle}>
              By signing you agree to our{' '}
              <Text
                style={{
                  textDecorationLine: 'underline',
                }}>
                Privacy Policy
              </Text>{' '}
              and
              <Text
                style={{
                  textDecorationLine: 'underline',
                }}>
                Terms & Services
              </Text>
            </Text>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.subTextAccountStyle}>
                Already have an account?{'  '}
              </Text>
              <View style={{marginTop: 30}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Login')}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontSize: 18,
                      fontWeight: '600',
                      color: 'white',
                    }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Image
            style={{width: width, bottom: 0}}
            source={require('../../assets/images/buildingImg.png')}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Registration;

