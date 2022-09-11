import PublisherService from "../services/publisher";
import { LoginPayload } from "../interfaces/publisher.types";
import { ListPayload } from "../interfaces/repository.interface";

const publisherService = new PublisherService();

export const loginResolver = (payload: LoginPayload) =>
  publisherService.login(payload);

export const listPublisherResolver = (args: ListPayload) =>
  publisherService.listPublishers(args);
