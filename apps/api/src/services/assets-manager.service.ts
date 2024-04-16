import { EFFICACY_SCHEMA, TABLE_ASSETS } from "@efficacy/constants";
import { ApiError } from "@efficacy/exceptions";
import { BaseService } from "./base.service";
import { Assets } from "@efficacy/schemas";

export class AssetsManagerService extends BaseService<Assets>{

    constructor(email?: string) {
        super(`${EFFICACY_SCHEMA}.${TABLE_ASSETS}`, 'Assets', email)
    }

    public async uploadFile(file: Express.Multer.File,
        description?: string,
        tags?: string[]): Promise<any>{
        try {
            const request = {
                assetId: file.filename,
                filename: file.originalname,
                mimetype: file.mimetype,
                filesize: file.size,
                destination: file.destination,
                path: file.path,
                description: description,
                tags: tags
            }
            return await this.create(request, ['assetId']);
        } catch (e) {
            throw new ApiError(`Error creating entry for ${this.entityName}`, 500, e.message);
        }
    }
}