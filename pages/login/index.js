import Link from 'next/link';
import React, { useContext, useRef } from 'react';
import { dispatchUserContext } from '../../components/react/context';
import Button from '../../components/UI/user_auth/Button';
import { getSession } from 'next-auth/client';

function Login() {
    const email = useRef();
    const password = useRef();

    const { userLogin } = useContext(dispatchUserContext);

    const setFormSubmit = (e) => {
        e.preventDefault();

        userLogin(email.current.value, password.current.value);
    };

    return (
        <main className='container mx-auto mt-10 md:mt-20'>
            <form
                className='max-w-md rounded mx-4 py-8 px-4 sm:mx-auto bg-slate-50 shadow-md'
                onSubmit={setFormSubmit}
            >
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
                        placeholder='senha'
                        autoComplete='password'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <Button text={'Entrar'} />

                <div className='text-center mt-6 text-blue-600 hover:text-blue-900 text-base'>
                    <Link href="/register">Não possui conta? Clique aqui</Link>
                </div>
            </form>
        </main>
    );
};

export default Login;

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