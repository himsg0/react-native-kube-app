import React, {useEffect, useState} from 'react';
import {
  View,
  // Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Text from '../../components/MyText';
import {connect, useDispatch, useSelector} from 'react-redux';
import {height, Image as Images, width} from '../../assets/ImageVariables';
import moment from 'moment';
import {getUsers} from '../../Services/UserServices';
import {
  getTransaction,
  getTransactionId,
} from '../../Services/TransactionServices';

const Transaction = props => {
  const [getTransac, setTransac] = useState();
  const [userData, setUserData] = useState();
  const [transactionList, setTransactionList] = useState([]);
  const [count, setCount] = useState(0);
  const tPages = Math.ceil(transactionList.length / 10);
  const [pageArray, setPageArray] = useState([]);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    userData?.uniqueId &&
      getTransaction(userData?.uniqueId).then(val => {
        setTransac(val);
      });
    getTransactionId();
  }, [userData?.phoneNo]);

  // console.log(getTransac)

  React.useEffect(() => {
    getUsers(props?.authUser?.user?.phoneNo).then(res => {
      console.log('sbhssh', res[0]);
      setUserData(res[0]);
    });
  }, [props.authUser]);

  useEffect(() => {
    var i = 0;
    var pageArr = [];
    while (i <= tPages) {
      pageArr.push(i);
      i++;
    }
    setPageArray(pageArr);
  }, [count, transactionList]);

  useEffect(() => {
    let list = [];
    pageArray.map((item, key) => {
      if (item == count) {
        const init = item * 10;
        const end = init + 10;
        list = transactionList.slice(init, end);
      }
    });
    setNewList(list);
  }, [count, transactionList]);

  console.log('slslslsl', pageArray);

  useEffect(() => {
    const transac = getTransac;
    // console.log('seee', transac);
    transac != undefined && setTransactionList(transac);
  }, [getTransac]);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('./../../assets/images/ad.png')}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
          }}>
          <View
            style={{
              backgroundColor: '#E7E7E7',
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
              <TouchableOpacity
                style={{width: 20, height: 20}}
                onPress={() => props.navigation.goBack()}>
                <Image source={Images.backArrow} />
              </TouchableOpacity>

              {/* Coin section */}
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.coin}
                  style={{
                    height: 28,
                    width: 28,
                  }}
                />

                <Text style={{color: '#26235C'}}>
                  {userData?.kubeCoin == undefined ? 0 : userData?.kubeCoin}{' '}
                  Coins
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                color: '#26235C',
                fontSize: 23,
                fontWeight: '800',
              }}>
              Previous Transaction
            </Text>
          </View>
        </View>

        <ScrollView
          style={{
            flexGrow: 1,
            marginTop: 30,
          }}>
          <View
            style={{
              backgroundColor: '#3F3F3F',
              padding: 15,
              borderRadius: 15,
              paddingHorizontal: 14,
            }}>
            {transactionList?.length == 0 && (
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 40,
                }}>
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  No record to show
                </Text>
              </View>
            )}
            {newList?.map((item, index) => {
              const createdAt = item?.createdAt.toDate();
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 10,
                    marginVertical: 4,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 45,
                        width: 45,
                        backgroundColor: '#26235C',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100,
                        marginRight: 5,
                      }}>
                      <Image
                        style={{width: 20, height: 35}}
                        source={require('./user.png')}
                      />
                    </View>

                    <View>
                      {item.creditUser == userData?.phoneNo ? (
                        <>
                          <Text
                            style={{
                              color: '#26235C',
                              fontWeight: '800',
                            }}>
                            Received from {item?.debitUserName}
                          </Text>
                          <Text
                            style={{
                              color: '#000',
                            }}>
                            {(moment().add(-1, 'days').format('DD MM YYYY') ==
                            moment(createdAt).format('DD MM YYYY')
                              ? 'Yesterday'
                              : moment(createdAt).format('DD MM YYYY')) +
                              ', ' +
                              moment(createdAt).format('hh:mm a')}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text
                            style={{
                              color: '#26235C',
                              fontWeight: '800',
                            }}>
                            Paid to{' '}
                            {item?.creditUserName == undefined
                              ? item?.debitUser
                              : item?.creditUserName}
                          </Text>
                          <Text
                            style={{
                              color: '#000',
                            }}>
                            {(moment().add(-1, 'days').format('DD MM YYYY') ==
                            moment(createdAt).format('DD MM YYYY')
                              ? 'Yesterday'
                              : moment(createdAt).format('DD MM YYYY')) +
                              ', ' +
                              moment(createdAt).format('hh:mm a')}
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                  {item.creditUser == userData?.phoneNo ? (
                    <View>
                      <Text
                        style={{
                          color: '#26235C',
                          fontWeight: '800',
                          textAlign: 'right',
                        }}>
                        +{item?.kubeCoin}
                      </Text>
                      <Text
                        style={{
                          color: '#26235C',
                        }}>
                        Received
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          color: '#26235C',
                          fontWeight: '800',
                          textAlign: 'right',
                        }}>
                        -{item?.kubeCoin}
                      </Text>
                      <Text
                        style={{
                          color: '#26235C',
                        }}>
                        Sent
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          <View
            style={{
              marginVertical: 20,
              width: width,
              height: height * 0.1,
              backgroundColor: '#3f3f3f',
              borderRadius: 15,
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: width / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  count > 0 ? setCount(count - 1) : null;
                  console.log(count);
                }}
                style={{
                  backgroundColor: 'white',
                  width: width / 2.25,
                  height: height * 0.07,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Previous</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: width / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  count < tPages - 1 ? setCount(count + 1) : null;
                  console.log(count);
                }}
                style={{
                  backgroundColor: 'white',
                  width: width / 2.25,
                  height: height * 0.07,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default connect(({AuthUserR}) => ({
  authUser: AuthUserR.user,
}))(Transaction);
