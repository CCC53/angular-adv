
export type ValidCollections =  'users' | 'doctors' | 'hospitals';

export interface SearchResp {
    total: number;
    data: any[];
}