import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsApi';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error, items: contacts } = useSelector((state) => state.contacts || { isLoading: false, error: null, items: [] });

  const [formData, setFormData] = useState({ name: '', number: '' });

  const inputChange = (event) => {
    const { name, value } = event.currentTarget;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isDuplicate =
        formData.name && contacts.some((contact) => contact.name.toLowerCase() === formData.name.toLowerCase());

      if (isDuplicate) {
        alert(`${formData.name} is already in contacts`);
        reset();
      } else {
        await dispatch(addContact(formData));
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    setFormData({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <label className={css.name}>Name</label>
      <input className={css.input} onChange={inputChange} type="text" name="name" value={formData.name} />
      <label className={css.name}>Number</label>
      <input className={css.input} onChange={inputChange} type="tel" name="number" value={formData.number} />
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;