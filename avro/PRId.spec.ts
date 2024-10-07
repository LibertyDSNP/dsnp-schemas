import pridSchema from "./PRId.js";
import avro from "avsc";
import type { Schema } from "avsc";

describe("PRId Schema", () => {
  it("Is Avro", () => {
    const parsed = avro.Type.forSchema(pridSchema as Schema);
    expect(parsed).toBeDefined();
  });

  it("Encodes and decodes buffer", () => {
    const parsed = avro.Type.forSchema(pridSchema as Schema);
    const someBytes = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7]);
    const encoded = parsed.toBuffer(someBytes);
    const decoded = parsed.fromBuffer(encoded);
    expect(decoded).toStrictEqual(someBytes);
  });
});
