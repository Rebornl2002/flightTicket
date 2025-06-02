import classNames from "classnames/bind";
import styles from "./Oneway.module.scss";
const cx = classNames.bind(styles);

function Oneway({}) {
  // const props = [...depart,convert,handleConvert,data,]
  return (
    <>
      <DefaultPage2
        data={data}
        typeTrip={typeTrip}
        onData={handleDataFromChild}
        AirportFrom={AirportFrom}
        AirportTo={AirportTo}
        depart={depart}
      />
    </>
  );
}

export default Oneway;
