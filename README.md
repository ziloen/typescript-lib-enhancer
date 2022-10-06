# Enhance TypeScript `lib.*.d.ts`

Enhance`Object.hasOwn`，`lib.2022.d.ts`
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