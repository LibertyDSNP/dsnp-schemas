import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import updateSchema from "./update.json";
import { DSNPParquetSchema } from "../types/dsnp-parquet.js";

describe("Update Spec", () => {
  testParquetSchema(updateSchema as DSNPParquetSchema);

  testCompression("update", updateSchema as DSNPParquetSchema, () => ({
    announcementType: 6,
    contentHash: generators.generateHash(),
    fromId: generators.randInt(10000000),
    targetAnnouncementType: 2,
    targetContentHash: generators.generateHash(),
    url: `https://www.imadapp.com/data/posts/${generators.generateHash()}`,
  }));
});
