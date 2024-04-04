import axios from "axios";
import { IAccessGroup, ICreateAccessGroup } from "../interfaces";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getAccessGroups(token: string): Promise<IAccessGroup[]> {
    const response = await axios.get(baseURL + '/api/roles', {
        headers: {
            Authorization: `${token}`,
        },
    });
    const data: IAccessGroup[] = response.data;
    return data;
}

export async function createAccessGroups(token: string, request: unknown): Promise<IAccessGroup> {
    const response = await axios.post(baseURL + '/api/roles', request, {
        headers: {
            Authorization: `${token}`,
        }
    });
    const data: IAccessGroup = response.data;
    return data;
}