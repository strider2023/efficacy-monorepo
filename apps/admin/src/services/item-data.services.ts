import axios from "axios";
import { ICollectionItems } from "../interfaces";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function fetchItemData(
    collectionName: string,
    limit: number,
    offset: number
): Promise<ICollectionItems> {
    const response = await axios.get(`${baseURL}/api/collection/${collectionName}/items?showAttributes=true&showCount=true&limit=${limit}&offset=${offset}`);
    return response.data;
}