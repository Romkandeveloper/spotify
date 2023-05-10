import {ObjectId} from "mongoose";
import {IsNotEmpty, Length} from "class-validator";

export class CreateCommentDto {

    @IsNotEmpty()
    @Length(4)
    readonly username: string;

    @IsNotEmpty()
    @Length(4)
    readonly text: string;

    @IsNotEmpty()
    readonly trackId: ObjectId;
}