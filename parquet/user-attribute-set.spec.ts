import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import userAttributeSetSchema from "./user-attribute-set.js";

describe("User Attribute Set Spec", () => {
  testParquetSchema(userAttributeSetSchema);

  testCompression("userAttributeSet", userAttributeSetSchema, () => ({
    announcementType: 8,
    fromId: generators.randInt(10000000),
    subject: generators.randInt(10000000),
    url: `https://www.imadapp.com/data/vcs/${generators.generateHash()}`,
    contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
    attributeSetType: `did:dsnp:${generators.randInt(10000000)}$MyAttributeSetType`,
    issuer: `did:dsnp:${generators.randInt(10000000)}`,
  }));
});
