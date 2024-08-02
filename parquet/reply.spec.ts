import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import replySchema from "./reply.json";
import { DSNPParquetSchema } from "../types/dsnp-parquet.js";

describe("Reply Spec", () => {
  testParquetSchema(replySchema as DSNPParquetSchema);

  testCompression("reply", replySchema as DSNPParquetSchema, () => ({
    announcementType: 3,
    contentHash: generators.generateHash(),
    fromId: generators.randInt(10000000),
    inReplyTo: `dsnp://${generators.randInt(10000000)}/${generators.generateHash()}`,
    url: `https://www.imadapp.com/data/posts/${generators.generateHash()}`,
  }));
});
