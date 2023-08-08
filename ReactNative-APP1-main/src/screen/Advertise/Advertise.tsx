/* eslint-disable prettier/prettier */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  LogBox,
  Alert,
  Linking,
} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import { AdvertiseModel } from '../../Model/AdvertiseModel';
import {submitAdvertise} from "../../Services/AdvertiseUsService";
import Cities from '../../core/config/Cities.json';

const Advertise = props => {

  // React.useEffect(() => {
  //   getAdvertiseData()
  // },[])


  const [clicked, setClicked] = useState(false);
  const [allCities, setAllCities] = useState<String[]>([]);
  const [advertiseData, setAdvertiseData] = useState<AdvertiseModel>({
    firstName: '',
    phoneNo: 0,
    createdAt: new Date(),
    email: '',
    cityName: '',
  });

  useEffect(() => {
    setAllCities(Cities.products)
  }, []);


  const handleInputChange = (field, value) => {
    setAdvertiseData({
      ...advertiseData,
      [field]: value
    });
  };

  const submitAndRefresh = () => {
    submitAdvertise(advertiseData);
    setAdvertiseData({
      firstName: '',
      phoneNo: 0,
      createdAt: new Date(),
      email: '',
      cityName: '',
    })
  }

  console.log("data", advertiseData)


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.headingContainer}>
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
          Advertise With Us
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text>Contact Our Sales Team</Text>
          </View>
          <View style={styles.contactForm}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.formHeading}>Contact Our Sales Team</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${9560191189}`);
              }}>
              <View style={styles.cDetailsContainer}>
                <Text style={styles.detailText}>+91 9560191189</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.cDetailsContainer}>
              <Text style={styles.detailText}>contact@kubeonline.in</Text>
            </View>
            <View style={styles.line}></View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'white',
                  paddingVertical: 20,
                }}>
                Your Details
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="Your Name"
                style={styles.input}
                value={advertiseData.firstName}
                onChangeText={val => handleInputChange("firstName",val)}
              />
            </View>
            <View>
              <TextInput
                placeholder="Your E-mail"
                style={styles.input}
                value = {advertiseData.email}
                onChangeText={val => handleInputChange("email",val)}
              />
            </View>
            <View>
              <TextInput
                placeholder="Your Phone"
                style={styles.input}
                value = {advertiseData.phoneNo}
                onChangeText={val => handleInputChange("phoneNo",val)}
              />
            </View>

            <View>
              <TouchableOpacity
                style={styles.ddContainer}
                onPress={() => {
                  setClicked(!clicked);
                }}>
                <Text style={{fontWeight: '600'}}>
                  {advertiseData.cityName == '' ? 'Select City' : advertiseData.cityName}
                </Text>
                {clicked ? (
                  <Image
                    source={require('./upload.png')}
                    style={{width: 20, height: 20}}
                  />
                ) : (
                  <Image
                    source={require('./dropdown.png')}
                    style={{width: 20, height: 20}}
                  />
                )}
              </TouchableOpacity>
              {clicked ? (
                <View style={styles.ddList}>
                  <ScrollView nestedScrollEnabled>
                    <FlatList
                      data={allCities}
                      renderItem={({item, index}) => {
                        return (
                          <TouchableOpacity
                            style={{
                              width: '85%',
                              alignSelf: 'center',
                              height: 50,
                              justifyContent: 'center',
                              borderBottomWidth: 0.5,
                              borderColor: '#8e8e8e',
                            }}
                            onPress={() => {
                              handleInputChange("cityName", item);
                              setClicked(!clicked);
                            }}>
                            <Text style={{fontWeight: '600'}}>{item}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </ScrollView>
                </View>
              ) : null}
            </View>
            <TouchableOpacity 
            onPress={() => 
              submitAndRefresh()
            }>
              <View style={styles.button}>
                <Text style={styles.btnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={{width: width, height: 450, zIndex: 1, marginTop: -600}}
          source={require('./ad.png')}
        />
      </ScrollView>
    </View>
  );
};

export default Advertise;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'black',
    zIndex: 2,
  },
  headingContainer: {
    backgroundColor: '#dfdfdf',
    padding: 15,
    borderBottomEndRadius: 7,
    flexDirection: 'row',
  },
  mainHeader: {
    color: '#26235C',
    fontWeight: '600',
    fontSize: 25,
  },
  contactForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 7,
    marginTop: 25,
    marginLeft: 13,
    marginRight: 13,
    marginBottom: 400,
  },
  formHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingVertical: 20,
  },
  cDetailsContainer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingVertical: 20,
  },
  detailText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#26235C',
    backgroundColor: '#FFBE69',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 7,
  },
  line: {
    borderRadius: 5,
    marginVertical: 10,
    height: 2,
    backgroundColor: '#FFBE69',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  ddContainer: {
    width: '85%',
    height: 35,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 35,
    marginHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFBE69',
  },
  ddList: {
    elevation: 5,
    marginTop: 5,
    height: 150,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 25,
    height: 39,
    backgroundColor: '#ffffff',
  },
  msgInput: {
    borderRadius: 5,
    margin: 10,
    height: 155,
    backgroundColor: '#ffffff',
  },
  button: {
    // width: '93%',
    borderRadius: 5,
    marginHorizontal: 25,
    height: 39,
    backgroundColor: '#FFBE69',
    marginVertical: 30,
  },
  btnText: {
    color: '#26235C',
    paddingTop: 9,
    paddingBottom: 7,
    fontWeight: '900',
    fontSize: 12.74,
    textAlign: 'center',
  },
});

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import axios from 'axios';
// import { AdvertiseModel } from '../../Model/AdvertiseModel';

// const AdvertiseForm = () => {

//     const [formData, setFormData] = useState<AdvertiseModel>({
//       firstName: '',
//       lastName: '',
//       contactNo: 0,
//       email: '',
//       categories_Name: '',
//       city_Name: '',
//       createdAt: new Date(),
//     });
  
//     const handleChange = (key: string, value: any) => {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [key]: value,
//       }));
//     };
  
//     const handleSubmit = async () => {
//       console.log(formData);
//     };
  
//     return (
//             <View>
//       <Text>First Name:</Text>
//       <TextInput
//         onChangeText={(text) => handleChange('firstName', text)}
//         value={formData.firstName}
//       />
//       <Text>Last Name:</Text>
//       <TextInput
//         onChangeText={(text) => handleChange('lastName', text)}
//         value={formData.lastName}
//       />
//       <Text>Contact No:</Text>
//       <TextInput
//         onChangeText={(text) => handleChange('contactNo', parseInt(text))}
//         value={formData.contactNo.toString()}
//         keyboardType='numeric'
//       />
//       <Text>Email:</Text>
//       <TextInput
//         onChangeText={(text) => handleChange('email', text)}
//         value={formData.email}
//         keyboardType='email-address'
//       />
//       <Text>Categories Name:</Text>
//       <TextInput
//         onChangeText={(text) => handleChange('categories_Name', text)}
//         value={formData.categories_Name}
//       />
//       <Text>City Name:</Text>
//       <TextInput
//         onChangeText={(text) => handleChange('city_Name', text)}
//         value={formData.city_Name}
//       />
//       <Button title='Submit' onPress={handleSubmit} />
//     </View>
//     );
//   };
  
//   export default AdvertiseForm;