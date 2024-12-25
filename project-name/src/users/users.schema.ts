import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop()
  nickname: string;

  @Prop()
  email: string;
}

export type UserDocument = HydratedDocument<User>;

