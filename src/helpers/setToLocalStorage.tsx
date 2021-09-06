export function setToLocalStorage(minute: string, seconds: string) {
  let dataval = localStorage.getItem("data");
  let value =
    minute && seconds !== "00"
      ? dataval
        ? dataval + ` ${minute}:${seconds}`
        : `${minute}:${seconds}`
      : "";
  localStorage.setItem("data", value);
}
