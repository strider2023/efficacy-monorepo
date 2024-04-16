import { Post, Route, Tags, Get, Put, Delete, Path, Body, Queries, Security, Controller, SuccessResponse, Request } from "tsoa";
import { RolesService, TemplateService } from "../services";
import { AppQueryParams, AppGetAll, CreateRole, UpdateRole, TableUISchema } from "@efficacy/interfaces";

@Route("api/template")
@Tags("Efficacy Templates APIs")
export class TemplatesController extends Controller {

    @Get("{templateId}/table")
    // @Security("jwt")
    public getUITableSchema(
        @Path() templateId: string,
    ): TableUISchema|undefined {
        return new TemplateService().getUITableSchema(templateId);
    }

    @Get("{templateId}")
    @Security("jwt")
    public async get(
        @Path() templateId: string,
    ): Promise<void> {
        // return new RolesService(undefined).get(rolesId, 'roleId');
    }

    @SuccessResponse("201", "Created")
    @Post()
    @Security("jwt")
    public async create(
        @Request() req: any,
        @Body() request: CreateRole
    ): Promise<void> {
        this.setStatus(201)
        // await new RolesService(req.user.email).create(request);
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
        // await new RolesService(req.user.email).update(request, rolesId, 'roleId');
        return;
    }

    @SuccessResponse("200", "Updated")
    @Delete("{rolesId}")
    @Security("jwt")
    public async delete(
        @Request() req: any,
        @Path() rolesId: string,
    ): Promise<void> {
        // await new RolesService(req.user.email).delete(rolesId, 'roleId');
        return;
    }
}