import React, { useState } from 'react';
import AddEntryForm from './AddEntryForm';
import PhonebookList from './PhonebookList';
import styled from 'styled-components';
import { BiListPlus, BiListUl } from "react-icons/bi";

const AppContainer = styled.div`
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  min-height: 100vh;
  padding: 2rem 1rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: white;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const ContentContainer = styled.div`
  width: 25vw;
  max-width: 90vw;
  background-color: #5757633a;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  overflow-y: auto;
`;

const SubtitleBar = styled.div`
  background-color: #747bff;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin: -1.5rem -1.5rem 1rem -1.5rem;
  justify-content: center;
  display: flex;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? '#ffffff44' : '#ffffff22')};
  color: white;
  transition: background-color 0.5s;
  &:hover {
    background-color: #ffffff33;
  }
`;

const AddIconStyled = styled(BiListPlus)`
  margin-left: -0.3rem;
  font-size: 1.3rem;
  vertical-align: middle;
`;

const ListIconStyled = styled(BiListUl)`
  margin-left: -0.3rem;
  font-size: 1.3rem;
  vertical-align: middle;
`;

const SuccessBanner = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  font-weight: 500;
  text-align: center;
  transition: opacity 0.5s ease;
`;

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedView, setSelectedView] = useState<'add' | 'list'>('add');

  const [successMessage, setSuccessMessage] = useState('');

  const triggerRefresh = () => {
    setRefreshFlag((prev) => !prev);
    setSuccessMessage('Contact added successfully!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };


  return (
    <AppContainer>
      <HeaderContainer>
        <Title>Puhelinluettelo</Title>
        <ViewToggle>
          <ToggleButton
            active={selectedView === 'add'}
            onClick={() => setSelectedView('add')}
          >
            <AddIconStyled /> Add Entry
          </ToggleButton>
          <ToggleButton
            active={selectedView === 'list'}
            onClick={() => setSelectedView('list')}
          >
            <ListIconStyled /> View Entries
          </ToggleButton>
        </ViewToggle>
      </HeaderContainer>
      <ContentContainer>
        <SubtitleBar>
         {selectedView === 'add' ? 'Add New Contact' : 'Phonebook Entries'}
        </SubtitleBar>
        
         {selectedView === 'add' && <AddEntryForm onEntryAdded={triggerRefresh} />}
         {selectedView === 'list' && <PhonebookList key={String(refreshFlag)} />}

         {successMessage && <SuccessBanner>{successMessage}</SuccessBanner>}
      </ContentContainer>
    </AppContainer>
  );
}

export default App;