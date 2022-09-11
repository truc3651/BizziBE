import PublisherService from "../services/publisher";
import { groupBy } from "../utils/common";
const publisherService = new PublisherService();

export const fetchPublisherByNews = async (publisherIds) => {
  const data = await publisherService.list({
    condition: {
      _id: { $in: publisherIds },
    },
    limit: 100,
  });
  return groupBy(data.data, publisherIds);
};
