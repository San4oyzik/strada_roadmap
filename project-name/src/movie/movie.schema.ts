import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop()
  title: string;

  @Prop()
  year: number;

  @Prop([String])
  cast: Array<string>;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
