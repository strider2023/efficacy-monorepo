
import { Body, Controller, Delete, Get, Path, Post, Put, Queries, Route, SuccessResponse, Tags } from "tsoa";
import { ItemsService } from "../services";
import { CollectionItems, CollectionItemsQuery } from "@efficacy/interfaces";

@Route("api/collection")
@Tags("Efficacy Collection Item APIs")
export class ItemController extends Controller {

    @Get("{collectionId}/items")
    public async getCollectionItems(
        @Path() collectionId: string,
        @Queries() query: CollectionItemsQuery
    ): Promise<CollectionItems> {
        const response: CollectionItems = await new ItemsService().getAll(collectionId, query);
        if (query.showAttributes) {
            response.attributes = await new ItemsService().getCollectionProperties(collectionId);
        }
        return response;
    }

    @Get("{collectionId}/item/{itemId}")
    public async getCollectionItem(
        @Path() collectionId: string,
        @Path() itemId: string,
    ): Promise<Record<string, any>|undefined> {
        return await new ItemsService().get(collectionId, itemId);
    }

    @SuccessResponse("201", "Created") 
    @Post("{collectionId}/item")
    public async createCollectionItem(
        @Path() collectionId: string,
        @Body() request: Record<string, any>
    ): Promise<void> {
        this.setStatus(201)
        await new ItemsService().create(collectionId, request);
        return;
    }

    @SuccessResponse("200", "Updated") 
    @Put("{collectionId}/item/{itemId}")
    public async updateCollectionItem(
        @Path() collectionId: string,
        @Path() itemId: string,
        @Body() request: Record<string, any>
    ): Promise<void> {
        await new ItemsService().update(collectionId, itemId, request);
        return;
    }

    @SuccessResponse("200", "Entry removed successfully.") 
    @Delete("{collectionId}/item/{itemId}")
    public async removeCollectionItem(
        @Path() collectionId: string,
        @Path() itemId: string,
    ): Promise<void> {
        await new ItemsService().delete(collectionId, itemId);
        return;
    }
}