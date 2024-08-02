import pridSchema from "./PRId.json";
import { Type, Schema } from "avsc";

describe("PRId Schema", () => {
  it("Is Avro", () => {
    const parsed = Type.forSchema(pridSchema as Schema);
    expect(parsed).toBeDefined();
  });

  it("Encodes and decodes buffer", () => {
    const parsed = Type.forSchema(pridSchema as Schema);
    const someBytes = Buffer.from([0, 1, 2, 3, 4, 5, 6, 7]);
    const encoded = parsed.toBuffer(someBytes);
    const decoded = parsed.fromBuffer(encoded);
    expect(decoded).toStrictEqual(someBytes);
  });
});
