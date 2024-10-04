export type DSNPParquetSchema = Array<ParquetColumn>;

export type DSNPParquetType = ParquetBaseType | ParquetStringType | ParquetNumericType | ParquetTemporalType;

export interface ParquetColumn {
  name: string;
  column_type: DSNPParquetType;
  compression: ColumnCompressionCodec;
  bloom_filter: boolean;
}

// Matches type ParquetCompression from "@dsnp/parquetjs/dist/lib/declare"
type ColumnCompressionCodec = "UNCOMPRESSED" | "GZIP" | "SNAPPY" | "LZO" | "BROTLI" | "LZ4";

type ParquetBaseType = "BOOLEAN" | "INT32" | "INT64" | "FLOAT" | "DOUBLE" | "BYTE_ARRAY" | "FIXED_LEN_BYTE_ARRAY";

type ParquetStringType = "STRING" | "UUID";

type ParquetNumericType = ParquetInteger | ParquetDecimal;

type ParquetInteger = {
  INTEGER: {
    bit_width: number;
    sign: boolean;
  };
};

type ParquetDecimal = {
  DECIMAL: {
    scale: number;
    precision: number;
  };
};

type ParquetTemporalType = "DATE" | "INTERVAL" | ParquetTime | ParquetTimestamp;

type ParquetTime = {
  TIME: {
    is_adjusted_to_utc: boolean;
    unit: ParquetTimeUnit;
  };
};

type ParquetTimestamp = {
  TIMESTAMP: {
    is_adjusted_to_utc: boolean;
    unit: ParquetTimeUnit;
  };
};

type ParquetTimeUnit = "MILLIS" | "MICROS" | "NANOS";
