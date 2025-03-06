# Official DSNP Schemas

**Matching DSNP Version: v1.3.0**

## Use Schemas as Library

### Install
```sh
npm install @dsnp/schemas
```


### Get Announcement Type or User Data Type Metadata

```typescript
import {
  AnnouncementType,
  descriptorForAnnouncementType,
  UserDataType,
  descriptorForUserDataType
} from "@dsnp/schemas";

const broadcastSchema = descriptorForAnnouncementType(AnnouncementType.Broadcast);
console.log(broadcastSchema);
/*
{
  announcementType: 2,
  parquetSchema: [ ... ],
  tombstoneAllowed: true
}
*/


const publicFollowsSchema = descriptorForUserDataType(UserDataType.PublicFollows);
console.log(publicFollowsSchema);
/*
{
  systemName: 'publicFollows',
  encryptionAlgorithm: null,
  compressionCodec: 'DEFLATE',
  avroSchema: { ... }
}
*/
```

### Write Parquet files

```sh
npm install @dsnp/parquetjs
```

```typescript
import { AnnouncementType } from "@dsnp/schemas";
import { parquet } from "@dsnp/schemas";
import { ParquetWriter, ParquetSchema } from "@dsnp/parquetjs";

const [parquetSchema, writerOptions] = parquet.fromDSNPSchema(descriptorForAnnouncementType(AnnouncementType.Broadcast).parquetSchema);
const writer = await ParquetWriter.openFile(new ParquetSchema(parquetSchema), "./file.parquet", writerOptions);
await writer.appendRow({
  announcementType: AnnouncementType.Broadcast,
  contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
  fromId: 78187493520,
  url: "https://spec.dsnp.org/DSNP/Types/Broadcast.html",
});
await writer.close();
```

### Write Avro objects

```typescript
import { UserDataType, descriptorForUserDataType } from "@dsnp/schemas";
import avro from "avsc";

const publicKeyAvroSchema = avro.Type.forSchema(descriptorForUserDataType(UserDataType.KeyAgreementPublicKeys).avroSchema);
const publicKeyMulticodec = Buffer.from("ec01000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f", "hex");
const avroBuffer = publicKeyAvroSchema.toBuffer({ publicKey: publicKeyMulticodec });
```
