import { Pressable, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";

const SubmitButton = ({ onPress, title }) => {

    return (
        <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>        
    );
};

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.darkDreams,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        width: '60%',        
    },
    buttonPressed: {
        backgroundColor: "#C0C0C0",
      },
    text: {
        color: colors.white,
        fontSize: 22
    },
});
