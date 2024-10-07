import profileResourceSchema from "./ProfileResource.js";
import { Type } from "avsc";
import type { Schema } from "avsc";

describe("Profile Resource Schema", () => {
  it("Is Avro", () => {
    const parsed = Type.forSchema(profileResourceSchema as Schema);
    expect(parsed).toBeDefined();
  });

  it("Encodes and decodes object", () => {
    const parsed = Type.forSchema(profileResourceSchema as Schema);
    const exampleCid = "bafybeida7z24mig7j3oagjru7s2gw6xbfkh7fryvah6ho2ar77xb7aleom";
    const encoded = parsed.toBuffer({
      type: 1,
      contentAddress: exampleCid,
    });
    const decoded = parsed.fromBuffer(encoded);
    expect(decoded.type).toStrictEqual(1);
    expect(decoded.contentAddress).toStrictEqual(exampleCid);
  });
});
