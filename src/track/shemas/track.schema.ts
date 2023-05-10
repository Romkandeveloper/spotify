import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument, Types} from 'mongoose';
import {Comment} from "../../comment/schemas/comment.schema";

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: string;

    @Prop()
    track: string;

    @Prop()
    listeners: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);