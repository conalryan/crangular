import { bitMask, clearBit, getBit, maskIndex, prevSetBit, printBitMask, setBit } from './bits';

describe('Bits', () => {
  it('should create a new bitmask', () => {
    const mask = bitMask();
    expect(bitMask()).toBeTruthy();
    expect(mask.length).toEqual(1);
  });

  it('should return the correct index', () => {
    expect(maskIndex(0)).toEqual(0);
    expect(maskIndex(16)).toEqual(0);
    expect(maskIndex(31)).toEqual(0);
    expect(maskIndex(32)).toEqual(1);
    expect(maskIndex(48)).toEqual(1);
    expect(maskIndex(63)).toEqual(1);
    expect(maskIndex(64)).toEqual(2);
    expect(maskIndex(95)).toEqual(2);
    expect(maskIndex(96)).toEqual(3);
  });

  it('should set the correct bit', () => {
    const mask = bitMask();
    expect(mask).toEqual([0]);
    expect(printBitMask(mask)).toEqual('0');

    setBit(mask, 0);
    expect(mask).toEqual([1]);
    expect(printBitMask(mask)).toEqual('1');

    setBit(mask, 1);
    expect(mask).toEqual([3]);
    expect(printBitMask(mask)).toEqual('11');

    setBit(mask, 2);
    expect(mask).toEqual([7]);
    expect(printBitMask(mask)).toEqual('111');

    setBit(mask, 29);
    expect(mask).toEqual([536870919]);
    expect(printBitMask(mask)).toEqual('100000000000000000000000000111');

    setBit(mask, 30);
    expect(mask).toEqual([1610612743]);
    expect(printBitMask(mask)).toEqual('1100000000000000000000000000111');

    setBit(mask, 31);
    expect(mask).toEqual([-536870905]);
    expect(printBitMask(mask)).toEqual('-11111111111111111111111111001');

    setBit(mask, 32);
    expect(mask).toEqual([-536870905, 1]);
    expect(printBitMask(mask)).toEqual('-11111111111111111111111111001, 1');

    setBit(mask, 35);
    expect(mask).toEqual([-536870905, 9]);
    expect(printBitMask(mask)).toEqual('-11111111111111111111111111001, 1001');
  });

  it('should get the bit', () => {
    const mask = bitMask();
    expect(mask).toEqual([0]);
    expect(printBitMask(mask)).toEqual('0');

    expect(getBit(mask, 0)).toEqual(0);
    expect(getBit(mask, 31)).toEqual(0);
    expect(getBit(mask, 32)).toEqual(0);
    expect(getBit(mask, 35)).toEqual(0);

    setBit(mask, 2);
    expect(mask).toEqual([4]);
    expect(printBitMask(mask)).toEqual('100');
    expect(getBit(mask, 0)).toEqual(0);
    expect(getBit(mask, 1)).toEqual(0);
    expect(getBit(mask, 2)).toEqual(1);
    expect(getBit(mask, 3)).toEqual(0);
    expect(getBit(mask, 31)).toEqual(0);

    setBit(mask, 37);
    expect(mask).toEqual([4, 32]);
    expect(printBitMask(mask)).toEqual('100, 100000');
    expect(getBit(mask, 0)).toEqual(0);
    expect(getBit(mask, 1)).toEqual(0);
    expect(getBit(mask, 2)).toEqual(1);
    expect(getBit(mask, 3)).toEqual(0);
    expect(getBit(mask, 31)).toEqual(0);

    expect(getBit(mask, 32)).toEqual(0);
    expect(getBit(mask, 33)).toEqual(0);
    expect(getBit(mask, 34)).toEqual(0);
    expect(getBit(mask, 35)).toEqual(0);
    expect(getBit(mask, 36)).toEqual(0);
    expect(getBit(mask, 37)).toEqual(1);

    setBit(mask, 31);
    expect(mask).toEqual([-2147483644, 32]);
    expect(printBitMask(mask)).toEqual('-1111111111111111111111111111100, 100000');
    expect(getBit(mask, 0)).toEqual(0);
    expect(getBit(mask, 1)).toEqual(0);
    expect(getBit(mask, 2)).toEqual(1);
    expect(getBit(mask, 3)).toEqual(0);
    expect(getBit(mask, 31)).toEqual(1);
  });

  it('should clear the bit', () => {
    const mask = bitMask();
    expect(mask).toEqual([0]);
    expect(printBitMask(mask)).toEqual('0');

    clearBit(mask, 0);
    expect(mask).toEqual([0]);
    expect(printBitMask(mask)).toEqual('0');

    setBit(mask, 1);
    expect(mask).toEqual([2]);
    expect(printBitMask(mask)).toEqual('10');

    clearBit(mask, 1);
    expect(mask).toEqual([0]);
    expect(printBitMask(mask)).toEqual('0');

    setBit(mask, 31);
    expect(mask).toEqual([-2147483648]);
    expect(printBitMask(mask)).toEqual('-10000000000000000000000000000000');

    clearBit(mask, 31);
    expect(mask).toEqual([0]);
    expect(printBitMask(mask)).toEqual('0');

    setBit(mask, 6);
    expect(mask).toEqual([64]);
    expect(printBitMask(mask)).toEqual('1000000');

    setBit(mask, 1);
    expect(mask).toEqual([66]);
    expect(printBitMask(mask)).toEqual('1000010');

    clearBit(mask, 1);
    expect(mask).toEqual([64]);
    expect(printBitMask(mask)).toEqual('1000000');
  });

  it('should return the difference between set bits', () => {
    const mask = bitMask();
    expect(mask).toEqual([0]);
    expect(printBitMask(mask)).toEqual('0');
    expect(prevSetBit(mask, 0)).toEqual(-1);

    setBit(mask, 1);
    expect(mask).toEqual([2]);
    expect(printBitMask(mask)).toEqual('10');

    setBit(mask, 3);
    expect(mask).toEqual([10]);
    expect(printBitMask(mask)).toEqual('1010');
    expect(prevSetBit(mask, 3)).toEqual(0);
    expect(prevSetBit(mask, 2)).toEqual(1);
    expect(prevSetBit(mask, 1)).toEqual(0);
    expect(prevSetBit(mask, 0)).toEqual(-1);

    setBit(mask, 7);
    expect(mask).toEqual([138]);
    expect(printBitMask(mask)).toEqual('10001010');
    expect(prevSetBit(mask, 7)).toEqual(0);
    expect(prevSetBit(mask, 6)).toEqual(3);
    expect(prevSetBit(mask, 5)).toEqual(2);
    expect(prevSetBit(mask, 4)).toEqual(1);
    expect(prevSetBit(mask, 3)).toEqual(0);
    expect(prevSetBit(mask, 2)).toEqual(1);
    expect(prevSetBit(mask, 1)).toEqual(0);
    expect(prevSetBit(mask, 0)).toEqual(-1);
  });
});
