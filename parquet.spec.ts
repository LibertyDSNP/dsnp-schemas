import fs from "fs";
import { ParquetWriter, ParquetReader } from "@dsnp/parquetjs";
import { fromDSNPSchema } from "./parquet.js";
import { AnnouncementType, descriptorForAnnouncementType } from "./index.js";

describe("DSNP Schema Conversion Test File", () => {
  const [parquetSchema, writerOptions] = fromDSNPSchema(
    descriptorForAnnouncementType(AnnouncementType.Broadcast).parquetSchema,
  );

  const row1 = {
    announcementType: AnnouncementType.Broadcast,
    contentHash: "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q",
    fromId: 12n,
    url: "https://github.com/LibertyDSNP/parquetjs/",
  };

  const path = "./dsnp-schema-test-file.parquet";

  let reader: ParquetReader;

  beforeAll(async () => {
    const writer = await ParquetWriter.openFile(parquetSchema, path, writerOptions);
    writer.appendRow(row1);
    await writer.close();

    reader = await ParquetReader.openFile(path);
  });

  afterAll(async () => {
    await reader.close();
    fs.rmSync(path);
  });

  it("schema is generated correctly", () => {
    expect(parquetSchema).toMatchSnapshot();
  });

  it("schema is encoded correctly", () => {
    expect(reader.metadata?.schema).toMatchSnapshot();
  });

  it("output matches input", async () => {
    const cursor = reader.getCursor();
    const row = await cursor.next();
    expect(row).toEqual(row1);
  });
});
