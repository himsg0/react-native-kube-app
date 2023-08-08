/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  // Text,
  TouchableOpacity,
  Animated,
  // TextInput,
} from 'react-native';
import Text from '../../components/MyText'
import TextInput from '../../components/MyTextInput'
import CustomButton from '../../components/CustomButton';
import { getUsers } from '../../Services/UserServices';

export const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);

  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ModalApp = props => {
  const [visible, setVisible] = React.useState(false);
  const [InputText, setInputText] = React.useState();
  const email = props?.Email && '';
  const phone = props?.Phone;

  // console.log("message",InputText)

  const sendFeed = async () => {
    await axios
      .post(`https://us-central1-kube-dev-13e3f.cloudfunctions.net/app/mail`, {
        email: email,
        phone: phone,
        text: InputText,
      })
      .then(res => {
        console.log('success', res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  //}
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPoup visible={visible}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: '700'}}>
            Feedback
          </Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Image
              style={{width: 20, height: 20, marginLeft: 200}}
              source={require('./close.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <TextInput
            multiline={true}
            onChangeText={(newText) => {
              setInputText(newText);
            }}
            style={{
              textAlignVertical: 'top',
              width: 320,
              height: 180,
              backgroundColor: '#2E2D2D',
              borderRadius: 7,
              color: 'white',
            }}
          />
        </View>
        <View style={{margin: 20}}>
          <CustomButton
            onPress={() => {
              setVisible(false);
              sendFeed();
            }}
            label="Submit"
          />
        </View>
      </ModalPoup>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View
          style={{
            backgroundColor: '#3F3F3F',
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            // marginLeft: -30,
            width: 99,
            height: 119,
          }}>
          <Image
            style={{width: 62, height: 54}}
            source={require('../Profile/ProfileAssets/feed.png')}
          />
          <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
            Feedback
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 342,
    backgroundColor: '#3f3f3f',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 7,
    elevation: 20,
    height: 355,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default ModalApp;
