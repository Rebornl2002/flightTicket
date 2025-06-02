/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box';
import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';
import Grid from '@mui/material/Grid';
import Outside from '../../component/Outside';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DoneIcon from '@mui/icons-material/Done';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FlightToday from '../../component/FlightToday';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import CheckRole from '../../component/CheckRole';
import { fetchAPIOnewayAndCompanyThisMonth, fetchAPIRoundtripAndCompanyAndDateThisMonth } from '../Revenue/FetchAPI';
import { calculateMoneyPerDay, generateEmptyResult, mergeResults } from '../Revenue/RevenueEachCompany';
import { Chart } from 'react-google-charts';
import GetDateNow from '../../../function/GetDateNow';

const cx = classNames.bind(styles);

function Home() {
    const [data, setData] = useState(null);
    const date = GetDateNow();

    console.log(date);
    const handlePushData = async (company, month, year) => {
        const endOfMonth = new Date(year, month, 0).getDate();

        try {
            const result_1 = await fetchAPIOnewayAndCompanyThisMonth(company, month, year);
            const result_2 = await fetchAPIRoundtripAndCompanyAndDateThisMonth(company, 'DateGo', month, year);
            const result_3 = await fetchAPIRoundtripAndCompanyAndDateThisMonth(company, 'DateReturn', month, year);
            console.log(company, month, year, result_1, result_2, result_3);

            if (result_1 || result_2 || result_3) {
                let calculatedResult_1, calculatedResult_2, calculatedResult_3;
                if (result_1 && result_1.length > 0)
                    calculatedResult_1 = calculateMoneyPerDay(result_1, 'TotalMoneyGo');
                else calculatedResult_1 = generateEmptyResult(endOfMonth, month);
                if (result_2 && result_2.length > 0)
                    calculatedResult_2 = calculateMoneyPerDay(result_2, 'TotalMoneyGo');
                else calculatedResult_2 = generateEmptyResult(endOfMonth, month);
                if (result_3 && result_3.length > 0)
                    calculatedResult_3 = calculateMoneyPerDay(result_3, 'TotalMoneyReturn');
                else calculatedResult_3 = generateEmptyResult(endOfMonth, month);

                const mergedResult = mergeResults(calculatedResult_1, calculatedResult_2, calculatedResult_3);
                setData(mergedResult);
                // console.log('chay voa day');
                // console.log(calculatedResult_1, calculatedResult_2, calculatedResult_3);
            } else {
                // Handle the case where the API response has count: 0 or an error occurred

                const emptyResult = generateEmptyResult(endOfMonth, month);
                setData(emptyResult);
                console.log('chay duoi nay');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const valueRole = CheckRole();
    useEffect(() => {
        handlePushData(valueRole.Code, date.Month, date.Year);
    }, []);

    const chartData = [['Ngày', 'Doanh thu']];
    let total = 0;
    if (data) {
        const moneyPerDay = data;
        console.log('IN tien nay', moneyPerDay);
        for (let day = 1; day <= date.lastDayOfMonth; day++) {
            const ngay = `${day}/${date.Month}`;
            const doanhThu = moneyPerDay[ngay] || 0;
            console.log(doanhThu);
            total += doanhThu;
            chartData.push([ngay, doanhThu]);
        }
    }
    const options = {
        chart: {
            title: `Biểu đồ so sánh lợi nhuận mỗi ngày trong tháng của hãng hàng không`,
            subtitle: 'Được tính theo đồng (VNĐ)',
        },
        // colors: ['blue'], // Set custom color (e.g., blue)
        vAxis: {
            viewWindow: {
                min: 0,
                max: 1,
            },
        },
    };

    async function fetchAPI(param) {
        try {
            let response = await fetch(
                `http://localhost:4000/tickets/search/getTicket${param}MonthNowOfCompany?AirlineCode=${valueRole.Code}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            // console.log(data1.count);

            return data1.count;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }

    const [quantityCompleted, setQuantityCompleted] = useState(0);
    const [quantityIncompleted, setQuantityIncompleted] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const completed = await fetchAPI('Completed');
                const incompleted = await fetchAPI('Incompleted');

                setQuantityCompleted(completed);
                setQuantityIncompleted(incompleted);

                // Handle the quantity data as needed
            } catch (error) {
                console.error(error);
                // Handle errors if necessary
            }
        }

        fetchData();
    }, [quantityCompleted, quantityIncompleted]);

    const navigate = useNavigate();

    const handleSwitchFlight = () => {
        // Navigate to the desired page when the Card is clicked
        navigate('/admin/flight');
    };

    const handleSwitchRevenue = () => {
        // Navigate to the desired page when the Card is clicked
        navigate('/admin/revenue');
    };

    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={8} className={cx('one')}>
                                    <FlightToday />

                                    {/* <div style={{ paddingTop: '50px' }}>
                                        <LineChart />
                                    </div> */}

                                    <div style={{ marginTop: '40px' }}>
                                        <Chart
                                            chartType="Line"
                                            width="100%"
                                            height="400px"
                                            data={chartData}
                                            options={options}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={4}>
                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className={cx('gradient_imcompleted')}
                                        onClick={handleSwitchFlight}
                                    >
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                className={cx('title')}
                                            >
                                                <span>Chuyến bay chưa hoàn thành</span>
                                                <HourglassTopIcon className={cx('icon')} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className={cx('quantity')}
                                            >
                                                <CountUp start={0} end={quantityIncompleted} duration={2} />
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className={cx('gradient_completed')}
                                        onClick={handleSwitchFlight}
                                    >
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                className={cx('title')}
                                            >
                                                <span>Chuyến bay đã hoàn thành</span>
                                                <DoneIcon className={cx('icon')} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className={cx('quantity')}
                                            >
                                                <CountUp start={0} end={quantityCompleted} duration={2} />
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    <Card
                                        sx={{ maxWidth: 345 }}
                                        className={cx('gradient_revenue')}
                                        onClick={handleSwitchRevenue}
                                    >
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                className={cx('title')}
                                            >
                                                <span> Doanh thu</span>
                                                <MonetizationOnIcon className={cx('icon')} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className={cx('quantity')}
                                            >
                                                <CountUp start={0} end={total} duration={2} separator="." /> đ
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Outside />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default Home;
