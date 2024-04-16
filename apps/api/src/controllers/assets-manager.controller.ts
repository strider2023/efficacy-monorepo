import { Post, Route, Tags, Get, Request, Queries, UploadedFile, FormField, Middlewares, Security, Controller, Path, Delete } from "tsoa";
import { AssetsManagerService } from "../services";
import express from "express";
import { AppGetAll, AppQueryParams } from "@efficacy/interfaces";
import * as path from "path";
import * as fs from 'fs';
import { ApiError } from "@efficacy/exceptions";
import { multerMiddleware } from "@efficacy/middlewares";
import { Assets } from "@efficacy/schemas";

@Route("api/assets")
@Tags("Efficacy Assets Manager APIs")
export class AssetsManagerController extends Controller {

    @Get()
    @Security("jwt", ["admin"])
    public async getFiles(
        @Queries() queryParams: AppQueryParams
    ): Promise<AppGetAll> {
        return await new AssetsManagerService(undefined).getAll(queryParams);
    }

    @Post("upload")
    @Middlewares(multerMiddleware)
    public async uploadFile(
        @Request() request: any,
        @FormField() path?: string,
        @FormField() description?: string,
        @FormField() tags?: string[],
        // @UploadedFile() file?: Express.Multer.File,
    ): Promise<any> {
        console.log(request.file);
        return await new AssetsManagerService(undefined).uploadFile(
            request.file,
            description,
            tags);
    }

    @Get("{assetId}")
    public async getFile(
        @Request() request: express.Request,
        @Path() assetId: string,
    ) {
        try {
            const assetDetails = await new AssetsManagerService(undefined).get(assetId, 'assetId');
            const filePath = path.join(__dirname, '../../', assetDetails.destination, assetDetails.assetId);
            const res = request.res;
            res?.status(200);
            res?.set('Cross-Origin-Resource-Policy', 'cross-origin');
            res?.setHeader('Content-disposition', 'attachment; filename=' + assetDetails.filename);
            res?.setHeader('Content-type', assetDetails.mimetype);
            res?.setHeader('Cache-Control', 'no-cache');
            const stream = fs.createReadStream(filePath);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            stream.pipe(res);
            await new Promise<void>((resolve, reject) => {
                stream.on('end', () => {
                    res?.end();
                    resolve();
                })
            })
        } catch (e) {
            throw new ApiError("Download Asset error", 500, e.message);
        }
    }

    @Get("{assetId}/metadata")
    @Security("jwt")
    public async getMetadata(
        @Path() assetId: string,
    ): Promise<Assets> {
        return new AssetsManagerService(undefined).get(assetId, 'assetId');
    }

    @Delete("{assetId}")
    public async deleteFile(
        @Request() request: any,
        @Path() assetId: string,
    ) {
        try {
            const assetDetails = await new AssetsManagerService(undefined).get(assetId, 'assetId');
            const filePath = path.join(__dirname, '../../', assetDetails.destination, assetDetails.assetId);
            fs.unlinkSync(filePath);
            await new AssetsManagerService(undefined).delete(assetId, 'assetId');
        } catch (e) {
            throw new ApiError("Delete Asset error", 500, e.message);
        }
    }
}