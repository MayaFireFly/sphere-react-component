import React from 'react';
import './Form.css';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      point:'',
      errorMessage:''
    };
    this.handlePoints = this.handlePoints.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  
  

  handlePoints(value){
    const pattern = /^(\d){1,100}$/;    
    if(pattern.test(value)){           
      this.setState({
        point:value,
        errorMessage:'' 
      });     
    }else{      
      this.setState({
        point:'',
        errorMessage:'Points - only digits (1-100).' 
      });     
    }
  };

  handleSubmit(event){
    event.preventDefault();
    if(this.state.point != ''){
      this.props.setPoints(this.state.point);      
    }    
  };

  render(){
    return <div className='Form'>
      <form>
        <label htmlFor='points'>POINTS</label>
        <input type='text' id='points' onBlur={(e)=>this.handlePoints(e.target.value)}/>
        <button onClick={(e)=>this.handleSubmit(e)}>SUBMIT</button>
      </form>
      <div className='App__error'>{this.state.errorMessage}</div>
    </div>;
  }
};

export default Form;