import React, { Fragment, useContext } from 'react'

import ContactContext from '../../context/contact/contactContext'

import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)// initialing the contactContext in this component to pass in all the methods(actions) and state values from the contactContext

  const { contacts } = contactContext

  return (
    <div>
      <Fragment>
        {contacts.map(contact => <ContactItem contact={contact} key={contact.id}/>)}
      </Fragment>

    </div>
  )
}

export default Contacts