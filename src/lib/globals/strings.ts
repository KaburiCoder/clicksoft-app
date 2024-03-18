export { };

declare global {
  interface String {
    toTest(): string;
  }
}

String.prototype.toTest = function (): string {
  // Your custom logic here
  return "Testing:" + this;
};
