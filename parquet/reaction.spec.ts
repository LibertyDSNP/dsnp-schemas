import { testCompression, testParquetSchema } from "../test/parquet.js";
import * as generators from "@dsnp/test-generators";
import reactionSchema from "./reaction.json";
import { DSNPParquetSchema } from "../types/dsnp-parquet.js";

describe("Reaction Spec", () => {
  testParquetSchema(reactionSchema as DSNPParquetSchema);

  testCompression("reaction", reactionSchema as DSNPParquetSchema, () => ({
    announcementType: 4,
    emoji: generators.sample(["😀", "🤌🏼", "👩🏻‍🎤", "🧑🏿‍🏫", "🏳️‍🌈", "🏳️‍⚧️", "⚛︎", "🃑", "♻︎"]),
    apply: generators.randInt(255),
    fromId: generators.randInt(10000000),
    inReplyTo: `dsnp://${generators.randInt(10000000)}/${generators.generateHash()}`,
  }));
});
