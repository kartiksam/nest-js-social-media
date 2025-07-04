import { Module } from '@nestjs/common';

import { ActivityService } from './activity.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivityModel } from 'src/schema/activity-Schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Activity.name, schema: ActivityModel }])],
  controllers: [],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule { }
