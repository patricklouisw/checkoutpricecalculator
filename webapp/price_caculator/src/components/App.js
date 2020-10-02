import React from 'react';
import CheckoutBar from './checkoutBar.js';
import MainBoard from './itemlist.js';
import TitleName from './title.js';
import "../styling/App.css"


class App extends React.Component {
    
    state = {
        itemList: []
    } 

    useMeWhenOnClick = (item_features) => {
        this.setState({ 
            itemList: this.state.itemList.concat([item_features])
        })
    }

    useMeWhenonClear = (item_features) => {
        this.setState({ 
            itemList: []
        })
    }


    calculateSum = (items) => {
        return parseFloat(items[2], 10)*parseFloat(items[3], 10)*parseFloat(items[1], 10)*0.01;
    }


    calculateFinal = () => {
        let sum = 0
        let items;
        for (items of this.state.itemList){
            sum += parseFloat(items[2], 10)*parseFloat(items[3], 10)*parseFloat(items[1], 10) * 0.01;
        }
        return sum;
    }

    deleteItem = (event) => {
        let new_array = this.state.itemList;
        let target;
        for (let i =0; i < new_array.length; i++){
            if (event.target.id == new_array[i][4]) {
                target = i;
                console.log(i);
            }
        }
        new_array.splice(target, 1);

        this.setState({itemList: new_array})
    }

    
    render() {
        const listItems = this.state.itemList.map((items) =>
            <div>
                <span>
                    <div style={{marginBottom: '5px'}}>
                        <p className="ui segment" style={{marginBottom: '0px',  float: "left", marginTop: "0px", minWidth:'510px'}}>{items[0]} X {items[1]}</p>  
                        <p className="ui segment" style={{marginBottom: '0px', float: "left", marginTop: "0px", minWidth:'510px', marginLeft: '10px'}}> after discount: {this.calculateSum(items)}</p>
                        <button className="ui segment" type="reset" id={items[4]} onClick={this.deleteItem} style={{marginTop: '0px', marginLeft: '10px', backgroundColor: 'orangered'}}>Delete</button>
                    </div>
                </span>
            </div>
        );

        return (
            <div className='ui segment'>
                <div className="ui segment" style={{marginBottom: '15px'}}>
                    <TitleName />
                </div>

                <div className="ui container" style={{marginBottom: '15px'}}>
                    <CheckoutBar onSubmit={this.useMeWhenOnClick} onClear={this.useMeWhenonClear}/>
                </div>

                <div className="ui container" variant="contained" style={{marginBottom: '15px'}}>
                    <MainBoard />
                    <div>{listItems}</div>
                </div>
                    
                <div className="ui container" style={{marginBottom: '15px'}}>
                    <div className="ui segment" style = {{backgroundColor: "lightblue"}}>total: {this.calculateFinal()}</div>
                </div>
            </div>
        );
    }
}

export default App;