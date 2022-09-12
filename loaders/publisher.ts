import { Types } from "mongoose";
import PublisherService from "../services/publisher";
import { groupBy } from "../utils/common";
const publisherService = new PublisherService();

export const fetchPublisherByNews = async (publisherIds: Types.ObjectId[]) => {
  const data = await publisherService.list({
    condition: {
      _id: { $in: publisherIds },
    },
  });
  return groupBy(data.data, publisherIds);
};
