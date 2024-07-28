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
```

### With Parquet Writer

```sh
npm install @dsnp/parquetjs
```

```typescript
import { parquet } from "@dsnp/schemas";
import { ParquetWriter } from "@dsnp/parquetjs";

const [parquetSchema, writerOptions] = parquet.fromDSNPSchema(dsnp.broadcast);
const writer = await ParquetWriter.openFile(parquetSchema, "./file.parquet", writerOptions);
writer.appendRow({
  announcementType: 2,
  contentHash: "0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  fromId: 78187493520,
  url: "https://spec.dsnp.org/DSNP/Types/Broadcast.html",
});
await writer.close();
```
