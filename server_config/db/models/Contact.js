import mongoose from 'mongoose';

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: 'pessoal',
    },
    image: {
        type: String
    }
});


const Contact = mongoose.models.contacts || mongoose.model('contacts', ContactSchema);

export default Contact;