import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'static'),
        }),
        MongooseModule.forRoot(`mongodb+srv://admin:admin@spotify.xrkqaw5.mongodb.net/?retryWrites=true&w=majority`),
        TrackModule
    ],
})
export class AppModule {}
