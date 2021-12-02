import { Component } from 'react';

import AppFilter from '../app-filter/app-filter';
import AppInfo from '../app-info/app-info';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesList from '../employees-list/employees-list';
import SearchPanel from '../search-panel/search-panel';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {name: 'Adam S.', salary: 400, increase: false, raise: true, id: 1},
        {name: 'John C.', salary: 500, increase: true, raise: false, id: 2},
        {name: 'Peter P.', salary: 600, increase: false, raise: false, id: 3},
      ]
    }
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      // const index = data.findIndex(elem => elem.id === id);
      
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);

      // const newArr = [...before, ...after];

      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      raise: false,
      id: this.maxId++
    }

    this.setState(({data}) => {
      const newArr = [...data, newItem];

      return {
        data: newArr
      }
    });
  }

  onToggleProp = (id, prop) => {
    // this.setState(({data}) => {
    //   const index = data.findIndex(elem => elem.id === id); // находим индекс элемента

    //   const old = data[index]; // старый элемент
    //   const newItem = {...old, increase: !old.increase}; // новый элемент (элементы после спред оператора заменяют развернутые)
    //   const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)] // формируем новый массив

    //   return {
    //     data: newArr
    //   }
    // });

    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }

        return item;
      })
    }));
  }

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;

    return (
      <div className='app'>
        <AppInfo 
            employees={employees}
            increased={increased}  
            />
  
        <div className="search-panel">
          <SearchPanel/>
          <AppFilter/>
        </div>
        
        <EmployeesList 
            data={this.state.data}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}
            />
        <EmployeesAddForm
            onAdd={this.addItem}
        />
      </div>
    );
  }

}

export default App;