import {Body, Controller, Delete, Get, HttpCode, Inject, Param, Post} from "@nestjs/common";
import {TrackService} from "./track.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {ObjectId} from "mongoose";
import {CreateCommentDto} from "../comment/dto/create-comment.dto";
import {CommentService} from "../comment/comment.service";
import {Comment} from "../comment/schemas/comment.schema";

@Controller('/tracks')
export class TrackController {

    constructor(
        private trackService: TrackService,
        private commentService: CommentService,
    ) {}

    @Post()
    @HttpCode(201)
    create(@Body() dto: CreateTrackDto) {
        return this.trackService.create(dto);
    }

    @Get()
    @HttpCode(200)
    getAll() {
        return this.trackService.getAll();
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

    @Post('comment')
    @HttpCode(201)
    async addComment(@Body() dto: CreateCommentDto) {
        const comment = await this.commentService.create(dto);
        await this.trackService.addComment(dto.trackId, comment);
        return comment;
    }
}
