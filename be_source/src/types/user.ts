import {Document} from 'mongoose';

export interface User extends Document {
    user_name: string;
    email: string;
    readonly password: string;
}