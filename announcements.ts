import broadcast from "./parquet/broadcast.json";
import reaction from "./parquet/reaction.json";
import reply from "./parquet/reply.json";
import tombstone from "./parquet/tombstone.json";
import update from "./parquet/update.json";

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
        parquetSchema: tombstone as DSNPParquetSchema,
        tombstoneAllowed: false,
      };
    case AnnouncementType.Broadcast:
      return {
        announcementType: AnnouncementType.Broadcast,
        parquetSchema: broadcast as DSNPParquetSchema,
        tombstoneAllowed: true,
      };
    case AnnouncementType.Reply:
      return {
        announcementType: AnnouncementType.Reply,
        parquetSchema: reply as DSNPParquetSchema,
        tombstoneAllowed: true,
      };
    case AnnouncementType.Reaction:
      return {
        announcementType: AnnouncementType.Reaction,
        parquetSchema: reaction as DSNPParquetSchema,
        tombstoneAllowed: false,
      };
    case AnnouncementType.Update:
      return {
        announcementType: AnnouncementType.Update,
        parquetSchema: update as DSNPParquetSchema,
        tombstoneAllowed: false,
      };
  }
  throw new Error("Invalid enum value");
}
