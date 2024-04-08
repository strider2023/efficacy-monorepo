import { Post, Route, Tags, Get, Put, Delete, Path, Body, Queries, Security, Controller, SuccessResponse, Request } from "tsoa";
import { RolesService } from "../services";
import { AppQueryParams, AppGetAll, CreateRole, UpdateRole, TableUISchema } from "@efficacy/interfaces";
import { BaseSchema, Roles } from "@efficacy/schemas";

@Route("api/roles")
@Tags("Efficacy Roles APIs")
export class RolesController extends Controller {

    @Get("schema")
    // @Security("jwt")
    public getUITableSchema(): TableUISchema {
        return new RolesService(undefined).getUITableSchema();
    }

    @Get()
    @Security("jwt")
    public async getAll(
        @Queries() queryParams: AppQueryParams
    ): Promise<AppGetAll> {
        return new RolesService(undefined).getAll(queryParams);
    }

    @Get("{rolesId}")
    @Security("jwt")
    public async get(
        @Path() rolesId: string,
    ): Promise<Roles> {
        return new RolesService(undefined).get(rolesId, 'roleId');
    }

    @SuccessResponse("201", "Created")
    @Post()
    @Security("jwt")
    public async create(
        @Request() req: any,
        @Body() request: CreateRole
    ): Promise<void> {
        this.setStatus(201)
        await new RolesService(req.user.email).create(request);
        return;
    }

    @SuccessResponse("200", "Updated")
    @Put("{rolesId}")
    @Security("jwt")
    public async update(
        @Request() req: any,
        @Path() rolesId: string,
        @Body() request: UpdateRole
    ): Promise<void> {
        await new RolesService(req.user.email).update(request, rolesId, 'roleId');
        return;
    }

    @SuccessResponse("200", "Updated")
    @Delete("{rolesId}")
    @Security("jwt")
    public async delete(
        @Request() req: any,
        @Path() rolesId: string,
    ): Promise<void> {
        await new RolesService(req.user.email).delete(rolesId, 'roleId');
        return;
    }
}