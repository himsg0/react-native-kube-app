import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
  Linking,
} from 'react-native';

export default props => (
  <>
    <TextInput {...props} style={[props.style]}>
      {props.children}
    </TextInput>
  </>
);
