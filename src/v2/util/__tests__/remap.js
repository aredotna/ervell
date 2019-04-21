import remap, { RGB_TO_ALPHA_SCALE } from 'v2/util/remap';

describe('remap', () => {
  it('remaps the value into the alternate scale', () => {
    expect(remap(255, RGB_TO_ALPHA_SCALE)).toBe(1.0);
  });

  it('remaps the value into the alternate scale', () => {
    expect(remap(127.5, RGB_TO_ALPHA_SCALE)).toBe(0.5);
  });

  it('remaps the value into the alternate scale', () => {
    expect(remap(0, RGB_TO_ALPHA_SCALE)).toBe(0);
  });

  it('remaps the value into the alternate scale', () => {
    expect(remap(15, RGB_TO_ALPHA_SCALE)).toBe(0.058823529411764705);
  });
});
