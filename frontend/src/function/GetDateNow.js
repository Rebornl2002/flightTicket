function GetDateNow() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    let currentMonth = currentDate.getMonth() + 1;
    if (currentMonth <= 9) {
        currentMonth = `0${currentMonth}`;
    }
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    return {
        Date: currentDate,
        Year: currentYear,
        Month: currentMonth,
        lastDayOfMonth: lastDayOfMonth,
    };
}

export default GetDateNow;
