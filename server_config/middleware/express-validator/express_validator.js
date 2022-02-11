function validate(validations, validationResult) {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        };

        return next();
    };
};

export default validate;