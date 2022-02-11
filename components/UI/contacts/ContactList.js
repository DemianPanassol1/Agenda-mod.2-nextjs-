import React, { useContext, useEffect, useMemo } from 'react';
import { contactContext, dispatchContactContext } from '../../react/context';
import ContactItem from './ContactItem';

function ContactList() {

    const { contacts, filtered, isLoading } = useContext(contactContext);
    const { getContacts } = useContext(dispatchContactContext);

    useEffect(() => {
        getContacts();

        // eslint-disable-next-line
    }, []);

    if (contacts.length === 0 && !isLoading) {
        return (
            <section className='text-center mb-32'>
                <h5 className='font-medium text-lg'>Não há nada para mostrar aqui!</h5>
                <p>Adicione um contato ao lado e ele aparecerá abaixo</p>
            </section>
        );
    };

    return (
        <section className='mb-32 w-full'>
            {isLoading ? (<p>Carregando...</p>) : (
                filtered !== null ? filtered.map(contact => {
                    return <ContactItem key={contact._id} data={contact} />
                }) : (
                    contacts.map(contact => {
                        return <ContactItem key={contact._id} data={contact} />
                    })
                ))
            }
        </section>
    );
};

export default ContactList;