import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './Colors';
import tempData from './TempData';
import {AntDesign} from "@expo/vector-icons";
import TableHeader from './components/TableHeader';
import AddItemModal from './components/AddItemModal';
import CheckOutModal from './components/CheckOutModal';

const Item = ({item, deleteItem}) => {
  const total = item.price * item.quantity;
  return(
    <View style={styles.itemContainer}>
        <View style={[{width: 160, backgroundColor: colors.white}, styles.item]}>
            <Text>{item.name}</Text>
        </View>
        <View style={[{width: 60, backgroundColor: colors.lightGrey}, styles.item]}>
            <Text>$ {item.price}</Text>
        </View>
        <View style={[{width: 60, backgroundColor: colors.lightGrey}, styles.item]}>
            <Text>{item.quantity}</Text>
        </View>
        <View style={[{width: 60, backgroundColor: colors.lightGrey}, styles.item]}>
            <Text>$ {total}</Text>
        </View>
        <TouchableOpacity 
            style={styles.delete}
            onPress = {deleteItem}
        >
            <AntDesign name="close" size={20} color={colors.white} />
        </TouchableOpacity>    
    </View>
  )
}

export default class App extends React.Component {  
  constructor(){
    super();
    this.onSuccess = this.onSuccess.bind(this)
  }

  state = {
    next_id: 10,
    addTodoVisible: false,
    checkOutVisible: false,
    totalPrice: 86.32
  }

  onSuccess(value){
    // Update Price
    const temp = this.state.totalPrice + value;
    const updatedTotalPrice = Math.round((Number.EPSILON + temp) * 100) / 100;
    this.setState({totalPrice: updatedTotalPrice});

    // Update next id
    const next_id = this.state.next_id + 1
    this.setState({next_id: next_id});
  }

  toggleAddTodoModal(){
    this.setState({addTodoVisible: !this.state.addTodoVisible});
  }

  toggleCheckOutModal(){
    this.setState({checkOutVisible: !this.state.checkOutVisible});
  }

  deleteItem = (index) => {
    const temp = this.state.totalPrice - tempData[index].price * tempData[index].quantity;
    const updatedTotalPrice = Math.round((Number.EPSILON + temp) * 100) / 100;
    this.setState({totalPrice: updatedTotalPrice});
    tempData.splice(index, 1);
    this.forceUpdate();
  }

  renderItem = ({item}) => {
    const total = item.price * item.quantity;
    this.tempTotalPrice += total;
    return(
      <Item 
        item={item}
        deleteItem={() => this.deleteItem(tempData.indexOf(item))}
      />
    )
  }

  eraseAllItem = () =>{
    const length = tempData.length;
    this.setState({totalPrice: 0});
    tempData.splice(0, length);
    this.toggleCheckOutModal();
    this.forceUpdate();
  }

  render() {
    return(
      <View style={styles.container}>
        {/* Modal */}
        <Modal 
          animationType="slide" 
          visible={this.state.addTodoVisible} 
          onRequestClose={() => this.toggleAddTodoModal()}>
          <AddItemModal 
            next_id={this.state.next_id}
            closeModal={() => this.toggleAddTodoModal()}
            onSuccess={this.onSuccess}
          />
        </Modal>

        <Modal 
          animationType="slide" 
          visible={this.state.checkOutVisible} 
          onRequestClose={() => this.toggleCheckOutModal()}>
          <CheckOutModal 
            closeModal={() => this.toggleCheckOutModal()}
            totalPrice={this.state.totalPrice}
            eraseAllItem={() => this.eraseAllItem()}
          />
        </Modal>

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
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
            />
          </View>
        </View>

        <Text style={{fontSize:30, marginTop:15}}> Total: $ {this.state.totalPrice}</Text>
        {/* Add List */}        
        
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.addListBtn, {backgroundColor: colors.green}]}
            onPress={() => this.toggleAddTodoModal()}
          >
            <Text style={{color:colors.white, fontWeight: "bold", margin: 10, fontSize:18}}>+ Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.addListBtn, {backgroundColor: colors.yellow}]}
            onPress={() => this.toggleCheckOutModal()}
          >
            <Text style={{color:colors.white, fontWeight: "bold", margin: 10, fontSize:20}}>
              Checkout  <AntDesign name="rightcircle" size={22} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
        
        <StatusBar style="auto" />
      </View>
    );
  };
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
  buttons:{
    flexDirection:"row",
    position: "absolute",
    bottom: 20,
    alignSelf:"center",
    justifyContent:"space-between"
  },
  addListBtn:{
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent:"center",
    borderRadius: 50,
    height: 55,
    width: 175
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
