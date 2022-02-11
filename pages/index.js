import React from 'react';
import { getSession } from 'next-auth/client';
import HomePage from '../components/UI/user_auth/HomePage';

function index({ user }) {

  return <HomePage user={user} />;
};

export default index;

export async function getServerSideProps(context) {

  const session = await getSession({
    req: context.req
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  };

  return {
    props: session
  };
};