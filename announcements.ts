import broadcast from "./parquet/broadcast.js";
import reaction from "./parquet/reaction.js";
import reply from "./parquet/reply.js";
import tombstone from "./parquet/tombstone.js";
import update from "./parquet/update.js";

import { DSNPParquetSchema } from "./types/dsnp-parquet.js";

export enum AnnouncementType {
  Tombstone = 0,
  Broadcast = 2,
  Reply = 3,
  Reaction = 4,
  Update = 6,
}

export type AnnouncementDescriptor = {
  announcementType: AnnouncementType;
  parquetSchema: DSNPParquetSchema;
  tombstoneAllowed: boolean;
};

export function descriptorForAnnouncementType(announcementType: AnnouncementType): AnnouncementDescriptor {
  switch (announcementType) {
    case AnnouncementType.Tombstone:
      return {
        announcementType: AnnouncementType.Tombstone,
        parquetSchema: tombstone,
        tombstoneAllowed: false,
      };
    case AnnouncementType.Broadcast:
      return {
        announcementType: AnnouncementType.Broadcast,
        parquetSchema: broadcast,
        tombstoneAllowed: true,
      };
    case AnnouncementType.Reply:
      return {
        announcementType: AnnouncementType.Reply,
        parquetSchema: reply,
        tombstoneAllowed: true,
      };
    case AnnouncementType.Reaction:
      return {
        announcementType: AnnouncementType.Reaction,
        parquetSchema: reaction,
        tombstoneAllowed: false,
      };
    case AnnouncementType.Update:
      return {
        announcementType: AnnouncementType.Update,
        parquetSchema: update,
        tombstoneAllowed: false,
      };
  }
  throw new Error("Invalid enum value");
}
