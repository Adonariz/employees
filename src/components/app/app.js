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
      ],
      term: '',
      filter: 'all'
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

  searchEmployees = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1;
    });
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterEmployees = (items, filter) => {
    switch (filter) {
      case 'raise':
        return items.filter(item => item.raise);
      case 'moreThan1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;
    const employees = data.length;
    const increased = data.filter(item => item.increase).length;
    const visibleData = this.filterEmployees(this.searchEmployees(data, term), filter);

    return (
      <div className='app'>
        <AppInfo 
            employees={employees}
            increased={increased}  
            />
  
        <div className="search-panel">
          <SearchPanel 
            onUpdateSearch={this.onUpdateSearch}
          />
          <AppFilter 
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        
        <EmployeesList 
            data={visibleData}
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