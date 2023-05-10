import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@spotify.xrkqaw5.mongodb.net/?retryWrites=true&w=majority`),
        TrackModule
    ]
})
export class AppModule {}
