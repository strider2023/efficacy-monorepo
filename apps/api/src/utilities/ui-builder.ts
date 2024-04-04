import { ApiError } from "@efficacy/exceptions";
import { WebUIBuilder } from "./web-ui-builder";
import { CollectionProperty } from "@efficacy/schemas";

export class UIBuilder {
    static async getConfig(adatper: string, props: CollectionProperty[]): Promise<any> {
        if (adatper === 'web') {
            return new WebUIBuilder().getUIConfig(props);
        } else {
            throw new ApiError("Page Config Error", 500, 'Invalid adapter type');
        }
    }
}