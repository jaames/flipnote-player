type AssertFn = (condition: unknown, message?: string) => asserts condition;

export const assert: AssertFn = (condition, message = 'Assertion failed') => {
  if (!condition) {
    throw new Error(message);
  }
};
