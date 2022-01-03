// ES5 Global Constants
var PI = 3.14;
PI = 42; // stop me from doing this!

// ES2015 Global Constants
/* Write an ES2015 Version */
const PI = 3.14;

/*
Quiz
* What is the difference between var and let?
  - var can overwrite existing Window methods, can be redeclared and reassigned, is function-scoped, and declarations are hoisted.
  - let does not overwrite existing Window methods. It can be reassigned but not redeclared. Declarations are NOT hoisted.

* What is the difference between var and const?
  - var can overwrite existing Window methods, can be redeclared and reassigned, is function-scoped, and declarations are hoisted.
  - const primitive declarations cannot be reassigned or updated. Const is block-scoped, and declarations are NOT hoisted.

* What is the difference between let and const?
  - let allows reassignment of primitives, whereas const does not.

* What is hoisting?
  - Hoisted variables and function declarations are run first at compilation time by the interpreter.
*/