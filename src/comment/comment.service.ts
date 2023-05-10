import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async create(dto: CreateCommentDto): Promise<Comment> {
        return await this.commentModel.create({...dto});
    }
}