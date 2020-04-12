import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/Form/Form';

describe('Form', () => { 
  const setPoints = (value) => {
    console.log(value);
  }; 
  it('render Form without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form setPoints={setPoints} max={3}/>, div);
  });       
});