import { apiConfig } from "@fos/config";
import { apiService } from "@fos/shared";

describe("apiConfig", () => {
  it("should check for the baseUrl", () => {
    expect(apiConfig.baseUrl).not.toBeNull();
  });

  it("should check the flurry api key", () => {
    expect(apiConfig.flurryApiKey).not.toBeNull();
  });
});

describe("imports @fos/shared correctly", () => {
  it("should find account functions", async () => {
    const { account } = apiService;
    expect(account).toBeDefined();
    expect(account.getUserInfo).toBeDefined();
  });
});
