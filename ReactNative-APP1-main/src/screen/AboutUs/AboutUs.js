/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  // Text,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Image as ConstImg} from '../../assets/ImageVariables';
import Text from '../../components/MyText';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {height, Image as Images, width} from '../../assets/ImageVariables';

const AboutUs = props => {
  const TeamData = [
    {
      id: '1',
      image: require('./../../assets/images/Teamimg/3.jpg'),
      name: 'Dinesh Goyal',
    },
    {
      id: '2',
      image: require('./../../assets/images/Teamimg/2.jpg'),
      name: 'Shobhit Goyal',
    },
    {
      id: '3',
      image: require('./../../assets/images/Teamimg/1.png'),
      name: 'Anuj Gupta',
    },
  ];

  const teamData = ({item}) => {
    console.log(item);
    return (
      <View style={{margin: 5}}>
        <View
          style={{
            padding: 1,
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 7,
            // height: 149,
          }}>
          <Image
            style={{width: 97, height: 120, borderRadius: 7}}
            source={item.image}
          />
          <Text
            style={{
              fontSize: 12,
              color: '#26235C',
              fontWeight: '400',
              textAlign: 'center',
              paddingTop: 7,
            }}>
            Mr {item.name}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: 'black',
      }}>
      <View
        style={{
          backgroundColor: '#dfdfdf',
          padding: 15,
          // marginTop: -30,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          flexDirection: 'row',
          zIndex: 2,
        }}>
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
            marginLeft: 15,
          }}>
          About Us
        </Text>
      </View>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('./KubeBan.png')}
            style={{
              width: width,
              marginTop: -5,
              height: height / 5,
              zIndex: 1,
              marginBottom: 20,
            }}
          />
        </View>
        <View
          style={{
            margin: 10,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
              // height: 280,
            }}>
            <View
              style={{backgroundColor: '#FFBE69', height: 2, width: '40%'}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 22, color: 'white'}}>
              Our Story
            </Text>
            <Text style={{fontWeight: '400', fontSize: 11, color: 'white'}}>
              Why we started it?
            </Text>
          </View>
          <View
            style={{
              width: '60%',
              // height: 280,
            }}>
            <Text style={{fontWeight: '400', fontSize: 13, color: 'white'}}>
              Kube City is an online informative marketplace that provides
              information about your daily needs and services in your
              neighbourhood. The platform is designed to simplify your life by
              connecting you with local businesses, services, and vendors in
              your area. {'\n'}Introducing Kube Coin -  It is a unique rewards
              system that lets you save money on your everyday purchases. With
              Kube Coin, you can get savings on your original generated bill,
              making it easier to save money on the things you need. When you
              sign up for the Kube App, you will receive 1000 coins worth 1000
              rupees automatically credited to your Kube account, giving you a
              head start on your savings journey.
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image
            style={{width: width * 0.9, height: height / 6}}
            source={require('./kubepeople.png')}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 13}}>
          <View style={{flex: 1, height: 2, backgroundColor: '#FFBE69'}} />
          <View style={{flex: 1, height: 2, backgroundColor: '#FFBE69'}} />
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 35,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '32%',
              height: 60,
              margin: 5,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              1.14 Lakhs
            </Text>
            <Text style={{fontSize: 10, color: 'white'}}>Website Traffic</Text>
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{fontSize: 8.5, color: 'white'}}>
                Our website successfully reached a significant number of 1.14
                lakh users.
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '32%',
              height: 60,
              margin: 5,
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              39 Lakhs
            </Text>
            <Text style={{fontSize: 10, color: 'white'}}>Facebook Reach</Text>
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{fontSize: 8.5, color: 'white'}}>
                Our Facebook page's content was viewed by a staggering 39 lakh
                people.
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '32%',
              height: 60,
              margin: 5,
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              18.3 Lakhs
            </Text>
            <Text style={{fontSize: 10, color: 'white'}}>Instagram Reach</Text>
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{fontSize: 8.5, color: 'white'}}>
                Our Instagram account's posts and stories reached an impressive
                audience of 18.3 lacks.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 35,
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '32%',
              height: 60,
              margin: 5,
              alignItems: 'center',
              // justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              1.5 Lakhs
            </Text>
            <Text style={{fontSize: 10, color: 'white'}}>YouTube Views</Text>
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{fontSize: 8.5, color: 'white'}}>
                Our YouTube channel's videos were viewed over 1.5 lakh times.
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '32%',
              height: 60,
              margin: 5,
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              17.5 Lakhs
            </Text>
            <Text style={{fontSize: 10, color: 'white'}}>
              Promotional calls
            </Text>
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{fontSize: 8.5, color: 'white'}}>
                We made 17.5 lakh promotional calls to potential customers.
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '32%',
              height: 60,
              margin: 5,
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>
              13 Lakhs
            </Text>
            <Text style={{fontSize: 10, color: 'white'}}>
              Promotional Messages
            </Text>
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{fontSize: 8.5, color: 'white'}}>
                We sent out 13 lakh promotional messages to people interested in
                our products or services
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#3f3f3f',
            alignItems: 'center',
            marginTop: 24,
            width: '100%',
            height: 250,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: 22.5,
              marginTop: 7,
            }}>
            The Amazing Team Of Us
          </Text>
          <Text
            style={{
              color: 'white',
            }}>
            Meet our exceptional team members.
          </Text>
          <View>
            <FlatList
              data={TeamData}
              contentContainerStyle={{padding: 1}}
              columnWrapperStyle={{
                padding: 0,
              }}
              renderItem={teamData}
              numColumns={3}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              margin: 20,
              zIndex: 2,
              borderRadius: 10,
              marginBottom: 90,
              backgroundColor: '#3F3F3F',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'white',
                marginLeft: 7,
                marginTop: 14,
              }}>
              Location & Contact
            </Text>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 28.5769,
                longitude: 77.3172,
                latitudeDelta: 0.00348,
                longitudeDelta: 0.00315,
              }}>
              <Marker
                coordinate={{latitude: 28.57692, longitude: 77.31717}}
                title={'World Trade Tower'}
                description={'712,7th Floor'}
              />
            </MapView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 10,
              }}>
              <View>
                <Image
                  style={{width: 15, height: 21}}
                  source={require('../StoreList/location.png')}
                />
              </View>
              <View style={{marginLeft: 10, width: '80%'}}>
                <Text style={{fontSize: 10.74, color: 'white'}}>
                  World Trade Tower , Sector 16 , Noida {'('}201301{')'} Uttar
                  Pradesh
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{marginLeft: 5}}
                  onPress={() => {
                    Linking.openURL(`geo:${28.5769},${77.3172}`);
                  }}>
                  <Image
                    style={{width: 21.8, height: 21.8}}
                    source={require('./locatio.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${9560191189}`);
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 4,
                  marginLeft: 10,
                }}>
                <Image
                  style={{width: 18, height: 18, marginBottom: 10}}
                  source={require('../StoreList/call.png')}
                />
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 10.74, color: 'white', width: 280}}>
                    9560191189
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={{width: width, height: 500, zIndex: 1, marginTop: -230}}
          source={require('../Advertise/ad.png')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 250,
  },
});

export default AboutUs;
