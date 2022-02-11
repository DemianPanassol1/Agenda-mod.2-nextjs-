import React, { Fragment } from 'react';
import Head from 'next/head'
import { ContactProvider, UserProvider } from '../react/context';
import Navbar from '../UI/utils/Navbar';
import AlertMessage from '../UI/utils/AlertMessage';
import Loader from '../UI/utils/Loader';

function Layout(props) {
    return (
        <UserProvider>
            <ContactProvider>
                <Head>
                    <meta name='description' content='App criado com NextJS para criar e armazenar contatos de usuários logados'></meta>

                    <title>Agenda de Contatos com NextJS</title>
                </Head>
                <Navbar />
                <AlertMessage />
                {/* <Loader /> */}
                <Fragment>
                    {props.children}
                </Fragment>
            </ContactProvider>
        </UserProvider>
    );
};

export default Layout;
