# Enhance TypeScript `lib.*.d.ts`

## Usage

Install and add to `tsconfig.json` types
```json
{
  "compilerOptions": {
    "types": [
      "typescript-lib-enhancer"
    ]
  }
}
```
> this package includes [`typed-query-selector/strict`](https://github.com/g-plane/typed-query-selector) to enhance `document.querySelector`

## Features

### Enhance`Object.hasOwn` to narrow types just like `in`
```ts
declare const value: { a: number } | { b: number }

// before 
if (Object.hasOwn(value, 'a')) {
  // Errot: Property 'a' does not exist on type '{ b: number; }'
  value.a = 12
}

// after
if (Object.hasOwn(value, 'a')) {
  value.a = 12 // OK
  value.b = 12 // Error as expect
} else {
  value.b = 12 // OK
}
```
## TODO
- [ ] `Object.asign` type
- [ ] `structuredClone` no functions allow
- [ ] `Element.setAttribute` allow number as value?