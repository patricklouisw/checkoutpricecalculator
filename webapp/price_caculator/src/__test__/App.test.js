import React from 'react';
import ReactDOM from 'react-dom';
import CheckoutBar from '../components/checkoutBar';
import Itemlist from '../components/itemlist';
import Title from '../components/title';
import App from '../components/App';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


/**testing for Itemlist and Title component */
it('renders Itemlist without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Itemlist />, div);
    expect(div.innerHTML).toContain('items:');

    ReactDOM.unmountComponentAtNode(div);
}); 

it('renders Title without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Title />, div);
    expect(div.innerHTML).toContain('CheckOutPriceCalculator');

    ReactDOM.unmountComponentAtNode(div);
}); 



/**testing for App component */
it('renders App without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
}); 


let wrapped;
beforeEach( ()=>{
    wrapped = shallow(<App />);
});

it('check if CheckoutBar the component is in App', () => {
    expect(wrapped.find(CheckoutBar).length).toEqual(1);
}); 

it('check if Itemlist the component is in App', () => {
    expect(wrapped.find(Itemlist).length).toEqual(1);
}); 

it('check if Title the component is in App', () => {
    expect(wrapped.find(Title).length).toEqual(1);
}); 



