import { TimeoutInterceptor } from './timeout.interceptor.js';

describe('TimeoutInterceptor', () => {
  it('should be defined', () => {
    expect(new TimeoutInterceptor()).toBeDefined();
  });
});
