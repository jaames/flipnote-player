type AssertFn = (value: unknown, message?: string) => asserts value is boolean;

export const assert: AssertFn = (value, message = 'Assertion failed') => {
  if (!value) {
    throw new Error(message);
  }
};
