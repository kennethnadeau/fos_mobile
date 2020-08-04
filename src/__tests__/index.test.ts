import { apiConfig } from '@fos/config';

describe.only('apiConfig', () => {
  it('should check for the baseUrl', () => {
    expect(apiConfig.baseUrl).not.toBeNull();
  });

  it('should check the flurry api key', () => {
    expect(apiConfig.flurryApiKey).not.toBeNull();
  });
});
