import React from 'react';

class SumResult extends React.Component {
    render() {
        return (
            <div style = {{borderColor: 'blue'}}> 
                <form>
                    <label for="name"> final price: </label>
                    <input type = "text" style = {{margin: '15px'}}/>
                    <button variant="contained">Go</button>
                </form>
            </div>
        );
    }
}

export default SumResult;