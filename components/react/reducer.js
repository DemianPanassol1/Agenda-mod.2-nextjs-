const contactReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CONTACTS':
            return {
                ...state,
                contacts: action.data,
                isLoading: false
            };

        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.data, ...state.contacts],
                isLoading: false
            };

        case 'SET_ERROR':
            return {
                ...state,
                contactError: action.data,
                isLoading: false
            };

        case 'SET_SUCCESS':
            return {
                ...state,
                contactSuccess: action.data,
                isLoading: false
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case 'RESET_MESSAGE':
            return {
                ...state,
                contactSuccess: null,
                contactError: null,
                isLoading: false
            };

        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.data),
                isLoading: false
            };

        case 'FILTER_CONTACTS':
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.data}`, 'gi');

                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };

        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.data._id ? action.data : contact),
                isLoading: false
            };

        case 'UPDATE_FILTER_ON_EDITING':
            return {
                ...state,
                filtered: state.filtered.map((contact) => {
                    return contact._id === action.data._id ? action.data : contact
                })
            };

        case 'CLEAR_FILTER':
            return {
                ...state,
                filtered: null
            }

        case 'SET_CURRENT':
            return {
                ...state,
                current: action.data
            };

        case 'CLEAR_CURRENT':
            return {
                ...state,
                current: null
            };

        default:
            return state;
    };
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: !state.isLoading
            };

        case 'SET_SUCCESS':
            return {
                ...state,
                success: action.data,
                isLoading: false
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.data,
                isLoading: false
            };

        case 'RESET_ALL':
            return {
                ...state,
                success: null,
                error: null,
                isLoading: false
            };

        default:
            return state;
    };
};

export { contactReducer, userReducer };