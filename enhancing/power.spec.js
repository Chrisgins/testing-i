const power = require('./power.js');

//Stuff that succeeds here

describe('boosted library', () => {
    describe('succeed(article) method', () => {
        test ('should take in the object and return the boosted object', () => {
            const article={
                articleName: "Vest of Golathica",
                name: "[+8] Vest of Golathica",
                type: "armor",
                durability: 100,
                boosted: 8
            };
            const expected={
                articleName: "Vest of Golathica",
                name: "[+9] Vest of Golathica",
                type: "armor",
                durability: 100,
                boosted: 9
            };
            const actual = power.succeed(article);
            expect(actual).toEqual(expected);
            expect(actual.boosted).toBe(9);
            expect(actual.name).toBe("[+9] Vest of Golathica");
        });

        test('Return null if no articles passed', () => {
          expect(power.succeed()).toBe(null);   
        })

        test("expect string to be returned in the name of the article if above 15", () => {
            const power15 = {
                articleName: "Kama of Endo",
                type: "weapon",
                boosted: 15
              };
              const powerPRI = {
                articleName: "Kama of Endo",
                type: "weapon",
                boosted: 16
              };
              const powerDUO = {
                articleName: "Kama of Endo",
                type: "weapon",
                boosted: 17
              };
              const powerTRI = {
                articleName: "Kama of Endo",
                type: "weapon",
                boosted: 18
              };
              const powerTET = {
                articleName: "Kama of Endo",
                type: "weapon",
                boosted: 19
              };
              expect(power.succeed(power15).boosted).toBe(16);
              expect(power.succeed(power15).name).toBe('["PRI"] Kama of Endo');
              expect(power.succeed(powerPRI).boosted).toBe(17);
              expect(power.succeed(powerPRI).name).toEqual('["DUO"] Kama of Endo');
              expect(power.succeed(powerDUO).name).toBe('["TRI"] Kama of Endo');
              expect(power.succeed(powerTRI).name).toBe('["TET"] Kama of Endo');
              expect(power.succeed(powerTET).name).toBe('["PEN"] Kama of Endo');
            });
        
            it('expect an error if it is at maxed boost of "PEN', () => {
              const actual = { type: "armor", boosted: "PEN" };
              expect(() => power.succeed(actual)).toThrow();
            });
          });
        
          // Stuff that fails here

          describe("fail() method", () => {
            const below14 = { durability: 90, boosted: 13 };
            const over14 = { durability: 90, boosted: 14 };
            const powerDUO = {
              articleName: "Kama of Endo",
              type: "weapon",
              boosted: 17
            };
            const powerTRI = {
              articleName: "Kama of Endo",
              type: "weapon",
              boosted: 18
            };
            const powerTET = {
              articleName: "Kama of Endo",
              type: "weapon",
              boosted: 19
            };
            const powerPEN = {
              articleName: "Kama of Endo",
              type: "weapon",
              boosted: 20
            };
        
            test("expect decrease durability of article by 5 if boosted is between 0 and 14", () => {
              expect(power.fail(below14).durability).toBe(85);
            });
        
            test("expect decrease durability of article by 10 if boosted is 14 or over", () => {
              expect(power.fail(over14).durability).toBe(80);
            });
        
            test("if boosted level is over 16 expect decrease article level by 1 and update name", () => {
              expect(power.fail(powerDUO).boosted).toBe(16);
              expect(power.fail(powerDUO).name).toBe('["PRI"] Kama of Endo');
              expect(power.fail(powerTRI).name).toBe('["DUO"] Kama of Endo');
              expect(power.fail(powerTET).name).toBe('["TRI"] Kama of Endo');
              expect(power.fail(powerPEN).name).toBe('["TET"] Kama of Endo');
            });
        
            if("if article level is lower than 15, fail if durability is below 25", () => {
              const suspend = { boosted: 14, durability: 24 };
              expect(() => power.fail(suspend).toThrow());
            });
            if("if article boosted level is equal to or over 15, fail if durability is below 10", () => {
              const suspend = { boosted: 15, durability: 9 };
              expect(() => power.fail(suspend).toThrow());
            });
          });
        
          // Stuff that gets repaired here
          describe("repair() method", () => {
            test("expect an object and return a object with durability restored to 100", () => {
              const actual = power.repair({ name: "Vest", durability: 0 });
              const actual99 = power.repair({ name: "Vest", durability: 99 });
              expect(actual.durability).toBe(100);
              expect(actual99.durability).toBe(100);
            });
          });
          it("expect an error if maxed at 100 durability", () => {
            const actual100 = { name: "Vest", durability: 100 };
            expect(() => power.repair(actual100)).toThrow();
          });
        });
        
