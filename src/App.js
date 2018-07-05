import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      customers: [],
      name: '',
      id: '',
      toggle: false
    }
  }

  componentDidMount(){
    axios.get('/api/test').then(response => {
      this.setState({
        customers: response.data
      })
    })
  }

  changeHandler = (val) => {
    this.setState({
      name: val
    })
  }

  getId = (id) => {
    this.setState({
      id: id
    })
  }

  update = () => {
    let updatedCustomerInfo = { 
          name: this.state.name
        }

    axios.put(`/api/test?id=${this.state.id}`, updatedCustomerInfo).then(response => {
      this.setState({
        customers: response.data,
        name: ''
      })
    })
  }

  updateToggle = () => {
    this.setState((prevState) => {
      return {
        toggle: !prevState.toggle
      }
    })
  }


  render() {

    let customerz = this.state.customers.map(customer => {
      return <div onClick={() => this.getId(customer.id)} key={customer.id}>{customer.name}</div>
    })

    console.log(this.state.id);
    return (
      <div className="App">
        {customerz}
        edit name: <input onChange={(e) => this.changeHandler(e.target.value)} value={this.state.name}/>
        <button onClick={() => this.update()}>Update</button>

        <div>{`${this.state.toggle}`}</div>
        {this.state.toggle ? <input /> : ''}
        {this.state.toggle ? <button onClick={() => this.updateToggle()}>Save</button>: <button onClick={() => this.updateToggle()}>Edit</button>}
        {this.state.id}
      </div>
    );
  }
}

export default App;
