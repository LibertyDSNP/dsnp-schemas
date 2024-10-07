import type { DSNPParquetSchema } from "../types/dsnp-parquet.js";

const update: DSNPParquetSchema = [
  {
    name: "announcementType",
    column_type: {
      INTEGER: {
        bit_width: 32,
        sign: true,
      },
    },
    compression: "GZIP",
    bloom_filter: false,
  },
  {
    name: "contentHash",
    column_type: "STRING",
    compression: "GZIP",
    bloom_filter: true,
  },
  {
    name: "fromId",
    column_type: {
      INTEGER: {
        bit_width: 64,
        sign: false,
      },
    },
    compression: "GZIP",
    bloom_filter: true,
  },
  {
    name: "url",
    column_type: "STRING",
    compression: "GZIP",
    bloom_filter: false,
  },
  {
    name: "targetAnnouncementType",
    column_type: {
      INTEGER: {
        bit_width: 32,
        sign: true,
      },
    },
    compression: "GZIP",
    bloom_filter: false,
  },
  {
    name: "targetContentHash",
    column_type: "STRING",
    compression: "GZIP",
    bloom_filter: true,
  },
];

export default update;
