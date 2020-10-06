import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './Colors';
import tempData from './TempData';
import {AntDesign} from "@expo/vector-icons";
import TableHeader from './components/TableHeader';
import AddItemModal from './components/AddItemModal';
import CheckOutModal from './components/CheckOutModal';
import DBConnectModal from './components/DBConnectModal';
import DBAddItemModal from './components/DBAddItemModal';
import DBCheckOutModal from './components/DBCheckoutModal'

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
  constructor(props){
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.updateIP = this.updateIP.bind(this);
    this.state = {
      isDB: false,
      dbLog: "Not yet reached",
      dbData: [],
      ip:"",
      isLoading: false,
      dbTotalPrice: 0,

      addTodoVisible: false,
      checkOutVisible: false,
      dbConnectVisible: false,

      next_id: 10,
      totalPrice: 86.32,
      
    }
  }

  dbConnect(){
    const url = "http://"+ this.state.ip+":3000/items";
    fetch(url).then((response)=>{
      if(response.status == 200){
        this.setState({dbLog: "status 200"});
        return response.json();
      } else {
        this.setState({dbLog: "status is not 200", isLoading: false});
        throw new Error("Something is wrong!");
      }
    })
    
    .then((responseJson) =>{
      this.setState({dbLog: "reached"});
      this.setState({dbData: responseJson, isLoading: false, isDB: true});
      // this.dbTotalPrice();
    })
    
    .catch(error => {
      this.setState({dbLog: "Something is wrong", isLoading: false});
      alert("Unable to Connect! Make sure to Activate your backend and your IP address is correct!");
    });
  }

  // dbTotalPrice = () => {
  //   const temp = JSON.parse(this.state.dbData);
  //   let total = this.state.dbTotalPrice;
  //   for(let x in temp){
  //     total += x;
  //   }
  //   this.setState({dbTotalPrice: total, dbLog: "reached"});
  // }

  updateIP = (address) => {
    this.setState({ip: address, isLoading: true});
    this.dbConnect();
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

  toggleDBConnectModal(){
    this.setState({dbConnectVisible: !this.state.dbConnectVisible});
  }

  deleteItem = (index) => {
    const temp = this.state.totalPrice - tempData[index].price * tempData[index].quantity;
    const updatedTotalPrice = Math.round((Number.EPSILON + temp) * 100) / 100;
    this.setState({totalPrice: updatedTotalPrice});
    tempData.splice(index, 1);
    this.forceUpdate();
  }

  dbDeleteItem = (id, index) =>{
    
    this.setState({dbLog: 'http://'+this.state.ip+':3000/items/' + id});
    fetch('http://'+this.state.ip+':3000/items/' + id, {
      method: 'DELETE',
    })
    .then(res => {
      // res.text();
      this.setState({dbLog: "Deleted"});
      this.forceUpdate();
      this.state.dbData.splice(index, 1);
    }) // or res.json()
    .then(res => console.log(res))
  }

  renderItem = ({item}) => {
    const total = item.price * item.quantity;
    let deleteFunction = () => this.deleteItem(tempData.indexOf(item));
  
    if(this.state.isDB){
      let dbDataIndex = this.state.dbData.indexOf(item);
      deleteFunction = () =>this.dbDeleteItem(item._id, dbDataIndex);
      this.dbTotalPrice += total;
    } else {
      this.tempTotalPrice += total;
    }
    return(
      <Item 
        item={item}
        deleteItem={deleteFunction}
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

  dbCheckout = () => {
    fetch('http://'+this.state.ip+':3000/items/deleteAll', {
      method: 'DELETE',
    })
    .then(res => {
      this.toggleCheckOutModal();
      this.setState({dbLog: "Deleted"});
      this.forceUpdate();
      this.dbConnect();
    });
  }

  dbAddItem = (name, price, quantity, discount, total) => {
    fetch('http://'+this.state.ip+':3000/items', {
      method: 'POST',
      body: JSON.stringify({
          name: name,
          price: price,
          quantity: quantity,
          discount: discount
      }),
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
      })
      .then((response)=>{
        if(response.status == 200){
          this.setState({dbLog: "status 200"});
          this.dbConnect();
          this.forceUpdate;
          // return response.json();
        } else {
          this.setState({dbLog: "status is not 200", isDB: false});
          // throw new Error("Something is wrong!");
        }
      })
      .then(json => console.log(json))
  }

  render() {
    if (this.state.isLoading){
      return(
        <View style={styles.container}>
          <AntDesign name="smileo" size={24} color="black" />
          <Text style={{textAlign: "center", fontSize: 20}}>Loading Data!</Text>
        </View>
      );
    } else if(this.state.isDB){
      return (
        <View style={styles.container}>
          {/* Modal */}
          <Modal 
            animationType="slide" 
            visible={this.state.addTodoVisible} 
            onRequestClose={() => this.toggleAddTodoModal()}>
            <DBAddItemModal 
              closeModal={() => this.toggleAddTodoModal()}
              dbAddItem={this.dbAddItem}
            />
          </Modal>
  
          <Modal 
            animationType="slide" 
            visible={this.state.checkOutVisible} 
            onRequestClose={() => this.toggleCheckOutModal()}>
            <DBCheckOutModal 
              closeModal={() => this.toggleCheckOutModal()}
              totalPrice={this.state.totalPrice}
              dbCheckout={() => this.dbCheckout()}
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

          <Text>Cloud Database: <Text style={{color: colors.green}}>Online</Text> (Data is stored in cloud.)</Text>
  
          {/* TABLE */}
          <View style={styles.table}>
            {/* Header */}
            <TableHeader />
            {/* Content */}
            <View style={{height: 350, padding:0}}>
              <FlatList
                data={this.state.dbData}
                keyExtractor={item => item._id.toString()}
                renderItem={this.renderItem}
              />
            </View>
          </View>
  
      <Text style={{fontSize:30, marginTop:15}}></Text>
          {/* Add List */}        
          
          <View style={styles.buttons}>
            <TouchableOpacity 
              style={[styles.addListBtn, {backgroundColor: colors.red, width: 50}]}
              onPress={() => {this.setState({isDB: false}); alert("Log out Successful!")}}
            >
              <AntDesign name="logout" size={24} color="white" />
            </TouchableOpacity>

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
      )
    } else{
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
            visible={this.state.dbConnectVisible} 
            onRequestClose={() => this.toggleDBConnectModal()}>
            <DBConnectModal
              closeModal={() => this.toggleDBConnectModal()}
              updateIP={this.updateIP}
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

          <Text>Cloud Database: <Text style={{color: colors.red}}>Offline</Text> (Data is temporarily stored)</Text>
  
          {/* TABLE */}
          <View style={styles.table}>
            {/* Header */}
            <TableHeader />
            {/* Content */}
            <View style={{height: 275, padding:0}}>
              <FlatList
                data={tempData}
                keyExtractor={item => item.id.toString()}
                renderItem={this.renderItem}
              />
            </View>
          </View>
  
          <Text style={{fontSize:30, marginTop:15}}> Total: $ {this.state.totalPrice}</Text>
          {/* Add List */}        
          
          <View style={styles.buttons}>
            <TouchableOpacity 
              style={[styles.addListBtn, {backgroundColor: colors.blue, width: 50}]}
              onPress={() => this.toggleDBConnectModal()}
            >
              <AntDesign name="cloudupload" size={24} color="white" />
            </TouchableOpacity>

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
    }

    
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
    paddingHorizontal: 5
    // width: 175
  },
  table: {
    paddingTop: 45,
    height: 400,
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
