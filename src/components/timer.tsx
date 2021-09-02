function Timer(props: { minute: string; seconds: string }) {
  return (
    <div className="parent-div">
      <div className="outer">
        <div className="inner">
          <div className="minute-box">
            <p>{props.minute}</p>
          </div>
          <div className="second-box">
            <p>{props.seconds}</p>
          </div>
        </div>
      </div>
      <div className="timer-button"></div>
    </div>
  );
}
export default Timer;
