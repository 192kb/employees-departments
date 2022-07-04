import React from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Paths } from './Path';

export interface Department {
  id: number;
  name?: string;
  description?: string;
}

export const Departments: React.FC = () => {
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('https://falling-meadow-4745.getsandbox.com/departments')
      .then((response) => response.json())
      .then((response) => setDepartments(response.departments || []))
      .catch(console.warn);
  }, []);

  const handleDelete = React.useCallback(
    (department: Department) =>
      fetch(
        'https://falling-meadow-4745.getsandbox.com/department/' +
          department.id,
        {
          method: 'DELETE',
        }
      ).then(() =>
        setDepartments(departments.filter((dep) => dep.id !== department.id))
      ),
    [departments]
  );

  return (
    <>
      <ListGroup>
        {departments.map((department) => (
          <ListGroup.Item key={department.id} className='department__item'>
            <ButtonGroup size='sm' className='department__actions'>
              <Button
                onClick={() =>
                  navigate(`${Paths.Departments}/${department.id}`)
                }
              >
                View
              </Button>
              <Button
                onClick={() =>
                  navigate(`${Paths.Departments}/${department.id}/edit`)
                }
              >
                Edit
              </Button>
              <Button onClick={() => handleDelete(department)}>Delete</Button>
            </ButtonGroup>
            <span className='department__name'>
              {`${department.id}: ${department.name}`}
            </span>
            <div className='department__description'>
              {department.description}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button
        onClick={() => navigate(`${Paths.Departments}/new`)}
        className='department__new'
      >
        Create new
      </Button>
    </>
  );
};
