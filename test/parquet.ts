/* eslint-disable jest/no-export */
import fs from "fs";
import { ParquetWriter } from "@dsnp/parquetjs";
import type { DSNPParquetSchema } from "../types/dsnp-parquet.js";
import { fromDSNPSchema } from "../parquet.js";

type RowGenerator = () => Record<string, unknown>;

export const testParquetSchema = async (model: DSNPParquetSchema) => {
  test("can build a parquet file", async () => {
    expect(async () => {
      const [schema, options] = fromDSNPSchema(model);
      await ParquetWriter.openStream(
        schema,
        {
          write: jest.fn(),
          end: jest.fn(),
        },
        options,
      );
    }).not.toThrow();
  });
};

export const testCompression = async (name: string, model: DSNPParquetSchema, rowGenerator: RowGenerator) => {
  test("Compressing all columns is best", async () => {
    const defaultSize = await generateParquetTestFileSize(name, model, 100, rowGenerator);

    for (const idx in model) {
      const testSchema = [...model];
      testSchema[idx].compression = "UNCOMPRESSED";
      const uncompressedSize = await generateParquetTestFileSize(name, testSchema, 100, rowGenerator);
      expect(defaultSize).toBeLessThan(uncompressedSize);
    }
  });
};

const generateParquetTestFileSize = async (
  name: string,
  rawSchema: DSNPParquetSchema,
  count: number,
  rowGenerator: RowGenerator,
): Promise<number> => {
  const [schema, options] = fromDSNPSchema(rawSchema);
  const path = `./test-${name}-size.parquet`;
  const writer = await ParquetWriter.openFile(schema, path, options);

  for (let i = 0; i < count; i++) {
    await writer.appendRow(rowGenerator());
  }
  await writer.close();
  const size = fs.statSync(path).size;
  fs.rmSync(path);
  return size;
};
