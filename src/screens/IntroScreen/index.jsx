import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const IntroScreen = ({navigation}) =>{
    return <View>
        <Text>Intro Screen here </Text>
        <TouchableOpacity onPress={()=> navigation.navigate("CallScreen")} style={styles.buttonStyle} >
            <Text style={styles.buttonText} >
                Join Call
            </Text>
        </TouchableOpacity>
    </View>
}
export default IntroScreen

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:"blue",
        marginTop:50,
        width:"50%",
        alignSelf:"center",
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:20
    },
    buttonText:{
        color:"white",
        textAlign:"center"
    }
})