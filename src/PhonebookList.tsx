import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface Entry {
  id: number;
  name: string;
  phone: string;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EntryCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
  border: solid 1px rgba(169, 169, 169, 0.5);
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
`;

const EntryInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  color: #white;
`;

const Phone = styled.span`
  color: #white;
  font-size: 0.95rem;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d9363e;
  }
`;

const PhonebookList: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get<Entry[]>('http://localhost:8080/api/entries');
      setEntries(res.data);
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const deleteEntry = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/entries/${id}`);
      fetchEntries(); // Refresh after delete
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <ListContainer>
      {entries.length === 0 && <p>No contacts found.</p>}
      {entries.map(entry => (
        <EntryCard key={entry.id}>
          <EntryInfo>
            <Name>{entry.name}</Name>
            <Phone>{entry.phone}</Phone>
          </EntryInfo>
          <DeleteButton onClick={() => deleteEntry(entry.id)}>Delete</DeleteButton>
        </EntryCard>
      ))}
    </ListContainer>
  );
};

export default PhonebookList;
