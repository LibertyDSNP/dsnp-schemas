import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import replySchema from "./reply.js";

describe("Reply Spec", () => {
  testParquetSchema(replySchema);

  testCompression("reply", replySchema, () => ({
    announcementType: 3,
    contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
    fromId: generators.randInt(10000000),
    inReplyTo: `dsnp://${generators.randInt(10000000)}/${generators.generateHash()}`,
    url: `https://www.imadapp.com/data/posts/${generators.generateHash()}`,
  }));
});
