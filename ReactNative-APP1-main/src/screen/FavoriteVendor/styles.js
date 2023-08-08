import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    backgroundColor: '#3f3f3f',
    // marginTop: 50,
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 22.5,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorieslList: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 4,

    //
  },
  categoriesCardContainer: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#3f3f3f',
    borderRadius: 7,
    width: 105,
    height: 185,
  },
  categoriesImage: {
    //
    width: 91,
    height: 135,
    borderRadius: 7,
  },
  categoriesText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 8,
  },
  subCategoriesText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#3f3f3f',
    marginTop: -20,
    padding: 10,
    // width: Dimensions.get('window').width,
    width: 260,
    height: 400,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // paginationContainer: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   zIndex: 2,
  // },
  // paginationBox: {
  //   margin: 10,
  //   paddingHorizontal: 8,
  //   paddingVertical: 14,
  //   borderRadius: 5,
  //   justifyContent: 'center',
  // },

  // paginationText: {
  //   fontSize: 12,
  //   color: 'white',
  //   fontWeight: '600',
  // },

  // paginationDotText: {
  //   fontSize: 40,
  //   marginTop: 8,
  //   color: '#F26669',
  //   fontWeight: '500',
  // },
});
