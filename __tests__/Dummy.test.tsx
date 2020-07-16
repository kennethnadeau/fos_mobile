import sayHello from "@fos/shared";

describe("imports @fos/shared correctly", () => {
  it("should say hello", () => {
    const actual = sayHello();
    const expected = "hello";

    expect(actual).toBe(expected);
  });
});
