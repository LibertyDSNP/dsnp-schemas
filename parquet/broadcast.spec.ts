import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import broadcastSchema from "./broadcast.js";

describe("Broadcast Spec", () => {
  testParquetSchema(broadcastSchema);

  testCompression("broadcast", broadcastSchema, () => ({
    announcementType: 2,
    contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
    fromId: generators.randInt(10000000),
    url: `https://www.imadapp.com/data/posts/${generators.generateHash()}`,
  }));
});
