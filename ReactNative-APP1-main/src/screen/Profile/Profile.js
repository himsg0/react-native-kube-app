import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  // Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../../components/MyText';
import React from 'react';
// import Feedback from '../Feedback';
import ModalApp from '../Feedback';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from '../Logout/Logout';
import {useDispatch, useSelector, connect} from 'react-redux';
import {editUser, getUsers} from '../../Services/UserServices';

const Profile = props => {
  const [Name, setName] = React.useState('');
  const [Phone, setPhone] = React.useState(0);
  const [Email, setEmail] = React.useState('');

  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      setUserData(res[0]);
    });
  },[userData])


  React.useEffect(() => {
    setName(userData?.userName);
    setPhone(userData?.phoneNo);
    setEmail(userData?.email);
  }, [userData]);

  return (
    <View style={styles.MainContainer}>
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
            PROFILE
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
                {userData?.kubeCoin == undefined ? 0 : userData?.kubeCoin} Coins
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#3F3F3F',
              flexDirection: 'row',
              borderRadius: 15,
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: 30,
              marginHorizontal: '4%',
              marginTop: 40,
              width: width * 0.92,
              height: 133,
            }}>
            <Image
              style={{width: 90, height: 90, margin: -20}}
              source={require('./ProfilePic.png')}
            />
            <View style={{marginLeft: 60, alignItems: 'flex-start'}}>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                {Name}
              </Text>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                {Phone}
              </Text>
              <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                {Email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('EdProfile');
              }}
              style={{marginTop: -75, marginLeft: -9}}>
              <Text style={{color: 'white', textDecorationLine: 'underline'}}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              width: width,
            }}>
            <View
              style={{
                width: width * 0.92,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MyCoins', {
                    profile: true,
                  });
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 68, height: 68}}
                    source={require('./ProfileAssets/Mycoins.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    My Coins
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MyCoins', {
                    profile: true,
                  });
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 16,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 68, height: 68}}
                    source={require('./ProfileAssets/AddCoins.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Add Coins
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Transaction');
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 65, height: 65}}
                    source={require('./ProfileAssets/History.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Transaction History
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.92,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('FavoriteVendor');
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 46, height: 39}}
                    source={require('./ProfileAssets/Favorite.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Favourite Vendors
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('BlogList');
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 16,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 45, height: 40}}
                    source={require('./ProfileAssets/blog.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Blogs
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ContactUs');
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 50, height: 45}}
                    source={require('./ProfileAssets/contactUs.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Contact Us
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.92,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('BecomePartner');
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 61, height: 41}}
                    source={require('./ProfileAssets/Beapart.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Become A Partner
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Advertise');
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 16,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 42, height: 44}}
                    source={require('./ProfileAssets/adwithus.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Advertise With Us
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('AboutUs');
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 58, height: 48}}
                    source={require('./ProfileAssets/aboutUs.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    About Us
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.92,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    // 'https://api.whatsapp.com/send?phone=ph_number',
                    'https://drive.google.com/file/d/1pwu6XgPRXuN83MXRlLzkPlBjdVrkTUPM/view?usp=sharing',
                  );
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 37, height: 40}}
                    source={require('./ProfileAssets/Terms.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Terms & Conditions
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://drive.google.com/file/d/1pwu6XgPRXuN83MXRlLzkPlBjdVrkTUPM/view?usp=sharing',
                  );
                }}>
                <View
                  style={{
                    backgroundColor: '#3F3F3F',
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    marginHorizontal: 16,
                    width: 99,
                    height: 119,
                  }}>
                  <Image
                    style={{width: 35, height: 40}}
                    source={require('./ProfileAssets/privacy.png')}
                  />
                  <Text
                    style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
                    Privacy Policy
                  </Text>
                </View>
              </TouchableOpacity>
              {/* Email={Email} Phone={Phone} */}
              <View>
                <ModalApp Email={Email} Phone={Phone} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width,
                justifyContent: 'space-evenly',

                // marginHorizontal: '4%',
                marginBottom: 50,
              }}>
              <Logout props={props.navigation} />
            </View>
          </View>
          <Image
            style={{
              width: width,
              height: 500,
              marginTop: -250,
              marginBottom: 30,
            }}
            source={require('../Advertise/ad.png')}
          />
        </ScrollView>
      </View>
      {/* <ImageBackground style={{flex:0.6, marginBottom:20}} source={require('../Advertise/ad.png')} /> */}
    </View>
  );
};

export default connect(({GetCategoryR, AuthUserR}) => ({
  categories: GetCategoryR.category,
  authUser: AuthUserR.user,
}))(Profile);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
