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
import Text from '../../components/MyText';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import {width} from '../../assets/ImageVariables';

const ModalPoup = ({visible, children, setVisible}) => {
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
              Sub Categories
            </Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                style={{width: 20, height: 20, marginLeft: 40}}
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

const SubCat = props => {
  // console.log(props);
  const data = props.data;
  // console.log(data, 'sadjfhgskldfgaiu');
  // console.log();

  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [subCat, setSubCat] = useState([]);
  const [category, setCategory] = useState();
  const [Scategory, setSCategory] = useState();


  var i = 0;

  useEffect(() => {
    Scategory &&
      props.nav.navigate('StoreList', {
        category: category,
        subCategory: Scategory,
      });
  }, [Scategory]);
  const listItemView = ({item, index}) => {
    return (
      <View style={{backgroundColor: 'black'}}>
        <TouchableOpacity
          onPress={() => {
            setSelectedIndex(index === selectedIndex ? null : index);
            setClicked(!clicked);
            setVisible(true);
            setSubCat(item.subCategories);
            setCategory(item.categoryName);
          }}>
          <View
            style={{
              ...styles.categoriesCardContainer,
              marginTop: 20,
            }}>
            <Image
              style={styles.categoriesImage}
              source={{uri: item.appUrl}}
              resizeMode="cover"
            />
            <Text style={styles.categoriesText}>{item.categoryName}</Text>
          </View>
        </TouchableOpacity>
        {data?.length - 1 == index && (
          <>
            {/* <View
              style={{
                height: 150,
              }}></View> */}
          </>
        )}
      </View>
    );
  };

  const subCatView = ({item}) => {
    console.log(item)
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
              setSCategory(item.subCategoryName);
              // props.nav.navigate('StoreList', {
              //   category: category,
              //   subCategory: item.subcat_Name,
              // });
            }}>
            <Text style={{color: 'white'}}>{item.subCategoryName}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
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
            <FlatList data={subCat} renderItem={subCatView} />
          </View>
        </ModalPoup>

        <View style={{zIndex: 2}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            columnWrapperStyle={styles.categorieslList}
            renderItem={listItemView}
            numColumns={3}
          />
        </View>
        <Image
          source={require('../Advertise/ad.png')}
          style={{
            width: width,
            height: 550,
            zIndex: 1,
            marginTop: -240,
            marginBottom: 40,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default SubCat;
