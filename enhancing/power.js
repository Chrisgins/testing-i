module.exports = {
  succeed,
  fail,
  repair
};

const boost = { 16: "PRI", 17: "DUO", 18: "TRI", 19: "TET", 20: "PEN" };

// Stuff that succeeds here

function succeed(article) {
  if (!article) return null;
  if (article.boosted === "PEN") {
    throw new Error({ errMsg: "Weapon already boosted" });
  }
  if (article.type !== "armor" && article.type !== "weapon") {
    return console.error({ errMsg: "Only armor and weapons can be boosted" });
  }
  if (article.boosted < 15) {
    return {
      articleName: article.articleName,
      name: `[+${article.boosted + 1}] ${article.articleName}`,
      type: article.type,
      durability: article.durability,
      boosted: article.boosted + 1
    };
  }
  if (article.boosted >= 15) {
    let num = article.boosted + 1;
    return {
      articleName: article.articleName,
      name: `["${boost[num]}"] ${article.articleName}`,
      type: article.type,
      durability: article.durability,
      boosted: num
    };
  }
}

// Stuff that fails here

function fail(article) {
  if (article.boosted < 15 && article.durability < 25) {
    throw new Error("You're too weak. You must repair before boosting");
  }
  if (article.boosted >= 15 && article.durability < 10) {
    throw new Error("You're too weak. You must repair before boosting");
  }
  if (article.boosted === 17) {
    return {
      ...article,
      boosted: article.boosted - 1,
      name: `["PRI"] ${article.articleName}`
    };
  }
  if (article.boosted === 18) {
    return {
      ...article,
      boosted: article.boosted - 1,
      name: `["DUO"] ${article.articleName}`
    };
  }
  if (article.boosted === 19) {
    return {
      ...article,
      boosted: article.boosted - 1,
      name: `["TRI"] ${article.articleName}`
    };
  }
  if (article.boosted === 20) {
    return {
      ...article,
      boosted: article.boosted - 1,
      name: `["TET"] ${article.articleName}`
    };
  }
  if (article.boosted < 14) {
    return { ...article, durability: article.durability - 5 };
  }
  if (article.boosted >= 14) {
    return { ...article, durability: article.durability - 10 };
  }
}

// Stuff that gets repaired here

function repair(article) {
  if (article.durability === 100) {
    throw new Error("You're already swole, no need to repair");
  }
  return { ...article, durability: 100 };
}