import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { Warrior } from "./interfaces";




describe('Sample Code', () => {
  const ninja = myContainer.get<Warrior>(TYPES.Warrior);
  it("works", () => {
    expect(ninja.fight()).toEqual("cut!"); // true
    expect(ninja.sneak()).toEqual("hit!"); // true
  });
});
