import broadcast from "./parquet/broadcast.js";
import profile from "./parquet/profile.js";
import reaction from "./parquet/reaction.js";
import reply from "./parquet/reply.js";
import tombstone from "./parquet/tombstone.js";
import update from "./parquet/update.js";

import GraphEdge from "./avro/GraphEdge.js";
import PRId from "./avro/PRId.js";
import PublicKey from "./avro/PublicKey.js";

import { DSNPParquetSchema } from "./types/dsnp-parquet.js";
import { Schema } from "avsc";

export type AnnouncementDescriptor = {
  announcementType: number;
  parquetSchema: DSNPParquetSchema;
  tombstoneAllowed: boolean;
};

export const Announcement: { [name: string]: AnnouncementDescriptor } = {
  tombstone: {
    announcementType: 0,
    parquetSchema: tombstone,
    tombstoneAllowed: false,
  },
  broadcast: {
    announcementType: 2,
    parquetSchema: broadcast,
    tombstoneAllowed: true,
  },
  reply: {
    announcementType: 3,
    parquetSchema: reply,
    tombstoneAllowed: true,
  },
  reaction: {
    announcementType: 4,
    parquetSchema: reaction,
    tombstoneAllowed: false,
  },
  profile: {
    announcementType: 5,
    parquetSchema: profile,
    tombstoneAllowed: false,
  },
  update: {
    announcementType: 6,
    parquetSchema: update,
    tombstoneAllowed: false,
  },
};

export type UserDataDescriptor = {
  systemName: string;
  encryptionAlgorithm: null | "curve25519xsalsa20poly1305";
  compressionCodec: null | "DEFLATE";
  avroSchema: Schema;
};

export const UserData: { [name: string]: UserDataDescriptor } = {
  publicFollows: {
    systemName: "publicFollows",
    encryptionAlgorithm: null,
    compressionCodec: "DEFLATE",
    avroSchema: GraphEdge,
  },
  privateFollows: {
    systemName: "privateFollows",
    encryptionAlgorithm: "curve25519xsalsa20poly1305",
    compressionCodec: "DEFLATE",
    avroSchema: GraphEdge,
  },
  privateConnections: {
    systemName: "privateConnections",
    encryptionAlgorithm: "curve25519xsalsa20poly1305",
    compressionCodec: "DEFLATE",
    avroSchema: GraphEdge,
  },
  privateConnectionPRIds: {
    systemName: "privateConnectionPRIds",
    encryptionAlgorithm: null,
    compressionCodec: "DEFLATE",
    avroSchema: PRId,
  },
  keyAgreementPublicKeys: {
    systemName: "keyAgreementPublicKeys",
    encryptionAlgorithm: null,
    compressionCodec: null,
    avroSchema: PublicKey,
  },
  assertionMethodPublicKeys: {
    systemName: "assertionMethodPublicKeys",
    encryptionAlgorithm: null,
    compressionCodec: null,
    avroSchema: PublicKey,
  },
};

export * as parquet from "./parquet.js";
