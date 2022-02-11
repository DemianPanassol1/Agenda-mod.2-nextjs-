import { check } from "express-validator";

const requireName = check('name')
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage('O campo nome deve conter entre 5 e 40 caracteres');

const requireEmail = check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Deve ser um email válido');

const requirePassword = check('password')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('A senha deve conter entre 6 e 20 caracteres');


const requirePasswordConfirmation = check('passwordConfirmation')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não batem');
        };

        return true;
    });

export { requireName, requireEmail, requirePassword, requirePasswordConfirmation };