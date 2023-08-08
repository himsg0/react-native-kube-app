import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Text from '../../components/MyText';
import TextInput from '../../components/MyTextInput';
import {height, width} from '../../assets/ImageVariables';
import firestore from '@react-native-firebase/firestore';

const Search = props => {
  const collectionRef = firestore().collection('stores');

  const [searchTxt, setSearchTxt] = useState('');
  const [vendorArr, setVendorArr] = useState([]);

  const getCollectionData = async SearchText => {
    try {
      console.log(SearchText, 'search text');
      const querySnapshot = await collectionRef
        .where('isCoinVendor', '==', 'yes')
        .where('storeName', '>=', SearchText)
        .where('storeName', '<=', SearchText + '\uf8ff')
        .get();
      const collectionData = [];
      querySnapshot.forEach(documentSnapshot => {
        console.log('HH', documentSnapshot.data(), SearchText);
        collectionData.push(documentSnapshot.data());
        SearchText.length == 0
          ? setVendorArr([])
          : setVendorArr(collectionData);
      });
      console.log("collection Data", collectionData)
      return collectionData;
    } catch (error) {
      console.log('Error getting collection data: ', error);
      return [];
    }
  };

  console

  const renderVendorList = (item, index) => {
    return (
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 5,
        }}>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('VendorPage', {
                storeData: item,
              })
            }
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'blue',
              }}>
              {item?.storeName}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 0.7,
              width: width - 20,
              alignSelf: 'center',
              backgroundColor: '#000',
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
        }}>
        <TextInput
          placeholder="Search store name..."
          autoFocus={true}
          onChangeText={txt => {
            setSearchTxt(txt);
            getCollectionData(txt);
            // dispatch(SearchA({keyword: txt}));
          }}
          style={{
            fontSize: 20,
          }}
        />
        <View
          style={{
            height: 1.5,
            width: width - 20,
            alignSelf: 'center',
            backgroundColor: '#000',
          }}
        />
      </View>

      <View>
        <FlatList
          data={vendorArr}
          style={{
            height: height / 2,
            marginTop: 20,
          }}
          renderItem={({item, index}) => renderVendorList(item, index)}
        />
      </View>
    </View>
  );
};
export default Search;
