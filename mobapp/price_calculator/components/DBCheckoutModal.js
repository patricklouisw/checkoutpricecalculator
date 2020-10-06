import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import colors from "../Colors";

export default class DBCheckOutModal extends React.Component {

    render() {
        return (
            <View style={styles.container} behavior="padding">
                <TouchableOpacity style={{position:"absolute", top: 64, right:32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf: "stretch", marginHorizontal:32}}>
                    {/* <Text style={styles.title}>Your Total Purchase is <Text style={{color:colors.blue, fontSize:40}}>${this.props.totalPrice}</Text></Text> */}
                    <Text style={styles.title}>Do you want to proceed with your purchase?</Text>
                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: colors.red}]}
                        onPress={this.props.closeModal}
                    >
                        <Text style={{color:colors.white, fontWeight: "bold", fontSize:20}}>Let me see the cart again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: colors.green}]}
                        onPress={this.props.dbCheckout}
                    >
                        <Text style={{color:colors.white, fontWeight: "bold", fontSize:20}}>I am ready!</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16,
        textAlign:"center"
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect:{
        width: 30,
        height: 30,
        borderRadius: 4
    }
});