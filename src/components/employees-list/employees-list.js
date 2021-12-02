import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp}) => {
  const elements = data.map(item => {
    const {id, ...itemProps} = item;

    return (
      <EmployeesListItem 
          key={id} 
          {...itemProps}
          onDelete={() => onDelete(id)}
          onToggleProp={(evt) => onToggleProp(id, evt.currentTarget.getAttribute('data-toggle'))} // prop передается в виде дата-атрибута элемента, на котором сработало событие
          />
    );
  });

  return (
    <ul className="app-list list-group">
      {elements}
    </ul>
  );
}

export default EmployeesList;