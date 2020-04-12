import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      point:0,
      errorMessage:''
    };
    this.handlePoints = this.handlePoints.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } 
  
  handlePoints(value){
    const pattern = /^(\d){1,100}$/;    
    if(pattern.test(value)){           
      this.setState({
        point:Number(value),
        errorMessage:'' 
      });     
    }else{      
      this.setState({
        point:0,
        errorMessage:'Points - only digits (1-' + this.props.max + ').' 
      });     
    }
  };

  handleSubmit(event){
    event.preventDefault();
    if(this.state.point != 0){
      this.state.point > this.props.max ? 
        this.setState({
          point:0,
          errorMessage:'Points - only digits (1-' + this.props.max + ').' 
        })
        :this.props.setPoints(this.state.point);      
    }else{
      this.setState({
        point:0,
        errorMessage:'Points - only digits (1-' + this.props.max + ').' 
      });
    }    
  };

  render(){
    return <div className='Form__wrapper'>
      <form className='Form__form Form_border'>

        <div className='Form__row'>
          <label htmlFor='points' className='Form__label'>The count of points</label>
          <input type='number' id='points' 
            onBlur={(e)=>this.handlePoints(e.target.value)} 
            className='Form__input Form_border'
            min='1' max={this.props.max}/>
        </div>

        <div className='Form__row'>
          <button onClick={(e)=>this.handleSubmit(e)} className='Form__btn Form_border'>SUBMIT</button>
        </div>

      </form>
      <div className='App__error'>{this.state.errorMessage}</div>
    </div>;
  }
};

Form.propTypes = {
  setPoints:PropTypes.func.isRequired,
  max:PropTypes.number.isRequired
};

export default Form;