import { Schema } from "avsc";

const PRId: Schema = {
  namespace: "org.dsnp",
  name: "PRId",
  type: "fixed",
  size: 8,
  doc: "Pseudonymous Relationship Identifier",
};

export default PRId;
