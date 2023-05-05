import { useState } from "react";

function Time() {
  const [userValue, setValue] = useState(0);
  const [switched, setSwitch] = useState(false);

  const convertValue = (e) => setValue(e.target.value);
  const resetInput = () => setValue(0);
  const switchInput = () => setSwitch(current => !current);

  return (
    <div className="inputWrap">
      <div className="inputEach">
        <label htmlFor="minutes">Minutes</label>
        <input
          type="number"
          onChange={convertValue}
          value={switched ? userValue * 60 : userValue }
          disabled={switched ? true : false}
        />
      </div>
      <div className="inputEach">
        <label htmlFor="hous">Hours</label>
        <input
          type="number"
          onChange={convertValue}
          value={switched ? userValue : Math.round(userValue / 60 * 10) / 10 }
          disabled={switched ? false : true}
        />
      </div>
      <button className="buttonControl" onClick={resetInput}>다시 입력</button>
      <button className="buttonControl" onClick={switchInput}>바꾸기</button>
    </div>
  );
}

function Distance() {
  const [userValue, setValue] = useState(0);
  const [switched, setSwitch] = useState(false);

  const convertValue = (e) => setValue(e.target.value);
  const resetInput = () => setValue(0);
  const switchInput = () => setSwitch(current => !current);

  return (
    <div className="inputWrap">
      <div className="inputEach">
        <label htmlFor="kilometers">Km</label>
        <input
          type="number"
          onChange={convertValue}
          value={switched ? Math.round(userValue / 1.6 * 10) / 10 : userValue}
          disabled={switched ? true : false}
        />
      </div>
      <div className="inputEach">
        <label htmlFor="miles">Miles</label>
        <input
          type="number"
          onChange={convertValue}
          value={switched ? userValue : Math.round(userValue * 1.6 * 10) / 10}
          disabled={switched ? false : true}
        />
      </div>
      <button className="buttonControl" onClick={resetInput}>다시 입력</button>
      <button className="buttonControl" onClick={switchInput}>바꾸기</button>
    </div>
  );
}

function UnitConverter() {
  const [unitType, setUnitType] = useState("0");
  const changeUnit = (e) => setUnitType(e.target.value);

  return (
    <section className="sectionUnit">
      <h2>단위 변환기</h2>
      <select value={unitType} onChange={changeUnit}>
        <option value="0">시간</option>
        <option value="1">거리</option>
      </select>
      {unitType === "0" ? <Time /> : <Distance />}
    </section>
  );
}

export default UnitConverter;
