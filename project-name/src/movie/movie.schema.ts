import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DirectorDocument } from 'src/director/director.schema';
import { GenreDocument } from 'src/genre/genre.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop()
  title: string;

  @Prop()
  year: number;

  @Prop()
  duration: number; 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre'})
  genre: GenreDocument;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Director'})
  director: DirectorDocument;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
