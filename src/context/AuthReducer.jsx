// src/reducers/authReducer.js
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case 'AUTH_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            };

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null
            };
        
        case 'AUTH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                error: null
            };
        
        case 'DELETE_ACCOUNT_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case 'DELETE_ACCOUNT_SUCCESS':
            return {
                ...state,
                user: null,
                loading: false,
                error: null
            };
        
        case 'DELETE_ACCOUNT_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        
        default:
            return state;
    }
};
