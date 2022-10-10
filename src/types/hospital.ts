import { UserPopulated } from "./user";

export interface Hospital {
    _id: string;
    name: string;
    image: string;
    user: string;
}

export interface HospitalPopulated {
    _id: string;
    name: string;
    image: string;
    user: UserPopulated;
}

export interface HospitalSelect {
    _id: string;
    name: string;
    image: string;
}

export interface HospitalPopulate {
    _id: string;
    name: string;
    image: string;
}

export interface GetHospitalsResp {
    hospitals: HospitalPopulated[];
    total: number;
}

export interface CreateHospitalResp {
    hospital: Hospital;
}

export interface UpdateHospitalResp {
    updated: boolean;
}

export interface DeleteHospitalResp {
    deleted: boolean;
}

export interface GetHospitalsSelectResp {
    hospitals: HospitalSelect[];
}