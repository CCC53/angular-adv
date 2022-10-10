import { HospitalPopulate } from "./hospital";
import { UserPopulated } from "./user";

export interface Doctor {
    _id: string;
    name: string;
    image: string;
    hospital: string;
    user: string;
}

export interface DoctorPopulated {
    _id: string;
    name: string;
    image: string;
    user: UserPopulated;
    hospital: HospitalPopulate;
}

export interface GetDoctorsResp {
    doctors: DoctorPopulated[];
    total: number;
}

export interface GetDoctorResp {
    doctor: DoctorPopulated;
}

export interface DeleteDoctorResp {
    deleted: boolean;
}

export interface DoctorFormData {
    name: string;
    hospital: string;
}

export interface AddDoctorRes {
    doctor: Doctor;
}

export interface UpdateDoctorRes {
    updated: boolean;
}