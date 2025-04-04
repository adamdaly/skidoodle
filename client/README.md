# Getting Started with Skidoodle Client

# Skidoodle Front End Coding Standards

## Contents

- [Javascript](#javascript)
- [Typescript](#typescript)
- [CSS](#css)
- [Tooling](#tooling)
- [General Coding Practices](#general-coding-practices)

## JavaScript

ESLint ruled are based on ` next/core-web-vitals` and `next/typescript` standards.

- For intentation use two spaces. This is so that the code is formatted in an easy-to-read format on GitHub.
- Variable declaration - Variables are written in camelCase.
- Use let/const and avoid using `var`.
- Multiple variables have their own initialiser:
- Use understandable variable names.
- prefix boolean variables with `is`, `has`, or `can`.
- Avoid using abstract `accu`, `curr` variable names in reduce functions.

```js
// Bad:
const var1 = 1,
  var2 = 2;

// Good:
const var1 = 1;
const var2 = 2;
```

- Always use a semi-colon, don't rely on automatic semi-colon insertion (ASI), this can be wrong sometimes.
- Strings - Use single quotes for all strings.
- Use Template Literals for sting concatenation.

```js
const str = "string";

const strWithVar = `this is a string with the value ${str} of variable str`; // this is a string with a value string of variable str

const multilineStr = `
  <div>
      <h1>Using a template literal as html string</h1>
  </div>
`;
```

- Use trailing commas on multiline Object/Array declaration

```js
// Bad:
const o = {
  param1: 1,
  param2: 2,
};

// Good:
const o = {
  param1: 1,
  param2: 2,
};
```

- === operator - Always use '=\==' instead of '==' and '!\==' instead of '!='. If the types don't match, cast one of the variables into the correct type. For example:

```js
// Good:
const var1 = 1;
const var2 = "1";

return var1 === parseInt(var2, 10);

// Bad:
const var1 = 1;
const var2 = "1";

return var1 == var2;
```

- Block declaration - Use Egyptian braces. - No space between function name and parentheses. - Exactly one space between parentheses and keyword/opening brace.

```js
// Bad:
function (){

}

function doSomething (){

}

function()
{

}

// or

if (var1 === true)
{
    doSomething();
}

// Good:
function() {

}

function doSomething() {

}

function doSomethingMultiline({
  param1 = 1,
  param2 = 2,
} = {}) {
    return param1 + param2;
}

if (var1 === true) {
    doSomething();
}
```

- Always prefer the class syntax

```js
// Bad:
function MyClass() {}

MyClass.prototype.myMethod = function () {};

// Good:
class MyClass {
  myMethod() {}
}
```

- All class declarations whould be CapitalCase.
- Code should be readable and easily understood by using naming conventions.

All of these should be handled automatically by using the Prettier plugin.

### Tests

- Testing should be done using [Jest](https://jestjs.io/).
- Jest should include code coverage and snapshots.
- Code coverage should be at least 90% of all files included within a PR.
- Jest should be set to test all `*.test.ts` files within the `__tests__` folders.
- Do **NOT** use the word 'correctly' in tests. The test name should be written succinctly.

### Constants

- All constants string/number values should be saved as a constant.
- Constants should be SNAKE_CASE and be all uppercase.

## Typescript

For Typescript projects include all of the guidelines within [Javascript](#javascript).

### General Typescript guidelines

- https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680
- Place a single space between the colon after the variable name declaration and the varible type.

```
*/ Bad */
const foo:string = 'hello';

/* Good */
const foo: string = 'hello';
```

### Interfaces/Types/Namespaces/Enum

- Use PascalCase for interface/type names.
- Don't use prefixes.

```
/* Bad: */

interface foo {}

interface iFoo {}

type bar = {}

namespace baz {}

enum fuz {}

/* Good: */

interface Foo {}

type Bar = {}

namespace Baz {}

enum Fuz {}
```

## CSS

- Boolean class names should be prefixed with '-is-' or '-has-'.
- Don't use !important (with rare exceptions, such as having to overwrite a 3rd party library), if you have to use them it probably means there is something wrong.
- Order rules by property group

```css
div {
  /* Position */
  display
  position
  left
  top
  right
  Bottom
  z-index
  flex
  /* Box Model */
  width
  min-width
  height
  min-height
  width
  margin
  padding
  overflow
  /* Appearance */
  background
  border
  opacity
  /* Content */
  color
  font
  /* Behaviour */
  animation
  transition
}
```

## Tooling

- This project uses Prettier through this [plugin](https://github.com/prettier/prettier-vscode.git). See the '.prettierrc.js` file for settings.
- This project uses ESLINT through this [plugin](https://github.com/Microsoft/vscode-eslint.git). See the '.eslintrc.js` file for settings.

## General Coding Practices

- Single responsibility principle is crucial.
- Do **NOT** use overtyping.
- Avoid complex Array.map methods in React Component return statements.
- Try to use **Pure** functions as much as possible, impure functions are an anti-pattern.
- Do **NOT** use magic strings, numbers.
- Do **NOT** push commented code, unless it is accompanied by a **TODO** label and the code will become useful at some point.
- See https://refactoring.guru/refactoring for refectoring best practices.
