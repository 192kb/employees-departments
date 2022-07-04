import React from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Paths } from './Path';

export interface Employee {
  id: number;
  firstName?: string;
  lastName?: string;
}

export const Employees: React.FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('https://falling-meadow-4745.getsandbox.com/employees')
      .then((response) => response.json())
      .then((response) => setEmployees(response.employees || []))
      .catch(console.warn);
  }, []);

  const handleDelete = React.useCallback(
    (employee: Employee) => {
      fetch(
        'https://falling-meadow-4745.getsandbox.com/employee/' + employee.id,
        {
          method: 'DELETE',
        }
      ).then(() =>
        setEmployees(employees.filter((emp) => emp.id !== employee.id))
      );
    },
    [employees]
  );

  return (
    <>
      <ListGroup>
        {employees.map((employee) => (
          <ListGroup.Item key={employee.id} className='employee__item'>
            <span className='employee__name'>
              {`${employee.id}: ${employee.firstName} ${employee.lastName}`}
            </span>
            <ButtonGroup size='sm' className='employee__actions'>
              <Button
                onClick={() => navigate(`${Paths.Employees}/${employee.id}`)}
              >
                View
              </Button>
              <Button
                onClick={() =>
                  navigate(`${Paths.Employees}/${employee.id}/edit`)
                }
              >
                Edit
              </Button>
              <Button onClick={() => handleDelete(employee)}>Delete</Button>
            </ButtonGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button
        onClick={() => navigate(`${Paths.Employees}/new`)}
        className='employee__new'
      >
        Create new
      </Button>
    </>
  );
};
