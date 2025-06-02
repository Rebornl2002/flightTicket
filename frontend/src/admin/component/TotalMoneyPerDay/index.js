import { useEffect, useState } from 'react';

export const calculateTotalMoneyPerDay = (data) => {
    const totalMoneyPerDay = {};

    // Iterate over the data to accumulate total money per day
    data.forEach((item) => {
        const dateGo = new Date(item.DateGo);
        const day = dateGo.getDate();
        const month = dateGo.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
        const formattedDate = `${day}/${month}`;

        if (totalMoneyPerDay[formattedDate]) {
            totalMoneyPerDay[formattedDate] += item.TotalMoneyGo;
        } else {
            totalMoneyPerDay[formattedDate] = item.TotalMoneyGo;
        }
    });

    // Generate complete range of dates from starting date to end of the month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
    const endOfMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();

    for (let day = 1; day <= endOfMonth; day++) {
        const formattedDate = `${day}/${currentMonth}`;
        if (!totalMoneyPerDay[formattedDate]) {
            totalMoneyPerDay[formattedDate] = 0;
        }
    }

    return totalMoneyPerDay;
};

function TotalMoneyPerDay() {
    const [data, setData] = useState([]); // Initialize data as an empty array

    async function fetchAPI() {
        try {
            let response = await fetch(`http://localhost:4000/info/search/getInfoBookedMonthNow`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data = await response.json();
            return data.data; // Return the actual data
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchAPI();
            setData(result);
        };

        fetchData();
    }, []);
    let totalMoneyPerDay = calculateTotalMoneyPerDay(data);

    return totalMoneyPerDay;
}

export default TotalMoneyPerDay;
