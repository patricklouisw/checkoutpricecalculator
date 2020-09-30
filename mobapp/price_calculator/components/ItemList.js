import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../Colors';
import {AntDesign} from "@expo/vector-icons";

const ItemList = ({list}) => {
    const total = list.price * list.quantity;

    return (
        <View style={styles.itemContainer}>
            <View style={[{width: 160, backgroundColor: colors.white}, styles.item]}>
                <Text>{list.name}</Text>
            </View>
            <View style={[{width: 60, backgroundColor: colors.lightGrey}, styles.item]}>
                <Text>$ {list.price}</Text>
            </View>
            <View style={[{width: 60, backgroundColor: colors.lightGrey}, styles.item]}>
                <Text>{list.quantity}</Text>
            </View>
            <View style={[{width: 60, backgroundColor: colors.lightGrey}, styles.item]}>
                <Text>$ {total}</Text>
            </View>
            <TouchableOpacity style={styles.delete}>
                <AntDesign name="close" size={20} color={colors.white} />
            </TouchableOpacity>    
        </View>
    );
}

export default ItemList;

const styles = StyleSheet.create({
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
        borderRadius: 10
    },
    delete: {
        backgroundColor: "red",
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginLeft: 4,
        // position: "absolute",
        // right: 5,
        borderRadius: 10
        
    }
});