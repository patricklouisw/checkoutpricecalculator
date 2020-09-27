import React from 'react';
import CheckoutBar from './checkoutBar.js';
import MainBoard from './itemlist.js';
import TitleName from './title.js';


class App extends React.Component {
    
    state = {
        itemList: []
    } 

    useMeWhenOnClick = (item_features) => {
        this.setState({ 
            itemList: this.state.itemList.concat([item_features])
        })
    }

    calculateFinal = () => {
        let sum = 0
        let items;
        for (items of this.state.itemList){
            sum += parseInt(items[2], 10)*parseInt(items[3], 10)*parseInt(items[1], 10);
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
        <li>
            <div>
                {items[0]} X {items[1]}  after discount: {parseInt(items[2], 10)*parseInt(items[3], 10)*parseInt(items[1], 10)}
                <button type="reset" id={items[4]} onClick={this.deleteItem}>delete</button>
            </div>
        </li>
        
    </div>
    
    
        );

        return (
            <div>
                <div style={{marginBottom: '15px'}}>
                    <TitleName />
                </div>

                <div className="ui container" style={{marginBottom: '15px'}}>
                    <CheckoutBar onSubmit={this.useMeWhenOnClick} />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <MainBoard />
                    <div>{listItems}</div>
                </div>
                    
                <div style={{marginBottom: '15px'}}>
                    <div>total: {this.calculateFinal()}</div>
                </div>
            </div>
        );
    }
}

export default App;