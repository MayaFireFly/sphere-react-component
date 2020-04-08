import React from 'react';
import ReactDOM from 'react-dom';
import Sphere from '../components/Sphere/Sphere';

describe('Sphere', () => {  
  it('render Sphere without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sphere width='200' height='200'/>, div);
  });       
});