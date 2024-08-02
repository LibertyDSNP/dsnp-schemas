import graphEdgeSchema from "./GraphEdge.json";
import { Type, Schema } from "avsc";

describe("Graph Edge Schema", () => {
  it("Is Avro", () => {
    const parsed = Type.forSchema(graphEdgeSchema as Schema);
    expect(parsed).toBeDefined();
  });

  it("Encodes and decodes object", () => {
    const parsed = Type.forSchema(graphEdgeSchema as Schema);
    const encoded = parsed.toBuffer({ userId: 123456789, since: 1722524715 });
    const decoded = parsed.fromBuffer(encoded);
    expect(decoded.userId).toStrictEqual(123456789);
    expect(decoded.since).toStrictEqual(1722524715);
  });
});
