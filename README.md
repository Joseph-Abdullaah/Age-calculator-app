# Frontend Mentor - Age Calculator App Solution

This is my solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). This challenge helped me improve my HTML, CSS, and JavaScript skills by building a real-world project.

## Table of contents

- [Frontend Mentor - Age Calculator App Solution](#frontend-mentor---age-calculator-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Link](#link)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resource](#useful-resource)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

* View an age in years, months, and days after submitting a valid date through the form
* Receive validation errors if:

  * Any field is empty when the form is submitted
  * The day number is not between 1-31
  * The month number is not between 1-12
  * The year is in the future
  * The date is invalid (e.g., 31/04/1991 — April only has 30 days)
* View a responsive layout for mobile and desktop devices
* See hover and focus states for interactive elements
* Bonus: See the age numbers animate to their final number when submitted

### Screenshot

![Age Calculator Screenshot](./screenshot/age%20calculator%20screenshot.png)

### Link


* Live Site URL: [Live Demo]()

## My process

### Built with


* Flexbox
* Media queries for responsiveness
* Vanilla JavaScript (no libraries)

### What I learned

In this project, I improved my skills in:

* **Form validation**: I learned how to validate empty fields, number ranges, and invalid dates.
* **Dynamic styling with JavaScript**: Changing border colors, showing error messages, and changing label colors based on validation.
* **Age calculation logic**: I learned how to calculate the age correctly even when days or months go negative and need adjustment.
* **Animating numbers**: I implemented a simple animation to count from zero to the final result when the form is submitted.

Example code snippet from my project (validating the month field):

```js
if (month > 12 || month < 1) {
  setErrorStyles(inputs[1], smallElements[1], labelElements[1], "Month must be between 1 and 12");
  isValid = false;
  return;
}
```

### Continued development

Next, I want to:

* Try building the same project using **React**.
* Use **localStorage** to save the last calculated age.
* Improve accessibility (ARIA attributes for form errors).

### Useful resource

* [MDN Web Docs - Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) - Helped me understand date calculations.


## Author


* Frontend Mentor - [@Joseph Abdullaah](https://www.frontendmentor.io/profile/Joseph-Abdullaah)
* Twitter - [@Joseph Abdullaah](https://x.com/JosephAbdullaah)
