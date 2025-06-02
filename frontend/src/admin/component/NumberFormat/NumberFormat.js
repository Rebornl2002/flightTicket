function NumberFormat(number) {
    // Format the number with dots as the thousands separator
    const formattedNumber = number.toLocaleString('de-DE', { useGrouping: true });
    //Result return above 48.000.000

    // const formattedNumber = number.toLocaleString('en-US', { useGrouping: true }); Result return 48,000,000
    return formattedNumber;
}

export default NumberFormat;
