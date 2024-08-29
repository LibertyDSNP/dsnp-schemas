import { Schema } from "avsc";

const PublicKey: Schema = {
  type: "record",
  name: "PublicKey",
  namespace: "org.dsnp",
  fields: [
    {
      name: "publicKey",
      doc: "Multicodec public key",
      type: "bytes",
    },
  ],
};

export default PublicKey;
