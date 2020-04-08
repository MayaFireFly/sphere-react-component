import React from 'react';
import './App.css';
import Sphere from '../Sphere/Sphere';
import Form from '../Form/Form';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: '200',
      height: '200',
      points: ''
    };
    this.handlePoints = this.handlePoints.bind(this);
  }
  handlePoints(point){
    this.setState({      
      width: this.state.width,
      height: this.state.height,
      points: point
    });
  }
  render(){
    return <div className='App'>
      <h3>Sphere</h3>
      {this.state.points != '' ? (
        <Sphere width={this.state.width} height={this.state.height}/>
      ) : (
        <Form setPoints={this.handlePoints}/>
      )}      
    </div>;
  }
};

export default App;