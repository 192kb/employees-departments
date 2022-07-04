import React from 'react';
import { Button, Form } from 'react-bootstrap';

export const NewDepartment: React.FC = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = React.useCallback(() => {
    name &&
      description &&
      fetch('https://falling-meadow-4745.getsandbox.com/departments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
        }),
      }).then((response) => response.json());
  }, [description, name]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        as='input'
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
        value={name}
      />
      <Form.Control
        as='textarea'
        placeholder='Description'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <Button type='submit'>Create</Button>
    </Form>
  );
};
