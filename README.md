# Official DSNP Schemas

**Matching DSNP Version: v1.2.0**

## Use Schemas as Library

### Install
```sh
npm install @dsnp/schemas
```

### Use Schema

```typescript
import { dsnp } from "@dsnp/schemas";

console.log(dsnp.broadcast);
```

### Write Parquet files

```sh
npm install @dsnp/parquetjs
```

```typescript
import { Announcement } from "@dsnp/schemas"; 
import { parquet } from "@dsnp/schemas";
import { ParquetWriter } from "@dsnp/parquetjs";

const [parquetSchema, writerOptions] = parquet.fromDSNPSchema(Announcement["broadcast"].parquetSchema);
const writer = await ParquetWriter.openFile(parquetSchema, "./file.parquet", writerOptions);
writer.appendRow({
  announcementType: 2,
  contentHash: "0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  fromId: 78187493520,
  url: "https://spec.dsnp.org/DSNP/Types/Broadcast.html",
});
await writer.close();
```

### Write Avro objects

```typescript
import { UserData } from "@dsnp/schemas";
import avro from "avsc";

const publicKeyAvroSchema = avro.Type.forSchema(UserData["keyAgreementPublicKeys"].avroSchema);
const publicKeyMulticodec = Buffer.from([0xec, 0x01, 0x00, ...]);
const avroBuffer = publicKeyAvroSchema.toBuffer({ publicKey: publicKeyMulticodec });
```

