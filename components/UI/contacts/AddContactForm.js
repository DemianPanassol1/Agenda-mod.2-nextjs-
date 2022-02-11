import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { contactContext, dispatchContactContext } from '../../react/context';

import toBase64 from '../utils/func/toBase64';

function AddContactForm() {
    const { current } = useContext(contactContext);
    const { addContact, updatateContact, clearCurrent } = useContext(dispatchContactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'pessoal',
        image: 'defaultImage'
    });

    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'pessoal',
                image: 'defaultImage'
            });
        };
    }, [current, setContact]);

    const delImage = useRef();

    const setOnChange = async (e) => {
        if (e.target.name === 'file') {

            if (e.target.files[0] !== undefined) {
                setFileName(e.target.files[0].name)
            };

            setContact({
                ...contact,
                image: await toBase64(e.target.files[0])
            });

        } else {
            setContact({
                ...contact,
                [e.target.name]: e.target.value
            });
        };
    };

    const setOnSubmit = async (e) => {
        e.preventDefault();

        if (current === null) {
            addContact(contact);

        } else {
            if (delImage.current.checked) {
                contact.image = 'defaultImage';
            };

            updatateContact(contact);
        };

        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'pessoal',
            image: 'defaultImage'
        });
        setFileName(null);
    };

    const { name, email, phone, type } = contact;

    return (
        <section className='w-full px-4 sm:px-0 sm:w-2/6'>
            <h1 className='mb-6 text-2xl text-black'>
                {current !== null ? 'Editar Contato' : 'Adicionar Contato'}
            </h1>

            <form className='' onSubmit={setOnSubmit}>
                <input
                    type="text"
                    name='name'
                    placeholder='Nome'
                    autoComplete='name'
                    className='block w-full rounded border-gray-400 focus:border-blue-300 mb-4'
                    value={name}
                    onChange={setOnChange}
                />

                <input
                    type="text"
                    name='email'
                    placeholder='Email'
                    autoComplete='email'
                    className='block w-full rounded border-gray-400 focus:border-blue-300 mb-4'
                    value={email}
                    onChange={setOnChange}
                />

                <input
                    type="text"
                    name='phone'
                    placeholder='Telefone'
                    autoComplete='phone'
                    className='block w-full rounded border-gray-400 focus:border-blue-300'
                    value={phone}
                    onChange={setOnChange}
                />

                <h5 className='mt-6 mb-2 text-sm font-semibold'>Esse é um contato:</h5>

                <div className='flex items-center'>
                    <input
                        type="radio"
                        name='type'
                        value='pessoal'
                        className='mr-2 cursor-pointer'
                        checked={type === 'pessoal'}
                        onChange={setOnChange}
                    />
                    <p>Pessoal</p>
                    <input
                        type="radio"
                        name='type'
                        value='profissional'
                        className='mr-2 ml-4 cursor-pointer'
                        checked={type === 'profissional'}
                        onChange={setOnChange}
                    />
                    <p>Profissional</p>
                </div>

                <small
                    className='text-sm'
                >
                    Deseja adicionar uma foto ao contato? <i>(opcional)</i>
                </small>

                <input
                    id='file'
                    type="file"
                    name='file'
                    accept='image/png, image/jpeg'
                    className='h-0 overflow-hidden w-0'
                    onChange={setOnChange}
                />

                <div className='flex mt-4 items-center'>
                    <label
                        className='w-fit hover:bg-blue-700 text-base font-medium bg-blue-400 border-none rounded-md text-white cursor-pointer outline-none py-2 px-3 relative transition duration-300 align-middle'
                        htmlFor='file'
                    >
                        Upload
                    </label>

                    {fileName !== null && (
                        <p className='italic ml-3 h-fit'>{fileName}</p>
                    )}
                </div>

                {current !== null && (
                    <Fragment>
                        <div className='flex items-center mt-4'>
                            <label
                                htmlFor='checkbox'
                                className='cursor-pointer'
                            >
                                Deseja excluir a imagem atual?
                            </label>
                            <input
                                type="checkbox"
                                ref={delImage}
                                id='checkbox'
                                className='ml-3 cursor-pointer'
                            />
                        </div>
                    </Fragment>
                )}

                <button
                    type='submit'
                    className='mt-10 w-full block bg-blue-400 hover:bg-blue-700 rounded py-2  text-white font-medium transition'
                >
                    {current === null ? 'Adicionar contato' : 'Atualizar contato'}
                </button>

                {current !== null && (
                    <button
                        type='button'
                        className='mt-4 w-full border-2 rounded bg-transparent hover:bg-blue-400 hover:text-white border-blue-400 text-blue-400 font-medium py-2 transition'
                        onClick={() => clearCurrent()}
                    >
                        Cancelar alterações
                    </button>
                )}
            </form>
        </section>
    );
};

export default AddContactForm;