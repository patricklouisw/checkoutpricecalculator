import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import CheckoutBar from '../components/checkoutBar';
import Itemlist from '../components/itemlist';
import Title from '../components/title';
import App from '../components/App';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });



/**testing for App component */
it('renders CheckoutBar without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CheckoutBar />, div);
    ReactDOM.unmountComponentAtNode(div);
}); 


let wrapped;
beforeEach( ()=>{
    wrapped = mount(<CheckoutBar />);
});

afterEach( ()=>{
    wrapped.unmount();
});


it('check the name_input for name of the item', () => {
    wrapped.find("[className='name_input']").simulate('change', {target: {value: 'cabbage'}});
    wrapped.update();
    expect(wrapped.find("[className='name_input']").prop('value')).toEqual('cabbage')
}); 

it('check the quantity_input for name of the item', () => {
    wrapped.find("[className='quantity_input']").simulate('change', {target: {value: '2'}});
    wrapped.update();
    expect(wrapped.find("[className='quantity_input']").prop('value')).toEqual('2')
}); 

it('check the price_input for name of the item', () => {
    wrapped.find("[className='price_input']").simulate('change', {target: {value: '1'}});
    wrapped.update();
    expect(wrapped.find("[className='price_input']").prop('value')).toEqual('1')
}); 

it('check the discount_input for name of the item', () => {
    wrapped.find("[className='discount_input']").simulate('change', {target: {value: '100'}});
    wrapped.update();
    expect(wrapped.find("[className='discount_input']").prop('value')).toEqual('100')
}); 
