import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsApi';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector((state) => {
    if (!state || !state.contacts) {
      return []; 
    }

    const filtered = state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(state.filter.toLowerCase())
    );
    return filtered;
  });

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          <div className={css.div}>
            <div>
              <p className={css.name}>{name}: </p>
            </div>
            <div>
              <p className={css.name}>{number}</p>
            </div>
            <button type="button" onClick={() => dispatch(deleteContact(id))} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
