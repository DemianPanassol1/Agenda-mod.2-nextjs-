import React, { useContext, useEffect, useRef } from 'react';
import { contactContext, dispatchContactContext } from '../../react/context';

function FilterContact() {
    const text = useRef('');

    const { filtered, current } = useContext(contactContext);
    const { filterContacts, clearFilter } = useContext(dispatchContactContext);

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        };

    }, [filtered, current]);

    const setOnChange = (e) => {
        if (text.current.value !== '') {
            filterContacts(e.target.value)
        } else {
            clearFilter();
        };
    };

    return (
        <form className='mx-4 md:mx-0'>
            <input
                ref={text}
                type="text"
                placeholder='Filtrar contatos'
                onChange={setOnChange}
                className='block w-full rounded border-gray-400 focus:border-blue-300 mb-4'
            />
        </form>
    );
};

export default FilterContact;