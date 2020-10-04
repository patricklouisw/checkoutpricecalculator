import React from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import colors from "../Colors";
import tempData from "../TempData";

export default class AddListModal extends React.Component {
    
    state = {
        name: "",
        price: 0,
        quantity: 1
    }

    createItem = () => {
        const id = this.props.next_id;
        const name = this.state.name;
        const price = Math.round((Number.EPSILON + this.state.price) * 100) / 100
        const quantity = this.state.quantity;
        
        tempData.push({
            id,
            name,
            price,
            quantity
        });

        const total = this.state.price * this.state.quantity;

        this.setState({name: "", price: 0, quantity: 0});
        this.props.onSuccess(total);
        this.props.closeModal();
    }

    render() {
        return (
            <View style={styles.container} behavior="padding">
                <TouchableOpacity style={{position:"absolute", top: 64, right:32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf: "stretch", marginHorizontal:32}}>
                    <Text style={styles.title}>Add Item</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Item Name" 
                        onChangeText={text => this.setState({name: text})} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Price" 
                        keyboardType = 'numeric'
                        onChangeText={text => this.setState({price: Math.floor(text)})} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Quantity" 
                        keyboardType = 'numeric'
                        onChangeText={text => this.setState({quantity: Math.floor(text)})} 
                    />
                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: colors.green}]}
                        onPress={this.createItem}
                    >
                        <Text style={{color:colors.white, fontWeight: "bold"}}>Add Item</Text>
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
        marginBottom: 16
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