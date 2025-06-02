import ButtonSeat from "./ButtonSeat";
import "./SeatBook.scss";

function TypeSeat({ handleButtonClick, bookedButton, number, dataNew }) {
  console.log(dataNew);
  return (
    <div className="body_0">
      <div className="row_0 mt-3">
        <div className="button_seat me-2">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "A"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "B"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "C"}
            dataNew={dataNew}
          />
        </div>

        <div className="button_seat">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "D"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "E"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + "F"}
            dataNew={dataNew}
          />
        </div>
      </div>

      <div className="row_0 mt-3">
        <div className="button_seat me-2">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "A"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "B"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "C"}
            dataNew={dataNew}
          />
        </div>

        <div className="button_seat">
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "D"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "E"}
            dataNew={dataNew}
          />
          <ButtonSeat
            handleButtonClick={handleButtonClick}
            bookedButton={bookedButton}
            seatCode={number + 1 + "F"}
            dataNew={dataNew}
          />
        </div>
      </div>
    </div>
  );
}

export default TypeSeat;
