function Timer(props: { minute: string; seconds: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center w-20 rounded-lg h-9 bg-darkGray outer">
        <div className="flex items-center justify-center w-20 h-8 mx-1 my-2 text-xl text-white rounded-md inner space-around bg-lightGray">
          <div className="flex items-center justify-center pt-1 minute-box rounded-xs bg-darkGray">
            <p className="m-0">{props.minute}</p>
          </div>
          <div className="flex items-center justify-center pt-1 second-box bg-darkGray rounded-xs">
            <p className="m-0"> {props.seconds}</p>
          </div>
        </div>
      </div>
      <div className="h-5 rounded-lg bg-darkGray"></div>
    </div>
  );
}
export default Timer;
