import { Document } from 'mongoose';

export interface Category extends Document {
    category_name: string;
    category_image: string;
    created_by: String;
}