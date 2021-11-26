import AppFilter from '../app-filter/app-filter';
import AppInfo from '../app-info/app-info';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import EmployeesList from '../employees-list/employees-list';
import SearchPanel from '../search-panel/search-panel';

import './app.css';

function App() {
  const data = [
    {name: 'Adam S.', salary: 400, increase: false, id: 1},
    {name: 'John C.', salary: 500, increase: true, id: 2},
    {name: 'Peter P.', salary: 600, increase: false, id: 3},
  ];


  return (
    <div className='app'>
      <AppInfo/>

      <div className="search-panel">
        <SearchPanel/>
        <AppFilter/>
      </div>
      
      <EmployeesList data={data}/>
      <EmployeesAddForm/>
    </div>
  );
}

export default App;