import axios from "axios";
import { ICollection } from "../interfaces";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function fetchCollections(token: string): Promise<ICollection[]> {
  const response = await axios.get(baseURL + '/api/collection?properties=id&properties=collectionId&properties=displayName&properties=description&properties=schemaName&properties=tableName&&properties=status', {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data: ICollection[] = response.data;
  return data;
}

export async function createCollection(token: string, request: unknown): Promise<unknown> {
  const response = await axios.post(baseURL + '/api/collection', request, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data;
}

export async function fetchCollection(token: string, collectionName: string): Promise<unknown> {
  const response = await axios.get(`${baseURL}/api/collection/${collectionName}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data: unknown = response.data;
  return data;
}

export async function fetchCollectionProperties(token: string, collectionName: string): Promise<unknown> {
  const response = await axios.get(`${baseURL}/api/collection/${collectionName}/properties`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data: unknown = response.data;
  return data;
}

export async function fetchTemplate(collectionId: string): Promise<unknown> {
  const response = await axios.get(baseURL + `/api/collection/${collectionId}/property/web/template`, {
  });
  return response.data;
}