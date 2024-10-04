const ProfileResource = {
  namespace: "org.dsnp",
  name: "ProfileResource",
  type: "record",
  doc: "Profile-linked resource",
  fields: [
    {
      name: "type",
      type: "int",
      doc: "Type of resource",
    },
    {
      name: "contentAddress",
      type: "string",
      doc: "Content address for the resource",
    },
  ],
};

export default ProfileResource;
