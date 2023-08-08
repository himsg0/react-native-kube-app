import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  // Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Text from '../../components/MyText';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {SetCityA} from '../../redux/Action/SetCityA';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {height, width} from '../../assets/ImageVariables';
import Localities from "../../core/config/Localities.json"

const City = props => {
  const dispatch = useDispatch();

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [Locality, setLocality] = useState();
  const [Clicked, setClicked] = useState(false);

  const getLocalities = () => {
    for (let index = 0; index < Localities.Localities.length; index++) {
      const city = Object.keys(Localities.Localities[index])[0];
      if(city == selectedCity){
        setLocality(Localities.Localities[index][city]); // Get the localities of the selected city
        break;
      }
    }
  }

  useEffect(() => {
    dispatch(
      SetCityA({
        city: selectedCity,
        Locality: selectedLocality,
      }),
    );
    if (selectedLocality != undefined) {
      props.navigation.navigate('BTNav');
    }
    storeLData();
  }, [selectedLocality]);

  useEffect(() => {
    getLocalities()
    // getDataapi();
    setSelectedLocality(null);
    storeCData();
  }, [selectedCity]);

  const storeCData = () => {
    if (selectedCity != undefined) {
      AsyncStorage.setItem('Cdata', selectedCity);
    }
  };

  const storeLData = () => {
    if (selectedLocality != undefined) {
      AsyncStorage.setItem('Ldata', selectedLocality);
    }
  };

  return (
    <ImageBackground
      source={require('./ad.png')}
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              marginTop: 40,
              marginBottom: 10,
              fontSize: 26,
              fontWeight: '900',
            }}>
            Pick A City
          </Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              width: width * 0.9,
              backgroundColor: '#3f3f3f',
              marginVertical: 35,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{marginVertical: 20, marginTop: 30}}
              onPress={() => {
                setSelectedCity('Noida');
                setClicked(true);
              }}>
              {selectedCity == 'Noida' ? (
                <Image
                  source={require('./NoidaG.png')}
                  style={{width: 87, height: 30}}
                />
              ) : (
                <Image
                  source={require('./Noida.png')}
                  style={{width: 87, height: 39}}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                height: 3,
                width: 270,
                backgroundColor: '#FFBE69',
                borderRadius: 7,
                // marginTop: 13,
              }}></View>
            <TouchableOpacity
              style={{marginVertical: 20, marginBottom: 30}}
              onPress={() => {
                setSelectedCity('Greater Noida');
                setClicked(true);
              }}>
              {selectedCity == 'Greater Noida' ? (
                <Image
                  source={require('./GrNoidaG.png')}
                  style={{width: 90, height: 63}}
                />
              ) : (
                <Image
                  source={require('./GrNoida.png')}
                  style={{width: 90, height: 63}}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                height: 3,
                width: 270,
                backgroundColor: '#FFBE69',
                borderRadius: 7,
                marginTop: -23,
              }}></View>

            <TouchableOpacity
              style={{marginVertical: 25}}
              onPress={() => {
                setSelectedCity('Ghaziabad');
                setClicked(true);
              }}>
              {selectedCity == 'Ghaziabad' ? (
                <Image
                  source={require('./GhaziG.png')}
                  style={{
                    width: 120,
                    height: 30,
                  }}
                />
              ) : (
                <Image
                  source={require('./Ghazi.png')}
                  style={{
                    width: 120,
                    height: 30,
                  }}
                />
              )}
            </TouchableOpacity>
            {/* <View
                style={{
                  height: 70,
                  width: 3,
                  backgroundColor: '#FFBE69',
                  borderRadius: 7,
                  marginTop: 13,
                }}></View> */}
            {/* <TouchableOpacity
                onPress={() => {
                  setSelectedCity('Bareily');
                }}>
                {selectedCity == 'Bareily' ? (
                  <Image
                    source={require('./BareilyG.png')}
                    style={{width: 90, height: 30, margin: 27}}
                  />
                ) : (
                  <Image
                    source={require('./Bareily.png')}
                    style={{width: 90, height: 30, margin: 27}}
                  />
                )}
              </TouchableOpacity> */}
          </View>
          {Clicked === true ? (
            <View>
              <View
                style={{
                  height: 3,
                  width: width * 0.9,
                  backgroundColor: '#FFBE69',
                  borderRadius: 7,
                  // marginTop: -23,
                }}></View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: 20,
                    marginBottom: 10,
                    fontSize: 26,
                    fontWeight: '900',
                  }}>
                  Locality
                </Text>
              </View>
              <View
                style={{
                  width: width * 0.9,
                  height: height * 0.3,
                  backgroundColor: '#3f3f3f',
                  borderRadius: 9,
                }}>
                <ScrollView nestedScrollEnabled>
                  <TouchableOpacity
                    onPress={() => {
                      setClicked(!Clicked);
                      setSelectedLocality('All');
                    }}>
                    <View
                      style={{
                        width: '85%',
                        alignSelf: 'center',
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        borderColor: '#8e8e8e',
                        color: 'white',
                      }}>
                      <Text style={{fontWeight: '600', color: 'white'}}>
                        All
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <FlatList
                    data={Locality}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            alignSelf: 'center',
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 0.5,
                            borderColor: '#8e8e8e',
                            color: 'white',
                          }}
                          onPress={() => {
                            setSelectedLocality(item);
                            setClicked(!Clicked);
                          }}>
                          <Text style={{fontWeight: '600', color: 'white'}}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </ScrollView>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default City;
