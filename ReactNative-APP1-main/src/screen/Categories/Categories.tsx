import {
  View,
  // Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Text from '../../components/MyText';
import React, { useState } from 'react';
import { styles } from './styles';
import { height, Image as Images, width } from '../../assets/ImageVariables';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';
import SubCat from './subCategory';
import { getCategories } from '../../Services/CategoriesServices';
import CategoryModel from '../../Model/CategoriesModel';
import { GetCategoriesA } from '../../redux/Action/GetCategoriesA';
import { getUsers } from '../../Services/UserServices';
import UserModel from '../../Model/UserModel';
// import { SetCategoriesR } from '../../redux/Reducer/GetCategoriesR';

function Categories(props) {
  const [categoriesData, setCategoriesData] = useState<CategoryModel[]>([]);

  const [userData, setUserData] = useState<UserModel>()


  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then((res) => {
      setUserData(res[0])
    });
  },[userData]) 


  const dispatch: any = useDispatch();

  React.useEffect(() => {
    getCategories().then(res => {
      if (res != null) {
        dispatch(GetCategoriesA(res));
      }
    });
  }, [])
  

  React.useEffect(() => {
    setCategoriesData(props.categories)
  }, [props.categories])

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: '#e7e7e7',
            padding: 10,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#26235C',
                fontSize: 24,
                fontWeight: 'bold',
                paddingStart: 5,
              }}>
              CATEGORIES
            </Text>

            {/* Coin section */}
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Image
                  source={Images.coin}
                  style={{
                    height: 28,
                    width: 28,
                  }}
                />

                <Text style={{ color: '#26235C' }}>
                  {userData?.kubeCoin == undefined
                    ? 0
                    : userData?.kubeCoin}{' '}
                  Coins
                </Text>
              </View>
            </View>
          </View>
        </View>

        {categoriesData?.length == 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000',
            }}>
            <ActivityIndicator size={'large'} color="#fff" />
          </View>
        ) : (
          <SubCat nav={props.navigation} data={categoriesData} />
        )}
      </View>
    </>
  );
}


export default connect(({ GetCategoryR, AuthUserR }) => ({
  categories: GetCategoryR.category,
  authUser: AuthUserR.user,
}))(Categories);

