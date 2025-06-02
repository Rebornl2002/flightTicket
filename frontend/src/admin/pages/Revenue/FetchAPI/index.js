const URL = 'http://localhost:4000/info/search';

export const fetchAPIOnewayAndCompanyThisMonth = async (company, month, year) => {
    try {
        let response = await fetch(
            `${URL}/getInfoBookedMonthOnewayAndCompanyNow?FlightNumber=${company}&month=${month}&year=${year}`,
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        let data1 = await response.json();

        return data1.data;
    } catch (error) {
        console.error(error);
    }
};

//date is DateGo or DateReturn
export const fetchAPIRoundtripAndCompanyAndDateThisMonth = async (company, date, month, year) => {
    try {
        let response = await fetch(
            `${URL}/fetchAPIRoundtripAndCompanyAnd${date}ThisMonth?FlightNumber=${company}&month=${month}&year=${year}`,
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        let data1 = await response.json();
        // console.log(data1.data);

        return data1.data;
    } catch (error) {
        console.error(error);
    }
};
