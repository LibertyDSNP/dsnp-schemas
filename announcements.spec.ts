import { AnnouncementType, descriptorForAnnouncementType } from "./announcements.js";

describe("Announcements API", () => {
  it("has numeric AnnouncementType values", () => {
    expect(AnnouncementType.Broadcast).toStrictEqual(2);
  });

  it("allows lookup by enum", () => {
    expect(descriptorForAnnouncementType(AnnouncementType.Broadcast).announcementType).toStrictEqual(2);
  });
});
