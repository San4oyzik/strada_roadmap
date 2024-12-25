import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Genre {
  @Prop()
  title: string;
}

export type GenreDocument = HydratedDocument<Genre>;

