import React, { useContext, useEffect, useState } from 'react';
import { getSession } from "next-auth/client";
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { dispatchUserContext } from '../../react/context';

function Navbar() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { userLogout } = useContext(dispatchUserContext);

    useEffect(() => {
        getSession().then(session => {
            if (session) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            };
        });
    });

    const authLinks = (
        <ul className='flex text-white'>
            <li
                className='border-b-2 border-transparent hover:border-white mr-5 cursor-pointer'
                onClick={() => userLogout()}
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                <span>Logout</span>
            </li>
            <li className='border-b-2 border-transparent hover:border-white'>
                <Link href='/about'>About</Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className='flex text-white text-lg'>
            <li className='border-b-2 border-transparent hover:border-white mr-5'>
                <Link href='/about'>About</Link>
            </li>
            <li className='border-b-2 border-transparent hover:border-white mr-5'>
                <Link href='/register'>Register</Link>
            </li>
            <li className='border-b-2 border-transparent hover:border-white'>
                <Link href='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <header>
            <div className='flex flex-col sm:flex-row py-8 sm:py-5 px-4 md:px-8 bg-blue-400 justify-between items-center'>
                <div className='flex items-center'>
                    <FontAwesomeIcon icon={faAddressBook} className="mr-3 text-2xl text-white" />
                    <h1 className='text-white font-semibold text-2xl tracking-tight'>
                        Agenda <span className='hidden md:inline-block'>de Contatos</span> NextJS
                    </h1>
                </div>

                <nav className='mt-4 sm:mt-0'>
                    {isAuthenticated ? authLinks : guestLinks}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
