import { FilterOperations } from "@efficacy/constants";

export interface AppResponse {
    status: number;
    message: string;
}

export interface AppQueryParams {
    properties?: string[];
    limit?: number;
    offset?: number;
    sortByProperty?: string;
    ascending?: boolean;
    showCount?: boolean;
    filterByProperty?: string;
    filterValue?: string;
    filterOperation?: FilterOperations
}

export interface AppGetAll {
    count?: number;
    result: any[];
}

export interface JsonSchema { 
    type: string;
    required: string[];
    properties: any 
}
