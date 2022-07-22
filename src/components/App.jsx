import { useState } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyled';
import { PhonebookTitle, Phonebook, ContactTitle } from './Phonebook.styled';
import InputForm from './InputForm';
import ContactList from './ContactList';
import SearchFilter from './Filter';
// import Modal from './Modal';
import { useLocalStorage } from './Hooks/LocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    contacts.some(e => e.name === contact.name)
      ? alert(`${name}, is already in contacts.`)
      : setContacts(contacts => [contact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleFilter = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const visibleFilter = getVisibleFilter();

  // ------для модалки-----
  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <Phonebook>
      <GlobalStyle />
      <PhonebookTitle>
        {/* <button type="button" onClick={toggleModal}>
          Open modal
        </button>
        {showModal && (
          <Modal onClose={toggleModal}>
            <p>ream sssss sddd</p>
            <button onClick={toggleModal}>close</button>
          </Modal>
        )} */}
        Phonebook
      </PhonebookTitle>
      <InputForm onSubmit={addContact} />
      <ContactTitle>Contacts</ContactTitle>
      <SearchFilter filter={filter} onChange={changeFilter} />
      <ContactList contacts={visibleFilter} onDeleteContact={deleteContact} />
    </Phonebook>
  );
}
