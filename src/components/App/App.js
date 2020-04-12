import React from 'react';
import './App.css';
import Sphere from '../Sphere/Sphere';
import Form from '../Form/Form';
import axios from 'axios';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: 300,
      height: 300,
      points: 0,
      data: [],
      errorMessage:'',
      max:5
    };
    this.handlePoints = this.handlePoints.bind(this);      
  }

  componentDidMount(){
    axios.get('https://next.json-generator.com/api/json/get/EJj5FeKDd')
      .then((response)=>{
        this.setState({
          width: this.state.width,
          height: this.state.height,
          points: this.state.points,
          data:response.data,
          errorMessage:'',
          max:100
        }); 
      })
      .catch((error)=>{        
        this.setState({
          width: this.state.width,
          height: this.state.height,
          points: this.state.points,
          data:[
            {
              title:'Google',
              link:'www.google.com',
              filled: false
            }, 
            {
              title:'Yandex',
              link:'www.yandex.ru',
              filled: true
            }, 
            {
              title:'E1',
              link:'www.e1.ru',
              filled: false
            }, 
            {
              title:'Reddit',
              link:'www.reddit.com',
              filled: false
            }, 
            {
              title:'Yahoo',
              link:'www.yahoo.com',
              filled: true
            }],
          errorMessage:'Error receiving data from server. Points - 1-' + this.state.max + ' only.',
          max:this.state.max
        });
      });
  }

  handlePoints(point){
    this.setState({      
      width: this.state.width,
      height: this.state.height,
      points: point,
      data:this.state.data,
      errorMessage:'',
      max:this.state.max
    });
  }

  render(){
    return <div className='App'>
      <h3>Points with links</h3>
      {this.state.points !== 0 ? (        
        <Sphere width={this.state.width} height={this.state.height} countPoints={this.state.points} data={this.state.data.slice(0, this.state.points)} setPoints={this.handlePoints}/>
      ) : (
        <Form setPoints={this.handlePoints} max={this.state.max}/>
      )} 
      <div className='App__error'>{this.state.errorMessage}</div>     
    </div>;
  }
};

export default App;