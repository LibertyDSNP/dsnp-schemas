import fs from "fs";
import { ParquetWriter, ParquetReader, ParquetSchema } from "@dsnp/parquetjs";
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
    const writer = await ParquetWriter.openFile(new ParquetSchema(parquetSchema), path, writerOptions);
    await writer.appendRow(row1);
    await writer.close();

    reader = await ParquetReader.openFile(path);
  });

  afterAll(async () => {
    await reader.close();
    fs.rmSync(path);
  });

  it("schema is generated correctly", () => {
    expect(new ParquetSchema(parquetSchema)).toMatchSnapshot();
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

describe("Schema Conversion with optional fields", () => {
  const [parquetSchema, writerOptions] = fromDSNPSchema([
    { name: "requiredColumnOne", column_type: "INT32", compression: "UNCOMPRESSED", bloom_filter: false },
    {
      name: "optionalColumnTwo",
      column_type: "INT32",
      compression: "UNCOMPRESSED",
      bloom_filter: false,
      optional: true,
    },
    { name: "requiredColumnThree", column_type: "INT32", compression: "UNCOMPRESSED", bloom_filter: false },
    {
      name: "optionalColumnFour",
      column_type: "INT32",
      compression: "UNCOMPRESSED",
      bloom_filter: false,
      optional: true,
    },
  ]);

  const rows = [
    { requiredColumnOne: 1, requiredColumnThree: 2 },
    { requiredColumnOne: 3, requiredColumnThree: 4, optionalColumnTwo: 5 },
    { requiredColumnOne: 6, requiredColumnThree: 7, optionalColumnFour: 8 },
    { requiredColumnOne: 9, optionalColumnTwo: 10, requiredColumnThree: 11, optionalColumnFour: 12 },
  ];

  const path = "./optional-column-test-file.parquet";

  let reader: ParquetReader;

  beforeAll(async () => {
    const writer = await ParquetWriter.openFile(new ParquetSchema(parquetSchema), path, writerOptions);
    await Promise.all(rows.map((row) => writer.appendRow(row)));
    await writer.close();

    reader = await ParquetReader.openFile(path);
  });

  afterAll(async () => {
    await reader.close();
    fs.rmSync(path);
  });

  it("schema is generated correctly", () => {
    expect(new ParquetSchema(parquetSchema)).toMatchSnapshot();
  });

  it("schema is encoded correctly", () => {
    expect(reader.metadata?.schema).toMatchSnapshot();
  });

  it("output matches input with null columns added", async () => {
    const cursor = reader.getCursor();
    let row: unknown;
    let i = 0;
    while ((row = await cursor.next())) {
      const rowWithNulls = { optionalColumnTwo: null, optionalColumnFour: null, ...rows[i] };
      expect(row).toEqual(rowWithNulls);
      i++;
    }
  });
});
