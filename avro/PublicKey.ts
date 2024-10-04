const PublicKey = {
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
