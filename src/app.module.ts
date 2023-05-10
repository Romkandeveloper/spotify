import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb+srv://admin:admin@spotify.xrkqaw5.mongodb.net/?retryWrites=true&w=majority`),
        TrackModule
    ]
})
export class AppModule {}
