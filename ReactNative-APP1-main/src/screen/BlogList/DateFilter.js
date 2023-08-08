import React, {useEffect, useState, useRef} from 'react';
import {View, Modal, Image, TouchableOpacity, Animated} from 'react-native';
import Text from '../../components/MyText';

const ModalPoup = ({visible, children, setVisible, label}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
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
    <Modal transparent animationType="fade" visible={showModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            {
              backgroundColor: '#3f3f3f',
              marginTop: -20,
              padding: 10,
              width: 260,
              borderRadius: 7,
              alignItems: 'center',
              justifyContent: 'center',
            },
            {transform: [{scale: scaleValue}]},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                color: '#f1f1f1',
                marginLeft: 50,
              }}>
              Sort by Date
            </Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                style={{width: 15, height: 15, marginTop: 5, marginLeft: 40}}
                source={require('./close.png')}
              />
            </TouchableOpacity>
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const DateModal = ({category, setDateFilterData}) => {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <View>
      <ModalPoup
        visible={visible}
        setVisible={setVisible}
        hideModal={() => {
          setVisible(false);
        }}>
        <View
          style={{
            marginTop: 40,
            width: 200,
            height: 100,
            alignItems: 'center',
          }}>
          <View style={{padding: 10}}>
            <TouchableOpacity
              onPress={() => {
                setDateFilterData('Oldest');
                setVisible(false);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: 12,
                  fontSize: 15,
                }}>
                Older To Newer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDateFilterData('Latest');
                setVisible(false);
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  marginVertical: 12,
                  fontSize: 15,
                }}>
                Newer To Older
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPoup>

      <View>
        <TouchableOpacity
          style={{display: 'flex', flexDirection: 'row'}}
          onPress={() => {
            setClicked(!clicked);
            setVisible(true);
          }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: '#3f3f3f',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: 26, height: 26}}
              source={require('./Planner.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateModal;
