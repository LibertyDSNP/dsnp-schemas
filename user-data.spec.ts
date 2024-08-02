import { UserDataType, descriptorForUserDataType } from "./user-data.js";

describe("User Data API", () => {
  it("has string UserDataType values", () => {
    expect(UserDataType.PublicFollows).toStrictEqual("publicFollows");
  });

  it("allows lookup by enum", () => {
    expect(descriptorForUserDataType(UserDataType.PublicFollows).systemName).toStrictEqual("publicFollows");
  });
});
