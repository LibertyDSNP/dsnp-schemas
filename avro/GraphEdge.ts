const GraphEdge = {
  namespace: "org.dsnp",
  name: "GraphEdge",
  type: "record",
  doc: "A relationship to another DSNP user",
  fields: [
    {
      name: "userId",
      type: "long",
      doc: "The other user's DSNP User Id",
    },
    {
      name: "since",
      type: "long",
      doc: "Timestamp in Unix epoch seconds when this relationship was originally established",
    },
  ],
};

export default GraphEdge;
