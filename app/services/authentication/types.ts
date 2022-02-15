export type AccountInfo = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type CreatedAccount = {
    data: {
        id: string;
        type: 'user';
        attributes: {
            email: string;
            first_name: string;
            last_name: string;
            store_credits: number;
            completed_orders: number;
        };
    };
};

export type AccountCredentials = {
    username: string;
    password: string;
};

export type AccountSession = {
    token_type: 'Bearer';
    expires_in: number;
    access_token: string;
    refresh_token: string;
    created_at: number;
};
