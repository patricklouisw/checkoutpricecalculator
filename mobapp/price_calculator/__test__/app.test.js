import 'react-native';
import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

it('onSuccess', () => {
    let test = renderer.create(<App />).getInstance();
    test.onSuccess(10);
    expect(test.state.totalPrice).toEqual(10);
    expect(test.state.next_id).toBe(2);
})

it('toggleAddTodoModal', () => {
    let test = renderer.create(<App />).getInstance();
    test.toggleAddTodoModal(10);
    expect(test.state.addTodoVisible).toEqual(true);
})

it('toggleCheckOutModal', () => {
    let test = renderer.create(<App />).getInstance();
    test.toggleCheckOutModal(10);
    expect(test.state.checkOutVisible).toEqual(true);
})

it('toggleDBConnectModal', () => {
    let test = renderer.create(<App />).getInstance();
    test.toggleDBConnectModal(10);
    expect(test.state.dbConnectVisible).toEqual(true);
})

