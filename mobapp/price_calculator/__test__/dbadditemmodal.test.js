import 'react-native';
import React from 'react';
import DBAddItemModal from '../components/DBAddItemModal';

import renderer from 'react-test-renderer';

it('isInt true', () => {
    let test = renderer.create(<DBAddItemModal />).getInstance();
    
    expect(test.isInt(10)).toBe(true);
})

it('isInt false', () => {
    let test = renderer.create(<DBAddItemModal />).getInstance();
    
    expect(test.isInt("....")).toBe(false);
})

it('isFloat true', () => {
    let test = renderer.create(<DBAddItemModal />).getInstance();
    
    expect(test.isFloat(10.5)).toBe(true);
})

it('isFloat false', () => {
    let test = renderer.create(<DBAddItemModal />).getInstance();
    
    expect(test.isFloat(".....")).toBe(false);
})

