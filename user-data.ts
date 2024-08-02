import GraphEdge from "./avro/GraphEdge.json";
import PRId from "./avro/PRId.json";
import PublicKey from "./avro/PublicKey.json";
import ProfileResource from "./avro/ProfileResource.json";

import { Schema } from "avsc";

export enum UserDataType {
  PublicFollows = "publicFollows",
  PrivateFollows = "privateFollows",
  PrivateConnections = "privateConnections",
  PrivateConnectionPRIds = "privateConnectionPRIds",
  KeyAgreementPublicKeys = "keyAgreementPublicKeys",
  AssertionMethodPublicKeys = "assertionMethodPublicKeys",
  ProfileResources = "profileResources",
}

export enum UserDataEncryptionAlgorithmType {
  Curve25519XSalsa20Poly1305 = "curve25519xsalsa20poly1305",
}

export enum UserDataCompressionCodecType {
  DEFLATE = "DEFLATE",
}

export type UserDataDescriptor = {
  systemName: UserDataType;
  encryptionAlgorithm: null | UserDataEncryptionAlgorithmType;
  compressionCodec: null | UserDataCompressionCodecType;
  avroSchema: Schema;
};

export function descriptorForUserDataType(userDataType: UserDataType): UserDataDescriptor {
  switch (userDataType) {
    case UserDataType.PublicFollows:
      return {
        systemName: UserDataType.PublicFollows,
        encryptionAlgorithm: null,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: GraphEdge as Schema,
      };
    case UserDataType.PrivateFollows:
      return {
        systemName: UserDataType.PrivateFollows,
        encryptionAlgorithm: UserDataEncryptionAlgorithmType.Curve25519XSalsa20Poly1305,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: GraphEdge as Schema,
      };
    case UserDataType.PrivateConnections:
      return {
        systemName: UserDataType.PrivateConnections,
        encryptionAlgorithm: UserDataEncryptionAlgorithmType.Curve25519XSalsa20Poly1305,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: GraphEdge as Schema,
      };
    case UserDataType.PrivateConnectionPRIds:
      return {
        systemName: UserDataType.PrivateConnectionPRIds,
        encryptionAlgorithm: null,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: PRId as Schema,
      };
    case UserDataType.KeyAgreementPublicKeys:
      return {
        systemName: UserDataType.KeyAgreementPublicKeys,
        encryptionAlgorithm: null,
        compressionCodec: null,
        avroSchema: PublicKey as Schema,
      };
    case UserDataType.AssertionMethodPublicKeys:
      return {
        systemName: UserDataType.AssertionMethodPublicKeys,
        encryptionAlgorithm: null,
        compressionCodec: null,
        avroSchema: PublicKey as Schema,
      };
    case UserDataType.ProfileResources:
      return {
        systemName: UserDataType.ProfileResources,
        encryptionAlgorithm: null,
        compressionCodec: null,
        avroSchema: ProfileResource as Schema,
      };
  }
  throw new Error("Invalid enum value");
}
