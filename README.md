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

## Parquet Schemas

### DSNP Parquet Schema JSON Interface

Parquet schemas supported by DSNP are a subset of the full Parquet specification, and are stored in a pared-down, DSNP-specific JSON format,
represented by the following Javascript interface:

```typescript
interface ParquetColumn {
  name: string;
  column_type: ParquetBaseType | ParquetStringType | ParquetNumericType | ParquetTemporalType;
  compression:  "UNCOMPRESSED" | "GZIP" | "SNAPPY" | "LZO" | "BROTLI" | "LZ4";
  bloom_filter: boolean;
  optional?: boolean;
}
```

This library provides utilities for converting the DSNP Parquet JSON into a [schema definition](https://github.com/LibertyDSNP/parquetjs?tab=readme-ov-file#json-schema) that can be used for writing with the [parquetjs](https://github.com/LibertyDSNP/parquetjs) library. 
### Write Parquet files

```typescript
import { AnnouncementType, parquet } from "@dsnp/schemas";
import { ParquetWriter, ParquetSchema } from "@dsnp/parquetjs";

const [parquetSchema, writerOptions] =
  parquet.fromDSNPSchema(descriptorForAnnouncementType(AnnouncementType.Broadcast).parquetSchema);
const writer = await ParquetWriter.openFile(
  new ParquetSchema(parquetSchema),
  "./file.parquet", writerOptions
);

await writer.appendRow({
  announcementType: AnnouncementType.Broadcast,
  contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
  fromId: 78187493520,
  url: "https://spec.dsnp.org/DSNP/Types/Broadcast.html",
});

await writer.close();
```
## Avro Schemas

The full Avro binary specification is supported by DSNP, and is stored as raw JSON according to the [Avro specification](https://avro.apache.org/docs/1.11.1/specification/).

### Write Avro objects

```typescript
import { UserDataType, descriptorForUserDataType } from "@dsnp/schemas";
import avro from "avsc";

const publicKeyAvroSchema = avro.Type.forSchema(descriptorForUserDataType(UserDataType.KeyAgreementPublicKeys).avroSchema);
const publicKeyMulticodec = Buffer.from("ec01000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f", "hex");
const avroBuffer = publicKeyAvroSchema.toBuffer({ publicKey: publicKeyMulticodec });
```
