import {Module} from "@nestjs/common";
import {TrackController} from "./track.controller";
import {TrackService} from "./track.service";
import {CommentService} from "../comment/comment.service";
import {Track, TrackSchema} from "./shemas/track.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        CommentService
    ],
    controllers: [TrackController],
    providers: [TrackService],
})

export class TrackModule{}