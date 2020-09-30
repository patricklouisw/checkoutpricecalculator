import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../Colors';
import {AntDesign} from "@expo/vector-icons";

const TableHeader = () => {
    return (
        <View style={styles.itemContainer}>
            <View style={[{width: 160, borderTopLeftRadius: 10}, styles.item]}>
                <Text  style={styles.text}>Item Name</Text>
            </View>
            <View style={[{width: 60}, styles.item]}>
                <Text  style={styles.text}>Price</Text>
            </View>
            <View style={[{width: 60}, styles.item]}>
                <Text  style={styles.text}>Quantity</Text>
            </View>
            <View style={[{width: 60, borderTopRightRadius: 10}, styles.item]}>
                <Text style={styles.text}>Total</Text>
            </View>
        </View>
    );
}

export default TableHeader;

const styles = StyleSheet.create({
    text: {
        textAlign:"center", 
        color: colors.white,
        fontSize: 15
    },
    itemContainer:{
        flexDirection: "row",
        width: 400,
        alignItems:"center",
        marginBottom: 5,
        justifyContent: "flex-start"
    },
    item:{
        paddingVertical: 15,
        marginHorizontal:2,
        alignItems: "center",
        backgroundColor: colors.dark
    },
    delete: {
        backgroundColor: "red",
        paddingVertical: 8,
        paddingHorizontal: 8,
        position: "absolute",
        right: 5,
        borderRadius: 10
        
    }
});