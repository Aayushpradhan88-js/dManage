import { IStatus } from "../../global/types/type"

export interface IInstituteState {
    instituteName: string,
    instituteEmail: string,
    institutePhoneNumber: string,
    institutePhoneCountry: "NP" | "IN" | "US" | "CA",
    instituteAddress: string,
    instituteVatNumber?: string,
    institutePanNumber?: string,
};

export interface IInstituteInitialState {
    institute: IInstituteState,
    status: IStatus
};
