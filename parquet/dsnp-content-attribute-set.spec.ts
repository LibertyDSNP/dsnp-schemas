import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import dsnpContentAttributeSetSchema from "./dsnp-content-attribute-set.js";

describe("DSNP Content Attribute Set Spec", () => {
  testParquetSchema(dsnpContentAttributeSetSchema);

  testCompression("dsnpContentAttributeSet", dsnpContentAttributeSetSchema, () => ({
    announcementType: 9,
    fromId: generators.randInt(10000000),
    subject: `dsnp://${generators.randInt(10000000)}/bdyqdua4t4pxgy37mdmjyqv3dejp5betyqsznimpneyujsur23yubzna`,
    url: `https://www.imadapp.com/data/vcs/${generators.generateHash()}`,
    contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
    attributeSetType: `did:dsnp:${generators.randInt(10000000)}$MyAttributeSetType`,
    issuer: `did:dsnp:${generators.randInt(10000000)}`,
  }));
});
