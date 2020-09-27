import React from 'react';


class CheckoutBar extends React.Component {
    constructor() {
        super();
        this.count = 0;
    }
    
    state = {name: "", quantity: 0, price: 0, discount: 1, id: null};


    onButtonClick = event => {
        this.props.onSubmit([this.state.name, this.state.quantity, this.state.price, this.state.discount, this.count]);
        this.count += 1;
    };

    render() {
        return (
                <div className="ui segment">
                    <form className="ui form" onSubmit={e => e.preventDefault()}>
                        <label for="name"> put your item here: </label>
                        <input type = "text" style = {{marginRight: '15px'}} value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>

                        <label for="name"> set quantity: </label>
                        <input type = "text" style = {{marginRight: '15px'}} value={this.state.quantity} onChange={e => this.setState({quantity: e.target.value})}/>

                        <label for="name"> set price: </label>
                        <input type = "text" style = {{marginRight: '15px'}} value={this.state.price} onChange={e => this.setState({price: e.target.value})}/>

                        <label for="name"> set discount rate: </label>
                        <input type = "text" style = {{marginRight: '15px'}} value={this.state.discount} onChange={e => this.setState({discount: e.target.value})}/>

                        <button variant="contained" className="ui button" style = {{marginTop: '15px'}} onClick={this.onButtonClick}>Add</button>
                    </form>
                </div>
                
        );
    }
}

export default CheckoutBar;