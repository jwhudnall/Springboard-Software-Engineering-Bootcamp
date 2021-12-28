// DOM Manipulation Exercises

// TODO:
// 1. Select the section with an id of container without using querySelector.
let section = document.getElementById('container');

// 2. Select the section with an id of container using querySelector.
section = document.querySelector('#container');

// 3. Select all of the list items with a class of “second”.
const lis = document.getElementsByClassName('second');

// 4. Select a list item with a class of third, but only the list item inside of the ol tag.
const olThird = document.querySelector('ol .third');

// 5. Give the section with an id of container the text “Hello!”.
/* section.innerText = 'Hello'; "Correct" Answer seems strange, as it removes all code that
follows, disallowing continuation of exercise
*/
section.prepend('Hello!');

// 6. Add the class main to the div with a class of footer.
document.querySelector('div.footer').classList.add('main');

// 7. Remove the class main on the div with a class of footer.
document.querySelector('div.footer').classList.remove('main');

// 8. Create a new li element.
const newLi = document.createElement('li');

// 9. Give the li the text “four”.
newLi.innerText = 'four';

// 10. Append the li to the ul element.
document.getElementsByTagName('ul')[0].append(newLi);

// 11. Loop over all of the lis inside the ol tag and give them a background color of “green”.
const olLis = document.querySelector('ol').children;
for (let li of olLis) {
  li.style.backgroundColor = 'green';
}
// 12. Remove the div with a class of footer
document.querySelector('div.footer').remove();