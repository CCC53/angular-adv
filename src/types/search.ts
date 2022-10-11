import { User } from "./user";
import { Hospital } from './hospital';
import { Doctor } from './doctor';

export type ValidCollections =  'users' | 'doctors' | 'hospitals';

export interface SearchResp {
    total: number;
    data: any[];
}

export interface GlobalSearchResp {
    users: User[];
    hospitals: Hospital[];
    doctors: Doctor[];
}