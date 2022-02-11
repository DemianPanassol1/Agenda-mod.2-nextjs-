import { createContext, useReducer } from "react";
import { signIn, signOut } from 'next-auth/client';
import axios from 'axios';

import { contactReducer, userReducer } from "./reducer";
import { useRouter } from "next/router";

const contactContext = createContext();
const dispatchContactContext = createContext();

function ContactProvider(props) {

    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        contactSuccess: null,
        contactError: null,
        isLoading: false
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const getContacts = async () => {
        dispatch({ type: 'SET_LOADING' });

        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: 'GET_CONTACTS',
                data: res.data
            });
        } catch (error) {
            setMessage('SET_ERROR', error.response.data.message);
        };
    };

    const addContact = async (contact) => {
        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: 'ADD_CONTACT',
                data: res.data
            });

            setMessage('SET_SUCCESS', 'Contato Adicionado');
        } catch (error) {
            setMessage('SET_ERROR', error.response.data.message);
        };
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({
                type: 'DELETE_CONTACT',
                data: id
            });

            setMessage('SET_SUCCESS', 'Contato deletado com sucesso');
        } catch (error) {
            setMessage('SET_ERROR', error.response.data.message);
        };
    };

    const updatateContact = async (contact) => {
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({
                type: 'UPDATE_CONTACT',
                data: res.data
            });

            if (state.filtered !== null) {
                dispatch({ type: 'UPDATE_FILTER_ON_EDITING', data: res.data });
            };

            setMessage('SET_SUCCESS', 'Contato editado com sucesso');

            clearCurrent();
        } catch (error) {
            setMessage('SET_ERROR', error.response.data.message);
        };
    };

    const filterContacts = (value) => {
        dispatch({
            type: 'FILTER_CONTACTS',
            data: value
        });
    };

    const clearFilter = () => {
        dispatch({ type: 'CLEAR_FILTER' });
    };

    const setCurrent = (data) => {
        dispatch({
            type: 'SET_CURRENT',
            data: data
        });
    };

    const clearCurrent = () => {
        dispatch({ type: 'CLEAR_CURRENT' });
    };

    const setMessage = (type, data, time = 6500) => {
        dispatch({ type: type, data: data });

        setTimeout(() => {
            resetMessage();
        }, time);
    };

    const resetMessage = () => {
        dispatch({ type: 'RESET_MESSAGE' });
    };

    return (
        <contactContext.Provider value={state}>
            <dispatchContactContext.Provider value={{ getContacts, addContact, deleteContact, updatateContact, filterContacts, setCurrent, clearCurrent, clearFilter, resetMessage }}>
                {props.children}
            </dispatchContactContext.Provider>
        </contactContext.Provider>
    );
};

export { ContactProvider, contactContext, dispatchContactContext };

const userContext = createContext();
const dispatchUserContext = createContext();

function UserProvider(props) {

    const initialState = {
        isLoading: false,
        success: null,
        error: null,
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    const { push } = useRouter();

    const userRegister = async (obj) => {

        dispatch({ type: 'SET_LOADING' });

        try {
            await axios.post('/api/auth/signup', obj, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return true;
        } catch (error) {
            setMessage('SET_ERROR', error.response.data.message);
            return false;
        };
    };

    const userLogin = async (email, password) => {

        dispatch({ type: 'SET_LOADING' });

        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password
        });

        if (res.error) {
            setMessage('SET_ERROR', res.error);
            return false;
        };

        setMessage('SET_SUCCESS', 'Conectado', 4000);
        push('/');
    };

    const userLogout = async () => {
        await signOut({ redirect: false });

        setMessage('SET_SUCCESS', 'Você foi desconectado com sucesso');

        push('/login');
    };

    const setMessage = (type, data, time = 6500) => {
        dispatch({ type: type, data: data });

        setTimeout(() => {
            resetAll();
        }, time);
    };

    const resetAll = () => {
        dispatch({ type: 'RESET_ALL' });
    };

    return (
        <userContext.Provider value={state}>
            <dispatchUserContext.Provider value={{ userRegister, userLogin, userLogout, setMessage, resetAll }}>
                {props.children}
            </dispatchUserContext.Provider>
        </userContext.Provider>
    );
};

export { UserProvider, userContext, dispatchUserContext };