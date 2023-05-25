import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Track, TrackDocument} from "./shemas/track.schema";
import {Model, ObjectId} from "mongoose";
import {CreateTrackDto} from "./dto/create-track.dto";
import {FileService, FileType} from "../file/file.service";
import {CommentService} from "../comment/comment.service";
import {CreateCommentDto} from "../comment/dto/create-comment.dto";
import {Comment} from "../comment/schemas/comment.schema";

@Injectable()
export class TrackService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private fileService: FileService,
        private commentService: CommentService
    ) {}

    async create(
        dto: CreateTrackDto,
        audio: Express.Multer.File,
        image: Express.Multer.File,
    ): Promise<Track> {
        const audioPath = this.fileService.storeFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.storeFile(FileType.IMAGE, image);
        const track = await this.trackModel.create({
            ...dto,
            listens: 0,
            audio: audioPath,
            picture: picturePath,
        });
        return track;
    }

    async getAll(): Promise<Track[]> {
        const tracks = await this.trackModel.find();
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }

    async delete(id: ObjectId): Promise<void> {
        await this.trackModel.findByIdAndDelete(id);
    }

    async addComment(trackId: ObjectId, commentDto: CreateCommentDto): Promise<Comment> {
        const comment = await this.commentService.create(commentDto);
        const track = await this.trackModel.findById(trackId);
        track.comments.push(comment);
        await track.save();
        return comment;
    }

    async listen(id: ObjectId): Promise<void> {
        const track = await this.trackModel.findById(id);
        track.listens +=1;
        track.save();
    }
}