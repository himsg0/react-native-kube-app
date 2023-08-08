import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {height, width} from '../../assets/ImageVariables';
import {Image as Images} from '../../assets/ImageVariables';
import {BecomeAPartnerModel} from '../../Model/becomeAPartnerModel';
import {addPartner} from '../../Services/BecomeAPartnerServices';

const BecomePartner = props => {
  const [partnerData, setPartnerData] =
    useState <BecomeAPartnerModel>(
    {
      storeName: '',
      ownerName: '',
      storeAddress: '',
      city: '',
      locality: '',
      phoneNo: 0,
    });

  const handleInput = (feild, value : string|number) => {
    setPartnerData({
      ...partnerData,
      [feild]: value,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
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
            // justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{width: 20, height: 20}}
            onPress={() => props.navigation.goBack()}>
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
            Become A Partner
          </Text>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 5,
            // backgroundColor: 'black',
            alignItems: 'center',
          }}>
          <Image
            style={{
              marginTop: 15,
              width: width * 0.9,
              height: height * 0.3,
            }}
            source={require('./b@nner.png')}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.contactForm}>
            <View>
              <View>
                <TextInput
                  placeholder="Store Name"
                  style={styles.input}
                  onChangeText={val => handleInput('storeName', val)}
                />
              </View>
              <View>
                <TextInput
                  placeholder="Owner Name"
                  style={styles.input}
                  onChangeText={val => handleInput('ownerName', val)}
                />
              </View>
              <View>
                <TextInput
                  placeholder="Store Address"
                  style={styles.input}
                  onChangeText={val => handleInput('storeAddress', val)}
                />
              </View>
              <View>
                <TextInput
                  placeholder="Contact No."
                  style={styles.input}
                  onChangeText={val => handleInput('contactNo', val)}
                />
              </View>
              <View>
                <TextInput
                  placeholder="City"
                  style={styles.input}
                  onChangeText={val => handleInput('city', val)}
                />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Locality"
                style={styles.input}
                onChangeText={val => handleInput('locality', val)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                addPartner(partnerData);
                setPartnerData({
                  storeName: '',
                  ownerName: '',
                  storeAddress: '',
                  city: '',
                  locality: '',
                  phoneNo: 0,
                });
              }}>
              <View style={styles.button}>
                <Text style={styles.btnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View>
            <Image
              style={{width: '100%'}}
              resizeMode="contain"
              source={require('./becApartbg.png')}
            />
          </View> */}
        </View>
        <Image
          style={{width: width, height: 500, marginTop: -500, zIndex: 1}}
          source={require('./ad.png')}
        />
      </ScrollView>
    </View>
  );
};

export default BecomePartner;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
  },
  mainHeader: {
    color: '#26235C',
    fontWeight: '600',
    fontSize: 25,
  },
  contactForm: {
    backgroundColor: '#3f3f3f',
    borderRadius: 7,
    marginTop: 25,
    marginLeft: 13,
    marginRight: 13,
    marginBottom: 300,
    zIndex: 2,
  },

  input: {
    borderRadius: 5,
    margin: 10,
    height: 39,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '93%',
    borderRadius: 5,
    marginHorizontal: '3.5%',
    height: 39,
    backgroundColor: '#FFBE69',
    marginVertical: 20,
    // zIndex: 2,
  },
  btnText: {
    color: '#26235C',
    paddingTop: 9,
    paddingBottom: 7,
    fontWeight: '400',
    fontSize: 12.74,
    textAlign: 'center',
  },
});
