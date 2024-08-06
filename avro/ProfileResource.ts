import { Schema } from "avsc";

const ProfileResource: Schema = {
  "namespace": "org.dsnp",
  "name": "ProfileResource",
  "type": "record",
  "doc": "A relationship to another DSNP user",
  "fields": [
    {
      "name": "type",
      "type": "int",
      "doc": "Type of resource"
    },
    {
      "name": "contentAddress",
      "type": "string",
      "doc": "Content address for the resource"
    }
  ]
};

export default ProfileResource;

