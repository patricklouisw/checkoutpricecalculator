import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import colors from "../Colors";

export default class DBConnectModal extends React.Component {

    state = {
        ip:""
    }

    updateIP = () =>{
        this.props.updateIP(this.state.ip);
        this.setState({ip: ""});
        this.props.closeModal();
    }

    render() {
        return (
            <View style={styles.container} behavior="padding">
                <TouchableOpacity style={{position:"absolute", top: 64, right:32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{alignSelf: "stretch", marginHorizontal:32}}>
                    <Text style={styles.title}>You are connecting to <Text style={{color:colors.blue, fontSize:40}}>MongoDB Atlas</Text></Text>
                    <Text style={styles.title}>Please follow the instructions below:</Text>
                    <Text>1. In your terminal, go the path with the backend folder</Text>
                    <Text>2. Run "nodemon server.js" in it</Text>
                    <Text>3. In the text input below, type your IP Address</Text>
                    <Text>Note: IP Address is needed to connect with local backend server</Text>

                    <TextInput 
                        style={styles.input} 
                        placeholder="ex: 192.168.0.58" 
                        keyboardType="numeric"
                        onChangeText={text => this.setState({ip: text})} 
                    />

                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: colors.green}]}
                        onPress={this.updateIP}
                    >
                        <Text style={{color:colors.white, fontWeight: "bold", fontSize:20}}>Connect to Cloud!</Text>
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