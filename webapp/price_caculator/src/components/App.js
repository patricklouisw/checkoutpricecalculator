import React from 'react';
import CheckoutBar from './checkoutBar.js';
import Item from './item.js';
import MainBoard from './itemlist.js';
import SumResult from './resultBar.js';
import TitleName from './title.js';


class App extends React.Component {
    render() {
        return (
            <div>
                <div style={{marginBottom: '15px'}}>
                    <TitleName />
                </div>

                <div className="ui container" style={{marginBottom: '15px'}}>
                    <CheckoutBar />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <MainBoard />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
                    
                <div style={{marginBottom: '15px'}}>
                    <SumResult />
                </div>
            </div>
        );
    }
}

export default App;