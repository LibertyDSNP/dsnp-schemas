import broadcast from "./parquet/broadcast.js";
import reaction from "./parquet/reaction.js";
import reply from "./parquet/reply.js";
import tombstone from "./parquet/tombstone.js";
import update from "./parquet/update.js";
import userAttributeSet from "./parquet/user-attribute-set.js";
import dsnpContentAttributeSet from "./parquet/dsnp-content-attribute-set.js";
import externalContentAttributeSet from "./parquet/external-content-attribute-set.js";

import { DSNPParquetSchema } from "./types/dsnp-parquet.js";

export enum AnnouncementType {
  Tombstone = 0,
  Broadcast = 2,
  Reply = 3,
  Reaction = 4,
  Update = 6,
  UserAttributeSet = 8,
  DSNPContentAttributeSet = 9,
  ExternalContentAttributeSet = 10,
}

export type AnnouncementDescriptor = {
  announcementType: AnnouncementType;
  parquetSchema: DSNPParquetSchema;
  tombstoneAllowed: boolean;
};

export function descriptorForAnnouncementType(announcementType: AnnouncementType): AnnouncementDescriptor {
  const base = {
    announcementType,
    tombstoneAllowed: false,
  };

  switch (announcementType) {
    case AnnouncementType.Tombstone:
      return {
        ...base,
        parquetSchema: tombstone,
      };
    case AnnouncementType.Broadcast:
      return {
        ...base,
        parquetSchema: broadcast,
        tombstoneAllowed: true,
      };
    case AnnouncementType.Reply:
      return {
        ...base,
        parquetSchema: reply,
        tombstoneAllowed: true,
      };
    case AnnouncementType.Reaction:
      return {
        ...base,
        parquetSchema: reaction,
      };
    case AnnouncementType.Update:
      return {
        ...base,
        parquetSchema: update,
      };
    case AnnouncementType.UserAttributeSet:
      return {
        ...base,
        parquetSchema: userAttributeSet,
        tombstoneAllowed: true,
      };
    case AnnouncementType.DSNPContentAttributeSet:
      return {
        ...base,
        parquetSchema: dsnpContentAttributeSet,
        tombstoneAllowed: true,
      };
    case AnnouncementType.ExternalContentAttributeSet:
      return {
        ...base,
        parquetSchema: externalContentAttributeSet,
        tombstoneAllowed: true,
      };
  }
  throw new Error("Invalid enum value");
}
