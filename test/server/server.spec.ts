import { Expect, TestCase } from 'alsatian';
import { secs2ms } from '../../src/lib';

export class ServerTests {
  @TestCase(1, 1000)
  @TestCase(1.5, 1500)
  @TestCase(0, 0)
  public secs2ms_test(secs: number, expected: number) {
    Expect(secs2ms(secs)).toBe(expected);
  }
}
