import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import connectDB from '../../../server_config/db/db';
import User from '../../../server_config/db/models/User';

import runMiddleware from '../../../server_config/middleware/init-middleware';
import validate from '../../../server_config/middleware/express-validator/express_validator';
import { requireEmail, requireName, requirePassword, requirePasswordConfirmation } from '../../../server_config/middleware/express-validator/validators';

async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(403).json({ message: 'Acesso não autorizado' })
    };
    
    await runMiddleware(req, res, validate(
        [
            requireEmail,
            requireName,
            requirePassword,
            requirePasswordConfirmation
        ], validationResult)
    );

    await connectDB();

    const { name, email, password } = req.body;

    if (await User.findOne({ email: email })) {
        mongoose.connection.close();

        return res.status(422).json({ message: 'Usuário já cadastrado com esse email' });
    };

    const newUser = new User({
        name: name,
        email: email,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10))
    });

    await newUser.save();

    mongoose.connection.close();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
};

export default handler;