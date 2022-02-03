import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Iobj, Iarray, memoryProps, itemType } from "../types/types";
import { getTimerMinutes, getTimerSeconds } from "../helpers/getTimerValues";
import { setToLocalStorage } from "../helpers/setToLocalStorage";
import MemoryGame from "./memorygameComponent";

function Memory(props: memoryProps) {
  var arrays: Iarray = props.images.map((i: string, index: number) => {
    return { img: i, id: index };
  });
  const [minute, setMinute] = useState<string>("");
  const [seconds, setSeconds] = useState<string>("");
  const [imageArray, setImageArray] = useState<Iarray>(arrays);
  const [counterValue, setCounterValue] = useState<number>(0);
  const [clickedItem2, setClickedItem2] = useState<Iobj>({
    img: "",
    ind: null,
    class: "",
  });
  const [tabFocus, setTabFocus] = useState<boolean>(true);
  const [clickedItem1, setClickedItem1] = useState<Iobj>({
    img: "",
    ind: null,
    class: "",
  });
  const [timerActive, setTimerActive] = useState<boolean>(false);

  useEffect(() => {
    setSeconds("00");
    setMinute("00");
    window.addEventListener("blur", () => {
      setTabFocus(false);
    });
    window.addEventListener("focus", () => {
      setTabFocus(true);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (clickedItem2.img !== "" && clickedItem1.img !== "") {
        setClickedItem1({
          ...clickedItem1,
          img: "",
          ind: null,
        });
        setClickedItem2({ ...clickedItem2, img: "", ind: null });
      }
    }, 600);
  }, [clickedItem1, clickedItem2]);

  useEffect(() => {
    if (
      _.filter(imageArray, (item) => {
        return item.class !== "vanish";
      }).length !== 0 &&
      timerActive &&
      tabFocus
    ) {
      setTimeout(() => {
        setSeconds(getTimerSeconds(counterValue));
        setMinute(getTimerMinutes(counterValue));
        setCounterValue(counterValue + 1);
      }, 1000);
    } else if (timerActive) {
      setToLocalStorage(minute, seconds);
    }
  }, [seconds, minute, timerActive, counterValue, tabFocus]);

  const handleClick = (item: itemType, index: number) => {
    if (timerActive) {
      if (clickedItem1.ind === null) {
        setClickedItem1({
          ...clickedItem1,
          img: item.img,
          ind: index,
        });
      }
      if (
        clickedItem1.ind !== null &&
        clickedItem2.ind === null &&
        clickedItem1.img === item.img &&
        clickedItem1.ind !== index
      ) {
        setTimeout(() => {
          setImageArray(
            _.map(imageArray, (item: itemType) => {
              return clickedItem1.ind === item.id
                ? {
                    id: clickedItem1.ind,
                    img: clickedItem1.img,
                    class: "vanish",
                  }
                : index === item.id
                ? { id: index, img: imageArray[index].img, class: "vanish" }
                : item;
            })
          );
        }, 600);
        setClickedItem2({
          img: item.img,
          ind: index,
          class: "vanish",
        });
        setClickedItem1({
          ...clickedItem1,
          class: "vanish",
        });
      }
      if (
        clickedItem1.ind !== null &&
        clickedItem2.ind === null &&
        clickedItem1.ind !== index
      ) {
        setClickedItem2({ ...clickedItem2, img: item.img, ind: index });
      }
    }
  };

  return (
    <div className="App">
      <div>
        <h2 className="py-4 text-2xl font-semibold text-darkGray">
          Memory game
        </h2>
      </div>
      
      {_.filter(imageArray, (item) => {
        return item.class !== "vanish";
      }).length === 0 ? (
        <div className="px-5 py-6 mx-auto mt-20 text-xl border rounded-lg shadow-lg play-again max-w-max text-darkGray">
          <p>
            Well done! you have completed the game in {`${minute}:${seconds}`}{" "}
            minutes.
          </p>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="py-3 pb-5 my-5 rounded-lg shadow-lg cursor-pointer px-7 text-lightGray font-sm hover:shadow-md"
          >
            play again!
          </button>
        </div>
      ) : (
        <div className="relative mx-auto wrap">
          {!timerActive ? (
        <div className="absolute z-50 start">
          <p
            className="px-3 py-3 bg-white rounded-md cursor-pointer hover:shadow-md"
            onClick={() => {
              setTimerActive(true);
            }}
          >
            {counterValue === 0 ? "Start game" : "Resume game"}
          </p>
        </div>
      ) : (
        <></>
      )}
          <MemoryGame
            clickedItem1={clickedItem1}
            clickedItem2={clickedItem2}
            minute={minute}
            seconds={seconds}
            handleClick={handleClick}
            imageArray={imageArray}
            timerActive={timerActive}
          />
          <div className="flex items-center justify-between max-w-sm mx-1 mx-auto mt-8 md:max-w-lg">
            <button
              className="px-3 py-2 rounded-md text-darkGray"
              onClick={() => {
                window.location.reload();
              }}
            >
              Restart
            </button>
            <button
              className="px-3 py-2 rounded-md text-darkGray hover:shadow-md"
              onClick={() => {
                setTimerActive(false);
              }}
            >
              Pause
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Memory;
