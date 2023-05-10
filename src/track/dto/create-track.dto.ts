import {IsNotEmpty, Length} from "class-validator";

export class CreateTrackDto {

    @IsNotEmpty()
    @Length(4)
    readonly name;

    @IsNotEmpty()
    @Length(4)
    readonly artist;

    @IsNotEmpty()
    @Length(4)
    readonly text;
}