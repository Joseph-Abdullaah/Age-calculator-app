// Selecting elements
const button = document.getElementById("button");
const yearResult = document.getElementById("yearResult");
const monthResult = document.getElementById("monthResult");
const dayResult = document.getElementById("dayResult");
const inputs = document.querySelectorAll("input");
const smallElements = document.querySelectorAll("small");
const labelElements = document.querySelectorAll("label");


let isValid = true;

function setErrorStyles(input, smallElement, labelElement, message) {
    input.style.border = "1px solid hsla(0, 100.00%, 50.00%, 0.600)";
    smallElement.textContent = message;
    smallElement.style.color = "hsla(0, 100.00%, 50.00%, 0.600)";
    smallElement.style.fontSize = "1.2rem";
    labelElement.style.color = "hsla(0, 100.00%, 50.00%, 0.600)";
}

function resetStyles(){
    inputs.forEach((input, index) => {
        input.style.border = "";
        smallElements[index].textContent = "";
        smallElements[index].style.color = "";
        labelElements[index].style.color = "";
    });
}

function emptyValidation(){
    let hasEmptyFields = false;
    inputs.forEach((input, index) => {
        if (input.value === "") {
            setErrorStyles(input, smallElements[index], labelElements[index], "This field is required");
            hasEmptyFields = true;
        }
    });
    if (hasEmptyFields) isValid = false;
}

function nonNumberValidation (){
    let hasNonNumbers = false;
    inputs.forEach((input, index) => {
        if (isNaN(input.value)) {
            setErrorStyles(input, smallElements[index], labelElements[index], "Only numbers allowed");
            hasNonNumbers = true;
        }
    });
    if (hasNonNumbers) isValid = false;
}

function monthValidation (){
    const month = parseInt(inputs[1].value);
    const day = parseInt(inputs[0].value);
    const year = parseInt(inputs[2].value);

    if (month > 12 || month < 1) {
        setErrorStyles(inputs[1], smallElements[1], labelElements[1], "Month must be between 1 and 12");
        isValid = false;
        return;
    }

    // February validation
    if (month === 2) {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (day > 29 || (day === 29 && !isLeapYear)) {
            setErrorStyles(inputs[0], smallElements[0], labelElements[0], 
                isLeapYear ? "Day must be between 1 and 29" : "Day must be between 1 and 28");
            isValid = false;
        }
    }
    // Months with 31 days
    else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        if (day > 31 || day < 1) {
            setErrorStyles(inputs[0], smallElements[0], labelElements[0], "Day must be between 1 and 31");
            isValid = false;
        }
    }
    // Months with 30 days
    else {
        if (day > 30 || day < 1) {
            setErrorStyles(inputs[0], smallElements[0], labelElements[0], "Day must be between 1 and 30");
            isValid = false;
        }
    }
}

function yearValidation (){
    const currentYear = new Date().getFullYear();
    const year = parseInt(inputs[2].value);
    
    if (year > currentYear) {
        setErrorStyles(inputs[2], smallElements[2], labelElements[2], "Year must be in the past or present");
        isValid = false;
    }
}

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function calculateAge() {
    const day = parseInt(inputs[0].value);
    const month = parseInt(inputs[1].value);
    const year = parseInt(inputs[2].value);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Create birth date and validate it
    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime())) {
        setErrorStyles(inputs[0], smallElements[0], labelElements[0], "Invalid date");
        isValid = false;
        return;
    }

    // Check if birth date is in the future
    if (birthDate > currentDate) {
        setErrorStyles(inputs[2], smallElements[2], labelElements[2], "Birth date cannot be in the future");
        isValid = false;
        return;
    }

    // Calculate age
    let years = currentYear - year;
    let months = currentMonth - month;
    let days = currentDay - day;

    // Adjust for negative days
    if (days < 0) {
        months -= 1;
        const previousMonth = currentMonth - 1 === 0 ? 12 : currentMonth - 1;
        const daysInPreviousMonth = new Date(currentYear, previousMonth, 0).getDate();
        days += daysInPreviousMonth;
    }

    // Adjust for negative months
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // Animate the results
    animateNumber(yearResult, 0, years, 500);
    animateNumber(monthResult, 0, months, 500);
    animateNumber(dayResult, 0, days, 500);
}

button.addEventListener("click", () => {
    // Reset validation state
    isValid = true;
    resetStyles();
    
    // Run validations
    emptyValidation();
    if (!isValid) return;
    
    nonNumberValidation();
    if (!isValid) return;
    
    monthValidation();
    if (!isValid) return;
    
    yearValidation();
    if (!isValid) return;

    // If all validations pass, calculate age
    calculateAge();
});
