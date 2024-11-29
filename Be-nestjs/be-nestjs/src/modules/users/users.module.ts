import { Module } from '@nestjs/common';
import { TypesService } from './users.service';
import { TypesController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
