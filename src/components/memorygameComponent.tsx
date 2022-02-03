import { getBestScore } from "../helpers/getBestScore";
import Timer from "./timerComponent";
import { Iobj, Iarray, itemType } from "../types/types";
import _ from "lodash";

function memoryGame(props: {
  minute: string;
  seconds: string;
  imageArray: Iarray;
  clickedItem2: Iobj;
  clickedItem1: Iobj;
  handleClick: (item: itemType, index: number) => void;
  timerActive: boolean;
}) {
  return (
    <div className="max-w-max mx-auto pt-2.5">
      <div className="flex items-center justify-between pb-5">
        {getBestScore(localStorage.getItem("data")) ? (
          <p>Your highscore : {getBestScore(localStorage.getItem("data"))}</p>
        ) : (
          <></>
        )}

        {props.minute && props.seconds ? (
          <Timer minute={props.minute} seconds={props.seconds} />
        ) : (
          <></>
        )}
      </div>
      <ul className="grid grid-cols-4 gap-3 pl-0 m-auto max-w-max">
        {_.map(props.imageArray, (item: itemType, index: number) => {
          return (
            <li
              key={index}
              className={`list-none relative pointer rounded-md border border-transparent cursor-pointer md:w-32 md:h-32 w-16 h-16 ${
                item.class
              } ${
                index === props.clickedItem1.ind ||
                index === props.clickedItem2.ind
                  ? "flip"
                  : ""
              }
              ${!props.timerActive ? "opacity-60" : ""}
              `}
              onClick={() => props.handleClick(item, index)}
            >
              <img
                src={item.img}
                alt=""
                className="absolute top-0 left-0 object-cover w-16 h-16 rounded-md md:w-32 md:h-32"
              ></img>
              <div className="absolute top-0 left-0 object-cover w-16 h-16 rounded-md md:w-32 md:h-32 layer"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default memoryGame;
