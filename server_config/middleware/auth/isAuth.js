import { getSession } from 'next-auth/client';
import connectDB from '../../db/db';
import User from '../../db/models/User';

function isAuthenticated(handler) {
    return async (req, res) => {

        const session = await getSession({ req: req });

        if (!session) {
            return res.status(401).json({ message: 'Para acessar esta página você deve estar autenticado' });
        };

        await connectDB();

        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return res.status(403).json({ message: 'Os dados da sua sessão não são válidos' });
        };

        session.user.id = user._id.toString();

        req.userSession = session.user;

        return handler(req, res);
    };
};

export default isAuthenticated;
