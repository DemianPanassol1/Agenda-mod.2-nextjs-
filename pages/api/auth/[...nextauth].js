import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import connectDB from '../../../server_config/db/db';
import User from '../../../server_config/db/models/User';

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    mongoose.connection.close();
                    throw new Error('Usuário não encontrado')
                };
                

                if (!await bcrypt.compare(credentials.password, user.password)) {
                    mongoose.connection.close();
                    throw new Error('Email e/ou senha estão incorretos')
                };

                mongoose.connection.close();

                return user;
            }
        })
    ]
});
