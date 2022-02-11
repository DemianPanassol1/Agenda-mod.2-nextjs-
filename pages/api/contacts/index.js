import mongoose from 'mongoose';
import isAuthenticated from '../../../server_config/middleware/auth/isAuth';
import { validationResult } from 'express-validator';

import connectDB from '../../../server_config/db/db';
import Contact from '../../../server_config/db/models/Contact';
import runMiddleware from '../../../server_config/middleware/init-middleware';
import validate from '../../../server_config/middleware/express-validator/express_validator';
import { requireEmail, requireName } from '../../../server_config/middleware/express-validator/validators';

async function handler(req, res) {
    const { id } = req.userSession;

    if (req.method === 'GET') {
        try {
            await connectDB();

            const contacts = await Contact.find({ user: id }).sort({ date: -1 });

            req.userSession = null;
            
            mongoose.connection.close();
            res.status(201).json(contacts);
        } catch (error) {
            console.log(error.message, 'linha 25 contacts/index.js');

            req.userSession = null;
            res.status(500).json({ message: 'Erro no servidor' });
        };

    } else if (req.method === 'POST') {

        await runMiddleware(req, res, validate([
            requireName,
            requireEmail
        ], validationResult)
        );

        const { name, email, phone, type, image } = req.body;

        try {
            const newContact = new Contact({
                name: name,
                email: email,
                phone: phone,
                type: type,
                image: image,
                user: id
            });

            const contact = await newContact.save();
            mongoose.connection.close();

            res.status(201).json(contact);
        } catch (error) {
            console.log("linha 54 do contacts/index", error);
            res.status(500).json({ message: 'Erro no servidor' });
        };
    } else {
        return res.status(403).json({ message: 'Acesso não autorizado' });
    };
};

export default isAuthenticated(handler);
