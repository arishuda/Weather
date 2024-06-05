import React from "react"
import { TextInput, StyleSheet, View } from "react-native"

const CustomTextInput = ({
    text,
    onChange,
    multiline = false,
    placeholder,
    numberOfLines,
}) => (
    <view style={styles.container}>
        <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        defaultValue={text}
        />
    </view>
)

const styles = StyleSheet.create({
    input : {
        borderWidth: 2,
        borderColor: '#DDDDDD',
        padding: 10,
    },
    container: {
        marginTop: 20,
    },
})

export default CustomTextInput