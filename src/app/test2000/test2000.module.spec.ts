import { Test2000Module } from './test2000.module';

describe('Test2000Module', () => {
  let test2000Module: Test2000Module;

  beforeEach(() => {
    test2000Module = new Test2000Module();
  });

  it('should create an instance', () => {
    expect(test2000Module).toBeTruthy();
  });
});
