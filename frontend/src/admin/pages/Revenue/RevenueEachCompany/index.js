export const calculateMoneyPerDay = (data, TotalMoney) => {
    const totalMoneyPerDay = {};

    // Iterate over the data to accumulate total money per day
    data.forEach((item) => {
        const dateGo = new Date(item.DateGo);
        const day = dateGo.getDate();
        const month = dateGo.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
        const formattedMonth = month < 10 ? `0${month}` : month; // Add leading zero if month is less than 10
        const formattedDate = `${day}/${formattedMonth}`;

        if (totalMoneyPerDay[formattedDate]) {
            totalMoneyPerDay[formattedDate] += item[TotalMoney];
        } else {
            totalMoneyPerDay[formattedDate] = item[TotalMoney];
        }
    });

    // Generate complete range of dates from starting date to end of the month
    const currentDate = new Date(data[0].DateGo);
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
    const endOfMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
    const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;

    for (let day = 1; day <= endOfMonth; day++) {
        const formattedDate = `${day}/${formattedMonth}`;
        if (!totalMoneyPerDay[formattedDate]) {
            totalMoneyPerDay[formattedDate] = 0;
        }
    }

    return totalMoneyPerDay;
};
export const generateEmptyResult = (endOfMonth, currentMonth) => {
    const emptyResult = {};

    for (let day = 1; day <= endOfMonth; day++) {
        const formattedDate = `${day}/${currentMonth}`;
        emptyResult[formattedDate] = 0;
    }

    return emptyResult;
};

export const mergeResults = (result1, result2, result3) => {
    const mergedResult = {};

    for (const date in result1) {
        mergedResult[date] = result1[date] + (result2[date] || 0) + (result3[date] || 0);
    }

    for (const date in result2) {
        if (!mergedResult[date]) {
            mergedResult[date] = result2[date] + (result3[date] || 0);
        }
    }

    for (const date in result3) {
        if (!mergedResult[date]) {
            mergedResult[date] = result3[date];
        }
    }

    return mergedResult;
};
