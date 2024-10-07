import publicKeySchema from "./PublicKey.js";
import avro from "avsc";
import type { Schema } from "avsc";

describe("Public Key Schema", () => {
  it("Is Avro", () => {
    const parsed = avro.Type.forSchema(publicKeySchema as Schema);
    expect(parsed).toBeDefined();
  });

  it("Encodes and decodes object", () => {
    const parsed = avro.Type.forSchema(publicKeySchema as Schema);
    const someBytes = Buffer.from([0, 1, 2, 3]);
    const encoded = parsed.toBuffer({ publicKey: someBytes });
    const decoded = parsed.fromBuffer(encoded);
    expect(decoded.publicKey).toStrictEqual(someBytes);
  });
});
