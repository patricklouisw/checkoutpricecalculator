import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './Colors';
import tempData from './TempData';
import ItemList from './components/ItemList';
import TableHeader from './components/TableHeader';

export default function App() {

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={{flexDirection: "row", marginBottom: 60}}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            PR<Text style={{color: colors.green}}>$</Text>CE
            <Text style={{fontWeight: "normal", color: colors.green}}> CALCULATOR</Text>
          </Text>
          <View style={styles.divider} />
      </View>

      {/* TABLE */}
      <View style={styles.table}>
        {/* Header */}
        <TableHeader />
        {/* Content */}
        <View style={{height: 350, padding:0}}>
          <FlatList
            data={tempData}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <ItemList list={item} />
            )}
          />
        </View>
      </View>

      <Text> Sub Total: $0.00</Text>

      {/* Add List */}
      <TouchableOpacity 
          style={styles.addListBtn}
      >
          <Text style={{color:colors.white, fontWeight: "bold", margin: 10, fontSize:18}}>+ Add Item</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider:{
    backgroundColor:colors.green,
    height: 2,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal:20,
  },
  addListBtn:{
    position: "absolute",
    bottom: 10,
    backgroundColor: colors.green,
    paddingHorizontal: 32,
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 50,
    height: 50,
    width: 350
  },
  table: {
    paddingTop: 45,
    paddingHorizontal: 5,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.lightGreen
  },
  tableHeader:{
    flexDirection: "row",
    backgroundColor: colors.blue,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    width: 400
  }
  
});
