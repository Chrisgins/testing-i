const article = require("./article");

describe("article library", () => {
  describe("article object", () => {
    test("should return an object", () => {
      expect(typeof article).toBe("object");
    });
  });
  describe("expect article to have keys articleName, name, type, boosted, and durability", () => {
    test("expect an object return with keys articleName, name, type, boosted, durability", () => {
      const trim = {
        articleName: "",
        name: "",
        type: "",
        boosted: 0,
        durability: 100
      };
      expect(article.article).toMatchObject(trim);
    });
  });
});