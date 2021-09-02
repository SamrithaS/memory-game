let leastMin = 61;
let leastSec = 61;
let leastMinuteArray = [];
let bestScore = "00:00";

export function getBestScore(array: any) {
  if (array) {
    array.split(" ").map((item: string) => {
      if (Number(item.slice(0, 2)) < leastMin) {
        leastMin = Number(item.slice(0, 2));
      }
    });
    leastMinuteArray = array.split(" ").filter((item: string) => {
      return Number(item.slice(0, 2)) === leastMin;
    });
    leastMinuteArray.map((item: string) => {
      if (Number(item.slice(3, 5)) < leastSec) {
        leastSec = Number(item.slice(3, 5));
        bestScore = item;
      }
    });
    return bestScore;
  } else {
    return "";
  }
}

