import mongoose from 'mongoose';

import Contact from '../../../server_config/db/models/Contact';
import isAuthenticated from "../../../server_config/middleware/auth/isAuth";
import runMiddleware from '../../../server_config/middleware/init-middleware';
import validate from '../../../server_config/middleware/express-validator/express_validator';
import { requireEmail, requireName } from '../../../server_config/middleware/express-validator/validators';
import connectDB from '../../../server_config/db/db';
import { validationResult } from 'express-validator';

async function handler(req, res) {
    const { id } = req.userSession;

    const { contactID } = req.query;

    if (req.method === 'PUT') {

        await runMiddleware(req, res, validate([
            requireName,
            requireEmail
        ], validationResult)
        );

        await connectDB();

        const { name, email, phone, type, image } = req.body;

        const contactFilds = {};
        if (name) contactFilds.name = name;
        if (email) contactFilds.email = email;
        if (phone) contactFilds.phone = phone;
        if (type) contactFilds.type = type;
        if (image) contactFilds.image = image;

        try {
            let contact = await Contact.findById(contactID);

            if (!contact) {
                return res.status(404).json({ message: 'Contato não encontrado' });
            };

            if (contact.user.toString() !== id) {
                return res.status(401).json({ message: 'Acesso não autorizado' });
            };

            contact = await Contact.findByIdAndUpdate(contactID, { $set: contactFilds }, { new: true });

            mongoose.connection.close();
            req.userSession = null;
            res.status(201).json(contact);
        } catch (error) {
            req.userSession = null;
            res.status(500).json({ message: 'Erro no servidor' });
        };
    } else if (req.method === 'DELETE') {
        await connectDB();

        const contacts = await Contact.find({ user: id });

        const found = await contacts.find(contact => contact._id.toString() === contactID)

        let contact;

        if (!found) {
            contact = await Contact.findById(contactID);
        } else {
            contact = found;
        };
        
        if (!contact) {
            return res.status(404).json({ message: 'Contato não encontrado. Por favor, recarregue a página' });
        };

        if (contact.user.toString() !== id) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        };

        await Contact.findOneAndDelete(contact);

        mongoose.connection.close();
        req.userSession = null;
        res.status(201).json({ message: "Contato deletado com sucesso" });
    } else {
        req.userSession = null;
        return res.status(403).json({ message: 'Acesso não autorizado' });
    };
};

export default isAuthenticated(handler);