import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import Text from '../../components/MyText';
import {ScrollView} from 'react-native-gesture-handler';

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
              height: 400,
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
              Categories
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

const BlogModal = ({data, category, setCategory}) => {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [clicked, setClicked] = useState(false);

  const CatView = ({item, index}) => {
    return (
      <ScrollView>
        <View
          style={{
            height: 40,
            width: 200,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setSelectedIndex(index === selectedIndex ? null : index);
              setCategory(item);
            }}>
            <Text style={{color: 'white'}}>{item}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
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
            height: 300,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              alignItems: 'center',
            }}
            onPress={() => {
              setVisible(false);
              setSelectedIndex(null);
              setCategory(null);
            }}>
            <Text style={{color: 'white'}}>All</Text>
          </TouchableOpacity>
          <FlatList data={data} renderItem={CatView} />
        </View>
      </ModalPoup>

      <View>
        <TouchableOpacity
          style={{display: 'flex', flexDirection: 'row'}}
          onPress={() => {
            setClicked(!clicked);
            setVisible(true);
          }}>
          <Text style={{color: 'white', marginLeft: 4}}>
            {category ? category : 'Sort by Category'}
          </Text>
          <Image
            style={{width: 9, height: 5, marginTop: 8, marginLeft: 3}}
            source={require('./ddicon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogModal;
