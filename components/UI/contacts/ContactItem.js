import React, { useContext } from 'react';
import { Transition } from '@headlessui/react';

import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { dispatchContactContext } from '../../react/context';

function ContactItem({ data }) {

    const { deleteContact, setCurrent } = useContext(dispatchContactContext);

    const { _id, name, email, phone, type, image } = data;

    return (
        <Transition
            show={true}
            appear={true}
            as='section'
            className='mx-4 sm:mx-0 mb-6 rounded shadow-md bg-gray-50 p-4'
            enter='transition-opacity duration-1000'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >

            <div className='flex items-start justify-between'>
                <div className='flex items-center'>
                    {image === "defaultImage" ? (
                        <span
                            className='w-10 h-10 relative overflow-hidden rounded-full bg-gray-100 mr-2'
                        >
                            <Image
                                src="/images/perfil_image.png"
                                layout='fill'
                                objectPosition='center'
                                objectFit='cover'
                                alt="Imagem de perfil genérica"
                            />
                        </span>
                    ) : (
                        <span
                            className='w-10 h-10 relative overflow-hidden rounded-full bg-gray-100 mr-2'
                        >
                            <Image
                                src={image}
                                layout='fill'
                                objectPosition='center'
                                objectFit='cover'
                                alt={`Foto do contato ${name}`}
                            />
                        </span>
                    )}
                    <p className='italic'>{name}</p>
                </div>

                <span
                    className={`text-white rounded shadow-md px-4 cursor-default ${type === 'profissional' ? 'bg-green-600' : 'bg-blue-600'}`}
                >
                    <small className='text-xs capitalize font-medium'>{type}</small>
                </span>

            </div>

            <div className='flex mt-4 items-center'>
                <FontAwesomeIcon icon={faPhone} color="#3F69FA" />
                <p className='ml-2'>{phone !== "" && phone}</p>
            </div>

            <div className='flex items-center'>
                <FontAwesomeIcon icon={faMailBulk} color="#3F69FA" />
                <p className='ml-2'>{email !== "" && email}</p>
            </div>

            <div className="flex justify-end mt-2">
                <button onClick={() => setCurrent(data)} className="bg-blue-600 px-4 transition py-1 rounded hover:bg-blue-800 text-white mr-3">Editar</button>
                <button onClick={() => deleteContact(_id)} className="bg-red-600 px-4 transition py-1 rounded hover:bg-red-800 text-white">Excluir</button>
            </div>
        </Transition>
    );
};

export default ContactItem;