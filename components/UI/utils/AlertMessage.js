import React, { useContext, useEffect, useState } from 'react';
import { contactContext, dispatchContactContext, dispatchUserContext, userContext } from '../../react/context';
import { Transition } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function AlertMessage() {

    const { success, error } = useContext(userContext);
    const { resetAll } = useContext(dispatchUserContext);

    const { contactSuccess, contactError } = useContext(contactContext);
    const { resetMessage } = useContext(dispatchContactContext);

    const color = (success || contactSuccess) !== null ? 'bg-green-700' : ((error || contactError !== null) && 'bg-red-500');

    const message = (success || contactSuccess) !== null ? (success || contactSuccess) : ((error || contactError !== null) && (error || contactError));

    const resetMessageButton = () => {
        if (success || error !== null) {
            return resetAll();
        };
        if (contactSuccess || contactError !== null) {
            return resetMessage();
        };
    };

    return message && (
        <Transition
            show={true}
            appear={true}
            as='div'
            className={`absolute z-10 left-2/4 -translate-x-2/4 top-40 sm:top-24 w-11/12 sm:w-8/12 md:w-7/12 lg:max-w-3xl flex items-center justify-between ${color} px-4 py-2 rounded-sm`}
            enter='transition-opacity duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <p className='text-white font-semibold'>
                {message}
            </p>
            <FontAwesomeIcon
                icon={faTimes}
                className="text-white cursor-pointer hover:text-gray-200"
                onClick={resetMessageButton}
            />
        </Transition>
    );
};

export default AlertMessage;
