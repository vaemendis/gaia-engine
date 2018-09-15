import { expect } from 'chai';
import Engine from './engine';
import { Player } from './enums';

const parseMoves = Engine.parseMoves;

describe('Research', () => {
  it("should grant a qic when upgrading navigation", () => {
    const moves = parseMoves(`
      init 2 randomSeed
      p1 faction terrans
      p2 faction gleens
      p1 build m -4x-1
      p2 build m -7x3
      p2 build m -5x5
      p1 build m -3x4
      p2 booster booster4
      p1 booster booster5
    `);

    const engine = new Engine(moves);

    const qic = engine.player(Player.Player1).data.qics;

    engine.move("p1 up nav");

    expect(engine.player(Player.Player1).data.qics).to.equal(qic + 1);
  });

  it("should prevent upgrading to last research area without green a federation", () => {
    const moves = parseMoves(`
      init 2 randomSeed
      p1 faction terrans
      p2 faction gleens
      p1 build m -1x2
      p2 build m -2x2
      p2 build m -5x5
      p1 build m -3x4
      p2 booster booster7
      p1 booster booster3
      p1 up gaia.
      p2 up nav.
      p1 build ts -3x4.
      p2 charge 1pw
      p2 build ts -2x2.
      p1 charge 2pw
      p1 build lab -3x4. tech free1. up gaia.
      p2 charge 2pw
      p2 build PI -2x2.
      p1 charge 2pw
      p1 spend 2q for 2o. burn 4. action power3.
      p2 build ts -5x5.
      p1 charge 2pw
      p1 build ac1 -3x4. tech free2. up gaia.
      p2 charge 3pw
      p2 pass booster8
      p1 build gf -2x3.
      p1 special 4pw. spend 4pw for 1k.
      p1 pass booster7
      p2 action power5.
      p1 build m -2x3.
      p2 charge 3pw
      p2 up nav.
    `);

    const engine = new Engine(moves);

    expect(() => engine.move("p1 up gaia.")).to.throw();
  });

  it("should prevent upgrading to last research track when another player is there", function() {
    this.timeout(10000);

    const moves = Engine.parseMoves(`
      init 2 zadbd
      p1 faction geodens
      p2 faction lantids
      geodens build m 2x-1
      lantids build m 3x-1
      lantids build m 1x-3
      geodens build m 4x-5
      lantids booster booster1
      geodens booster booster4
      geodens build ts 2x-1.
      lantids charge 1pw
      lantids build ts 3x-1.
      geodens charge 2pw
      geodens build PI 2x-1.
      lantids charge 2pw
      lantids build PI 3x-1.
      geodens charge 3pw
      geodens special step. build m 3x-2.
      lantids charge 3pw
      lantids build m 3x-2.
      geodens charge 3pw
      geodens action power5.
      lantids build m 2x-1.
      geodens charge 3pw
      geodens up terra.
      lantids up terra.
      geodens up terra.
      lantids up terra.
      geodens action power3.
      lantids spend 2pw for 2c. build m 4x-5.
      geodens charge 1pw
      geodens build m 2x-4.
      lantids charge 1pw
      lantids federation 1x-3,2x-1,2x-3,3x-1,3x-2,3x-3,3x-4,4x-5 fed3.
      geodens up terra.
      lantids pass booster10
      geodens build ts 3x-2.
      lantids charge 3pw
      geodens federation 2x-1,2x-4,3x-2,3x-3,3x-4,4x-5 fed2.
      geodens pass booster1
      lantids income 1t
      geodens income 4pw
      lantids action power5.
      geodens build m 3x-6.
      lantids charge 1pw
      lantids up terra.
      geodens up terra.
      lantids build m 2x-4.
      geodens charge 1pw
      geodens burn 1. action power4.
      lantids up terra.
      geodens build lab 3x-2. tech nav. up nav.
      lantids charge 3pw
      lantids spend 3pw for 3c. build ts 1x-3.
      geodens charge 1pw
      geodens up int.
      lantids pass booster8
      geodens spend 2q for 2o. build ts 2x-4.
      lantids charge 2pw
      geodens pass booster10
      lantids income 4pw
      geodens income 4pw
      lantids pass booster1
      geodens pass booster8
      lantids income 4pw
      geodens income 4pw
      lantids pass booster10
      geodens pass booster7
      lantids income 1t
      geodens income 4pw
      lantids pass booster8
      geodens pass booster10
      lantids income 1t
      geodens income 4pw
      lantids action power4.
      geodens pass
    `);

    const engine = new Engine(moves);

    expect(() => engine.move('lantids up terra.')).to.throw();
  });

  it("should give a second leech for lost planet", () => {
    const moves = parseMoves(`
      init 2 bosco-marcuzzo3
      p1 faction geodens
      p2 faction ambas
      geodens build m 3x-1
      ambas build m -1x0
      ambas build m -4x1
      geodens build m 0x-4
      ambas booster booster5
      geodens booster booster4
      geodens special step. build m 2x-1.
      ambas up nav.
      geodens build m -1x2.
      ambas charge 1pw
      ambas build m -5x3.
      geodens up terra.
      ambas build m -6x2.
      geodens build ts -1x2.
      ambas charge 1pw
      ambas special range+3. build m -3x-3.
      geodens build PI -1x2.
      ambas charge 1pw
      ambas build ts -1x0.
      geodens charge 3pw
      geodens pass booster9
      ambas action power6. build m -3x-4.
      ambas pass booster4
      geodens income 1t
      geodens action power1.
      ambas special step. build m -5x0.
      geodens up terra.
      ambas build PI -1x0.
      geodens charge 3pw
      geodens build m 1x0.
      ambas decline
      ambas federation -1x0,-2x1,-3x1,-4x1,-5x0,-5x1,-5x2,-5x3,-6x2 fed5.
      geodens pass booster6
      ambas pass booster5
      geodens income 4pw
      ambas income 2t
      geodens burn 1. action power4.
      ambas special range+3. build m 0x3.
      geodens charge 3pw
      geodens build ts 1x0.
      ambas build ts 0x3.
      geodens charge 3pw
      geodens up terra.
      ambas action power6. build m 0x2.
      geodens charge 3pw
      geodens action power3.
      ambas pass booster8
      geodens federation -1x2,0x1,1x0,2x-1,3x-1 fed5.
      geodens build m 1x-4.
      geodens build m 0x-5.
      geodens build m 2x-5.
      geodens pass booster5
      ambas income 4pw
      geodens income 4pw. income 2pw
      ambas up nav.
      geodens special range+3. build m -2x-2.
      ambas charge 1pw
      ambas action power4.
      geodens up terra.
      ambas build lab 0x3. tech sci. up sci.
      geodens charge 3pw
      geodens build m 4x-6.
      ambas build ts -3x-3.
      geodens charge 1pw
      geodens action power3.
      ambas burn 1. spend 1pw for 1c. spend 1o for 1c. spend 1o for 1c. build lab -3x-3. tech free2. up eco.
      geodens charge 1pw
      geodens build ts -2x-2.
      ambas charge 2pw
      ambas special 4pw.
      geodens federation -1x-3,-2x-2,0x-4,0x-5,1x-4,2x-5,3x-5,4x-6 fed2.
      ambas special swap-PI. swap-PI 0x2.
      geodens up int.
      ambas pass booster6
      geodens burn 1. spend 3pw for 1o. build m -2x4.
      ambas decline
      geodens up int.
      geodens pass booster9
      ambas income 4pw. income 2t
      geodens income 4pw. income 4pw
      ambas action power4.
      geodens spend 4pw for 1q. build lab 1x0. tech free3. up int.
      ambas decline
      ambas up nav.
      geodens up int.
      ambas build m 2x4.
      geodens action qic2. fedtile fed5.
      ambas federation 0x2,0x3,1x3,1x4,2x4 fed5.
      geodens build ts -2x4.
      ambas charge 4pw
      ambas spend 1pw for 1c. special 4pw.
      geodens spend 1q for 1o. build m 3x1.
      ambas build ac2 -3x-3. tech nav. up nav. lostPlanet 4x-1.
      geodens charge 2pw
      geodens charge 1pw
    `);

    expect(() => new Engine(moves)).to.not.throw();
  });
});
