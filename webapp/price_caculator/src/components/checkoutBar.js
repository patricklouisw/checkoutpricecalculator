import React from 'react';
import "../styling/checkoutBar.css"


class CheckoutBar extends React.Component {
    constructor() {
        super();
        this.count = 0;
    }
    
    state = {name: "", quantity: 1, price: 0, discount: 100, id: null};


    onButtonClick = event => {
        this.props.onSubmit([this.state.name, this.state.quantity, this.state.price, this.state.discount, this.count]);
        this.count += 1;
    };

    onButtonClear = event => {
        this.props.onClear(this.count);
        this.count = 0;
    };

    render() {
        return (
                <div className="ui segment">
                    <form className="ui form" onSubmit={e => e.preventDefault()}>
                        <label className="labels" for="name"> put your item here: </label>
                        <input className='name_input' required type = "text" style = {{marginRight: '15px'}} value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>

                        <label className="labels" for="name"> set quantity: </label>
                        <input className='quantity_input' required type = "number" style = {{marginRight: '15px'}} value={this.state.quantity} onChange={e => this.setState({quantity: e.target.value})}/>

                        <label className="labels" for="name"> set price: </label>
                        <input className='price_input' required type = "number" style = {{marginRight: '15px'}} value={this.state.price} onChange={e => this.setState({price: e.target.value})}/>

                        <label className="labels" for="name"> set discount rate %: </label>
                        <input className='discount_input' min="0" max="100" required type = "number" style = {{marginRight: '15px'}} value={this.state.discount} onChange={e => this.setState({discount: e.target.value})}/>

                        <button variant="contained" className="ui button" style = {{marginTop: '15px', backgroundColor:'lightgreen'}} onClick={this.onButtonClick}>Add</button>
                        <button variant="contained" className="ui button" style = {{marginTop: '15px', backgroundColor:'vintage'}} onClick={this.onButtonClear}>clear</button>
                    </form>
                </div>
                
        );
    }
}

export default CheckoutBar;