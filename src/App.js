import logo from './logo.svg';
import './App.css';
import React,{ Component } from 'react';
import { render } from '@testing-library/react';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id:'i1', name: 'Ankit', age: 22 },
      { id:'i2', name: 'Ankita', age:22 },
      { id:'i3', name: 'Shivang', age:22 }
    ]
  }
 
  switchNameHandler = (newName1) => {
    this.setState({
      persons: [
      { name: newName1, age: 22 },
      { name: 'Ankita', age:22 },
      { name: 'Shivang', age:22 }
      ],
      otherState: 'some other value',
      showPersons: false
    });
  }

  nameChangeHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex(p => {
         return p.id===id;
    });
    const person = {...this.state.persons[personIndex]};
    person.name=event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }


  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  deletePersonHandler = (personIndex) => {
    // Since objects and arrays are reference types, so here we are getting a pointer to the original persons object.
    // const person = this.state.persons;  
    // splicing the person therefore already mutates the actual persons object and this is a bad practice.
    //So, a good way will be to create a copy of the original persons object which can be done by the two ways described below
    // const person = this.state.persons.slice();
    const person = [...this.state.persons];
    person.splice(personIndex, 1);
    this.setState({ persons: person });
  }

  render(){
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    let personComponent = null;
    if(this.state.showPersons){
      personComponent = (
          <div>
          { this.state.persons.map((person,index) =>{
              return <Person name={person.name} age={person.age} click={()=> this.deletePersonHandler(index)} key={person.id} changed={(event)=> this.nameChangeHandler(event,person.id)} />
          }) }
          
          </div> 
      )
    }
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <button style={style} onClick={() => this.togglePersonsHandler()}>Switch Name</button>
        { personComponent }
      </div>
    ); 
   // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, this is a react app!'));
  };
}

export default App;
