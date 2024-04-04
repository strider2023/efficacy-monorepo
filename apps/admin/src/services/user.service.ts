import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function fetchUsersData(
    token: string
): Promise<unknown> {
    const response = await axios.get(`${baseURL}/api/user`, {
        headers: {
            Authorization: `${token}`,
        },
    });
    return response.data;
}