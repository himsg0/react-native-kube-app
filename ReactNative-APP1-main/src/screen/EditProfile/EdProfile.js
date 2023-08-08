import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  ToastAndroid
} from 'react-native';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import {useDispatch, useSelector, connect} from 'react-redux';

import { editUser, getUsers } from '../../Services/UserServices';

const EdProfile = props => {
  const [name, setName] = useState(userData?.userName);
  const [Email, setEmail] = useState(userData?.email);
  const [userData, setUserData] = React.useState({})

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then((res) => {
      setUserData(res[0])
    });
  },[props.authUser])

  React.useEffect(() => {
    setName(userData?.userName)
    setEmail(userData?.email)
  },[userData])

  const userDetails = {
    userId: userData?.uniqueId,
    phoneNo: userData?.phoneNo,
    userName: name,
    email: Email,
  };
  const updateProfile = () => {
    editUser(userDetails)
    ToastAndroid.show("Edited Successfully", ToastAndroid.SHORT);
    props.navigation.goBack()

  };



  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          height: height * 0.075,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{height: 20, width: 20}}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image source={Images.backArrow} />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#26235C',
              paddingVertical: 6,
            }}>
            Edit Profile
          </Text>
        </View>
      </View>

      <View
        style={{
          height: height - height * 0.075,
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
        }}>
        <View style={{height: height * 0.4625}}>
          <View
            style={{
              width: width * 0.95,
              // height: height * 0.5,
              backgroundColor: '#3F3F3F',
              marginTop: 30,
              borderRadius: 10,
              zIndex: 2,
              // flex: 0.45,
            }}>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <TextInput
                style={{
                  backgroundColor: '#2E2D2D',
                  borderRadius: 7,
                  color: 'white',
                  width: '94%',
                  marginVertical: 10,
                }}
                value={name}
                onChangeText={val => {
                  setName(val);
                }}
                placeholder="Name"
                placeholderTextColor="white"
              />
              <TextInput
                style={{
                  backgroundColor: '#2E2D2D',
                  borderRadius: 7,
                  color: 'white',
                  width: '94%',
                  marginVertical: 10,
                }}
                value={Email}
                onChangeText={val => {
                  setEmail(val);
                }}
                placeholder="E-Mail"
                placeholderTextColor="white"
              />

              <TouchableOpacity
                onPress={() => {
                  updateProfile();
                }}
                style={{
                  width: '86%',
                  height: 40,
                  backgroundColor: '#FDBC12',
                  marginTop: 40,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 40,
                }}>
                <Text style={{fontWeight: '900', color: '#26235C'}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Image
          style={{
            // flex: 0.65,
            width: width,
            height: height * 0.4625,
            zIndex: 1,
            // marginTop: 80,
          }}
          source={require('../BecomeAPartner/ad.png')}
        />
      </View>
    </ScrollView>
  );
};

export default connect(({ GetCategoryR, AuthUserR}) => ({
  categories: GetCategoryR.category,
  authUser: AuthUserR.user,
}))(EdProfile);
