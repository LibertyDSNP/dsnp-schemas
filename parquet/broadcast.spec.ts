import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import broadcastSchema from "./broadcast.json";
import { DSNPParquetSchema } from "../types/dsnp-parquet.js";

describe("Broadcast Spec", () => {
  testParquetSchema(broadcastSchema as DSNPParquetSchema);

  testCompression("broadcast", broadcastSchema as DSNPParquetSchema, () => ({
    announcementType: 2,
    contentHash: generators.generateHash(),
    fromId: generators.randInt(10000000),
    url: `https://www.imadapp.com/data/posts/${generators.generateHash()}`,
  }));
});
