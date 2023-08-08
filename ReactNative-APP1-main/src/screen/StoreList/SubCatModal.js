import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetSubCategoriesA} from '../../redux/actions/GetCategoriesA';
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
import { getSubCategories } from '../../Services/CategoriesServices';

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
              SubCategories
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

const SubCatModal = ({data, subCat, setSubCat, allCat}) => {
  const dispatch = useDispatch();

  const [Scategory, setSCategory] = useState();
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (data != undefined) {
      getSubCategories(data).then((res) => {
        res.forEach((val) => {
          setSCategory(val.subCategories);
        })
      })
    }
  }, [data]);


  //cards view of categories & dropdown list of subCategories
  const SubCatView = ({item, index}) => {
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
              setSubCat(item.subCategoryName);
            }}>
            <Text style={{color: 'white'}}>{item.subCategoryName}</Text>
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
              setSubCat("");

              //   setSCategory(item.subcat_Name);
            }}>
            <Text style={{color: 'white'}}>All</Text>
          </TouchableOpacity>
          <FlatList data={Scategory} renderItem={SubCatView} />
        </View>
      </ModalPoup>

      <View>
        <TouchableOpacity
          style={{display: 'flex', flexDirection: 'row'}}
          onPress={() => {
            setClicked(!clicked);
            setVisible(true);
          }}>
          <Text style={{color: 'white', marginLeft: 3}}>
            {subCat ? subCat : 'SubCategory'}
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

export default SubCatModal;
