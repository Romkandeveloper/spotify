import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors,
    ParseUUIDPipe, Query,
} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {ObjectId} from "mongoose";
import {CreateCommentDto} from "../comment/dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('/tracks')
export class TrackController {

    constructor(
        private trackService: TrackService,
    ) {}

    @Post()
    @HttpCode(201)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(
        @Body() dto: CreateTrackDto,
        @UploadedFiles() files: { picture: Express.Multer.File[], audio: Express.Multer.File[] }
    ) {
        const { picture, audio } = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @Get()
    @HttpCode(200)
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number,
        @Query('query') query: string,
    ) {
        return this.trackService.getAll(count, offset, query);
    }

    @Get(':id')
    @HttpCode(200)
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id);
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    }

    @Post('/comment')
    @HttpCode(201)
    async addComment(@Body() dto: CreateCommentDto) {
        const comment = await this.trackService.addComment(dto.trackId, dto);
        return comment;
    }

    @Post('/listen/:id')
    @HttpCode(200)
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id);
    }
}
