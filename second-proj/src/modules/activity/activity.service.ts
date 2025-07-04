/**
 *  Service responsible for logging user activities to the database
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActitvityDocument, Activity } from 'src/schema/activity-Schema';

@Injectable()

export class ActivityService {

    constructor(@InjectModel(Activity.name) private activityModel: Model<ActitvityDocument>) { }

    async logActivity(params: {
        userId: string;
        action: string;
        resource: string;
        description?: string;
        payload?: any;
    }) {
        const { userId, action, resource, description, payload } = params;
        return this.activityModel.create({
            userId,
            action,
            resource,
            description,
            payload,
        });
    }

}
