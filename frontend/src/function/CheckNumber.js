function CheckNumber(value) {
    const convertedNumber = parseFloat(value);
    return !isNaN(convertedNumber) && typeof convertedNumber === 'number';
}

export default CheckNumber;
