export function LogMethod() {
  return function (target: any, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.group(key);
      console.log('args', args);
      const result = originalMethod.apply(this, args);
      console.log('return', result);
      console.groupEnd();
      return result;
    };
  };
}

