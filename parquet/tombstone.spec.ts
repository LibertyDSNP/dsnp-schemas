import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import tombstoneSchema from "./tombstone.js";

describe("Tombstone Spec", () => {
  testParquetSchema(tombstoneSchema);

  testCompression("tombstone", tombstoneSchema, () => ({
    announcementType: 0,
    fromId: generators.randInt(10000000),
    targetAnnouncementType: 2,
    targetContentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
  }));
});
