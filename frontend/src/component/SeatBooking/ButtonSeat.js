// import { useEffect, useState } from "react";
import './SeatBook.scss';

function ButtonSeat({ handleButtonClick, bookedButton, seatCode, dataNew }) {
    // console.log(dataNew);

    let isContain = false;

    if (dataNew.CodeSeat.includes(seatCode)) {
        isContain = true;
    } else {
        isContain = false;
    }

    return (
        <>
            <button
                onClick={handleButtonClick}
                // className={bookedButton.includes(seatCode) ? "booked" : "no_booked"}
                className={isContain ? 'disable' : bookedButton.includes(seatCode) ? 'booked' : 'no_booked'}
                disabled={isContain}
            >
                {seatCode}
            </button>
        </>
    );
}

export default ButtonSeat;
