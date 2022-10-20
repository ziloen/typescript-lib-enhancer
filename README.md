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
> this package includes [`typed-query-selector/strict`](https://github.com/g-plane/typed-query-selector) to enhance `querySelector()` & `querySelectorAll()` & `closest()`

## Features

### Enhance`Object.hasOwn` to narrow types just like `key in obj`
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

- [ ] ~~`Object.asign` type~~
- [ ] `structuredClone` no functions allow
- [ ] `Element.setAttribute` allow number as value?
- [ ] `Object.entries` key type 
- [ ] `Array.prototype.reduce` & `Array.prototype.reduceRight`
- [ ] `Object.keys` & `Object.entries` & `Object.values` & `Object.fromEntries`
- [ ] `Object.isFrozen` `<T>(o: T): o is Readonly<T>`
- [ ] `Reflect.get`
<details>
  <summary><code>Array.includes</code></summary>
  
  ```ts
  enum A {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1"
  }
  const a: string = ""
  const Akeys: A[] = Object.keys(A)    
  // should not error
  // error: type string not assignable to type A
  if (Akeys.includes(a)) {
    // a should be A
    // a: string
    a 
  } else {
    // a should still be string
    // a: string
    a
  }
  ```
</details>

<!-- and more :
  eslint plugin 
    rule : Object.keys() & Object.entries & Object.values not allow number and Symbol
    
 -->