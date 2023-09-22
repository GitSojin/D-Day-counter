const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");

container.style.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";

const dateFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  if (remaining <= 0) {
    //만약, remaining이 0이라면, 타이머가 종료되었습니다. 출력
    // console.log("타이머가 종료되었습니다.");
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
  } else if (isNaN(remaining)) {
    //만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다. 출력
    // console.log("유효한 시간대가 아닙니다.");
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  //   const days = document.querySelector("#days");
  //   const hours = document.querySelector("#hours");
  //   const min = document.querySelector("#min");
  //   const sec = document.querySelector("#sec");

  const documentObj = {
    days: document.querySelector("#days"),
    hours: document.querySelector("#hours"),
    min: document.querySelector("#min"),
    sec: document.querySelector("#sec"),
  };

  const timeKeys = Object.keys(remainingObj);

  /*   for (let i = 0; i < timeKeys.length; i++) {
    documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  }
 */

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  const documentArr = ["days", "hours", "min", "sec"];
  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i = i + 1;
  }

  /*   let i = 0;
  for (let key in documentObj) {
    documentObj[key].textContent = remainingObj[timeKeys[i]];
    i++;
  }
 */

  /*   documentObj["days"].textContent = remainingObj["remainingDate"];
  documentObj["hours"].textContent = remainingObj["remainingHours"];
  documentObj["min"].textContent = remainingObj["remainingMin"];
  documentObj["sec"].textContent = remainingObj["remainingSec"];
 */
};

const intervalIdArr = [];

const starter = function (targetDateInput) {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }

  const savedDate = localStorage.getItem("saved-date");
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMaker(targetDateInput);
  // setInterval 함수가 1초 뒤에 실행되기 때문에 자체적으로 처음에도 한 번 실행시켜주기
  const intervalId = setInterval(
    () => {
      counterMaker(targetDateInput);
    },
    //인자 넣을 경우 화살표 함수를 통해 익명함수로 작성해주기(그냥 함수 이름 말고..)
    1000
  );
  intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.style.display = "flex";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = "none";

  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
}
