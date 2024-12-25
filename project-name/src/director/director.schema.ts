import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Director {
  @Prop()
  name: string;
}

export type DirectorDocument = HydratedDocument<Director>;

