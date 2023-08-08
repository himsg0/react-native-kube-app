import React from "react";


import { Image, TextInput, View } from "react-native";
import Text from '../../components/MyText'
import styles from "./Style";

const CustomInput = ({
    iconPath,
    placeholder = '',
    style = {},
    value,
    onChangeText,
    isNumeric = false,
    textStyle,
    maxLength=120,
    errorText='',
}) => {
    return (
        <View>
            <View style={[styles.container, style]}>
            <Image
                source={iconPath}
                style={styles.firstIconStyle}
            />

            <Image
                source={require('./../../assets/images/Line.png')}
                style={styles.inputIcon}
            />

            <TextInput
                style={[{ flex: 1, }, textStyle]}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChangeText={onChangeText}
                keyboardType={isNumeric ? 'number-pad' : 'ascii-capable'}
            />
        </View>
        <Text style={{
            color:'red',
            marginHorizontal:10,
        }}>{errorText}</Text>
        </View>
    )
}

export default CustomInput;