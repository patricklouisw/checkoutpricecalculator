import React from 'react';


class CheckoutBar extends React.Component {
    state = {term: "", price: ""};

    

    render() {
        return (
                <div className="ui segment">
                    <form className="ui form" onSubmit={e => e.preventDefault()}>
                        <label for="name"> put your item here: </label>
                        <input type = "text" style = {{marginRight: '15px'}} value={this.state.term} onChange={e => this.setState({term: e.target.value})}/>
                        <label for="name"> set quantity: </label>
                        <input type = "text" style = {{marginRight: '15px'}}/>
                        <label for="name"> set price: </label>
                        <input type = "text" style = {{marginRight: '15px'}}/>
                        <label for="name"> set discount rate: </label>
                        <input type = "text" style = {{marginRight: '15px'}}/>

                        <button variant="contained" className="ui button" style = {{marginTop: '15px'}} >Add</button>
                    </form>
                </div>
                
        );
    }
}

export default CheckoutBar;