import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface AddEntryFormProps {
  onEntryAdded: () => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #f4f4f4;
  transition: box-shadow 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #747bff88;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background-color: #747bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5d66db;
  }
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onEntryAdded }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const isNumberValid = (phone: string): boolean => {
    const phoneRegex = /^(\+?\d{1,3})?[-\s]?(\d{4,})$/;
    return phoneRegex.test(phone);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
  
    if (!isNumberValid(phone)) {
      setError('Please enter a valid phone number (e.g. +358401234567)');
      return;
    }
  
    try {
      await axios.post('http://localhost:8080/api/entries', { name, phone });
      setName('');
      setPhone('');
      setError('');
      onEntryAdded();
    } catch (error) {
      console.error('Failed to add entry:', error);
      setError('Failed to save. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />

      {error && <ErrorText>{error}</ErrorText>}

      <SubmitButton type="submit">Add Contact</SubmitButton>
    </Form>
  );
};

export default AddEntryForm;
