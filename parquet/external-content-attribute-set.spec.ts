import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import externalContentAttributeSetSchema from "./external-content-attribute-set.js";

describe("External Content Attribute Set Spec", () => {
  testParquetSchema(externalContentAttributeSetSchema);

  testCompression("externalContentAttributeSet", externalContentAttributeSetSchema, () => ({
    announcementType: 10,
    fromId: generators.randInt(10000000),
    subject: "https://www.website.com/somecontent.html",
    subjectContentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
    url: `https://www.imadapp.com/data/vcs/${generators.generateHash()}`,
    contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
    attributeSetType: `did:dsnp:${generators.randInt(10000000)}$MyAttributeSetType`,
    issuer: `did:dsnp:${generators.randInt(10000000)}`,
  }));
});
