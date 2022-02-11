import React from 'react';
import AddContactForm from '../contacts/AddContactForm';
import ContactList from '../contacts/ContactList';
import FilterContact from '../contacts/FilterContact';

function HomePage({ user }) {

    return (
        <section className='container mt-10 md:mt-16 lg:mt-20'>
            <h2
                className='text-center mb-6 md:mb-0 px-4 md:px-0 md:text-right text-black font-medium text-lg'
            >
                Bem vindo(a) {user.name}!
            </h2>

            <div className='flex flex-col sm:flex-row sm:justify-around'>
                <AddContactForm />

                <div className='flex w-full sm:w-1/3 flex-col mt-10 sm:mt-14'>
                    <FilterContact />

                    <ContactList />
                </div>
            </div>
        </section>
    );
};

export default HomePage;