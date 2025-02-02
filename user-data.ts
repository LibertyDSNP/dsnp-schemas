import GraphEdge from "./avro/GraphEdge.js";
import PRId from "./avro/PRId.js";
import PublicKey from "./avro/PublicKey.js";
import ProfileResource from "./avro/ProfileResource.js";

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
  avroSchema: object;
};

export function descriptorForUserDataType(userDataType: UserDataType): UserDataDescriptor {
  const base = {
    systemName: userDataType,
    encryptionAlgorithm: null,
    compressionCodec: null,
  };

  switch (userDataType) {
    case UserDataType.PublicFollows:
      return {
        ...base,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: GraphEdge,
      };
    case UserDataType.PrivateFollows:
      return {
        ...base,
        encryptionAlgorithm: UserDataEncryptionAlgorithmType.Curve25519XSalsa20Poly1305,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: GraphEdge,
      };
    case UserDataType.PrivateConnections:
      return {
        ...base,
        encryptionAlgorithm: UserDataEncryptionAlgorithmType.Curve25519XSalsa20Poly1305,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: GraphEdge,
      };
    case UserDataType.PrivateConnectionPRIds:
      return {
        ...base,
        compressionCodec: UserDataCompressionCodecType.DEFLATE,
        avroSchema: PRId,
      };
    case UserDataType.KeyAgreementPublicKeys:
    case UserDataType.AssertionMethodPublicKeys:
      return {
        ...base,
        avroSchema: PublicKey,
      };
    case UserDataType.ProfileResources:
      return {
        ...base,
        avroSchema: ProfileResource,
      };
  }
  throw new Error("Invalid enum value");
}
