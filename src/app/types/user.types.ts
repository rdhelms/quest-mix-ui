export interface IUser {
    id: number;
    username: string;
    password: string;
    provider?: string;
    displayname?: string;
    familyname?: string;
    givenname?: string;
    middlename?: string;
    emails: string[];
    photos: string[];
}
