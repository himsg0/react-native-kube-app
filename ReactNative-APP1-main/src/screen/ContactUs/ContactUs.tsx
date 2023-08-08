import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
} from 'react-native';

// import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ContactUsModel} from '../../Model/contactUsModel';
import {setContact} from '../../Services/ContactUsServices';

const ContactUs = props => {
  const [contact, setContactData] = useState<ContactUsModel>({
    firstName: '',
    phoneNo: 0,
    email: '',
    message: '',
  });

  const handleInput = (feild, value) => {
    setContactData({
      ...contact,
      [feild]: value,
    });
  };


  


  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          backgroundColor: '#dfdfdf',
          padding: 15,
          borderBottomEndRadius: 7,
          flexDirection: 'row',
        }}>
        {/* <View></View> */}
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
            marginLeft: 20,
          }}>
          Contact Us
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.contactForm}>
            <View>
              <View>
                <TextInput
                  placeholder="Your Name"
                  style={styles.input}
                  onChangeText={val => handleInput("firstName",val)}
                />
              </View>
            </View>
            <View>
              <View>
                <TextInput
                  placeholder="Your Phone"
                  style={styles.input}
                  onChangeText={val => handleInput("phoneNo",val)}
                />
              </View>
              <View>
                <TextInput
                  placeholder="Your E-mail"
                  style={styles.input}
                  onChangeText={val => handleInput("email",val)}
                />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Your Message"
                style={styles.msgInput}
                onChangeText={val => handleInput("message",val)}
              />
            </View>
            <TouchableOpacity onPress={() => setContact(contact)}>
              <View style={styles.button}>
                <Text style={styles.btnText}>Send Message</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Image
            style={{width: width, height: 450, zIndex: 1, marginTop: -100}}
            source={require('./../../assets/images/ad.png')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    // height: height,
    // flex: 0.5,
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
    zIndex: 2,
  },

  input: {
    borderRadius: 5,
    margin: 10,
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
    width: '93%',
    borderRadius: 5,
    marginHorizontal: '3.5%',
    height: 39,
    backgroundColor: '#FFBE69',
    marginVertical: 20,
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
