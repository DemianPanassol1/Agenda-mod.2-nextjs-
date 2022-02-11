import { getSession } from 'next-auth/client';
import Link from 'next/link';
import React, { useContext, useRef } from 'react';
import { dispatchUserContext } from '../../components/react/context';
import Button from '../../components/UI/user_auth/Button';

function Register() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confPassword = useRef();

    const { userRegister, userLogin } = useContext(dispatchUserContext);

    const setFormSubmit = async (e) => {
        e.preventDefault();

        const info = {
            email: email.current.value,
            name: name.current.value,
            password: password.current.value,
            passwordConfirmation: confPassword.current.value
        };

        if (await userRegister(info)) {
            userLogin(info.email, info.password);
        };
    };

    return (
        <main className='container mx-auto mt-10 md:mt-14'>
            <form
                className='max-w-md rounded mx-4 py-8 px-4 sm:mx-auto bg-slate-50 shadow-md'
                onSubmit={setFormSubmit}
            >
                <div className='flex flex-col mb-6'>
                    <label htmlFor='name' className='text-lg mb-3 font-semibold'>Nome</label>
                    <input
                        type="text"
                        ref={name}
                        id='name'
                        placeholder='nome'
                        autoComplete='name'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='flex flex-col mb-6'>
                    <label htmlFor='email' className='text-lg mb-3 font-semibold'>Email</label>
                    <input
                        type="text"
                        ref={email}
                        id='email'
                        placeholder='email'
                        autoComplete='email'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='flex flex-col mb-10'>
                    <label htmlFor='password' className='text-lg mb-3 font-semibold'>Senha</label>
                    <input
                        type="password"
                        ref={password}
                        id='password'
                        autoComplete='password'
                        placeholder='senha'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='flex flex-col mb-10'>
                    <label htmlFor='confPassword' className='text-lg mb-3 font-semibold'>Confirmar senha</label>
                    <input
                        type="password"
                        ref={confPassword}
                        id='confPassword'
                        autoComplete='password'
                        placeholder='confirme sua senha'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <Button text={"Registrar-se"} />

                <div className='text-center mt-6 text-blue-600 hover:text-blue-900 text-base'>
                    <Link href="/login">Já é cadastrado? Clique aqui</Link>
                </div>
            </form>
        </main>
    );
};

export default Register;

export async function getServerSideProps(context) {

    const session = await getSession({
        req: context.req
    });

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    };

    return {
        props: {}
    };
};