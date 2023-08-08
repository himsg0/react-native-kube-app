import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Modal,
  Image,
  // Text,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native';
import Text from '../../components/MyText'
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';

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
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
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
                style={{width: 15, height: 15,marginTop: 5, marginLeft: 40}}
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

const StoreModal = ({data, category, setCategory, setSubCategory}) => {

  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [subCat, setSubCat] = useState();
  const [Scategory, setSCategory] = useState();

  //cards view of categories & dropdown list of subCategories
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
              setCategory(item.categoryName);
              setSubCategory("");
              //   setSCategory(item.subcat_Name);
            }}>
            <Text style={{color: 'white'}}>{item.categoryName}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  //   console.log(category, 'selected');
  return (
    <View>
      {/* {console.log(selectedIndex, 'hdhd')} */}
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
              setCategory("");
              setSubCategory("");

              //   setSCategory(item.subcat_Name);
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
            // setSubCat(item.sub_cat);
            //
          }}>
          <Text style={{color: 'white', marginLeft: 4}}>
            {category ? category : 'Category'}
          </Text>
          <Image
            style={{width: 9, height: 5, marginTop: 8, marginLeft: 3}}
            source={require('./ddicon.png')}
          />
        </TouchableOpacity>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          columnWrapperStyle={styles.categorieslList}
          renderItem={listItemView}
          numColumns={3}
        /> */}
      </View>
    </View>
  );
};

export default StoreModal;
