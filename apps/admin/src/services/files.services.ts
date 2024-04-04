import axios from "axios";
import { IFile } from "../interfaces";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function fetchApplicationFiles(token: string): Promise<IFile[]> {
    const response = await axios.get(baseURL + '/api/assets', {
        headers: {
            Authorization: `${token}`,
        },
    });
    const data: IFile[] = response.data;
    return data;
}