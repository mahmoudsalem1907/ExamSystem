let countQuestin = document.getElementById("counterspan");
let countDownDate = new Date("Dec 31, 2021 23:59:59").getTime();
let CurrentIndex = 0; // for first elemnt in data object and increment that to get next elemnt by index
let headExam = document.getElementById("questionstotal");
let answers = document.getElementById("answers");
let countdownElement = document.getElementById("countdownnn");
let submitBtn = document.getElementById("submitBtn");
let dgree = 0;
let nextBtn = document.getElementById("nx");
let preBtn = document.getElementById("pr");
let arrans = [];
let QUESTIONS;
let MAINANSWER = [];

// get data from json
function getQuestion() {
  let requestQuestion = new XMLHttpRequest();

  requestQuestion.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let queObject = JSON.parse(this.responseText);
      let queObjectCount = queObject.length;

      QUESTIONS = queObject;
      for (let i = 0; i < queObjectCount; i++) {
        let loopObj = queObject[i];
        let trueAnswer = loopObj.tanswer;
        MAINANSWER.push(trueAnswer);
      }
      for (let j = 0; j < MAINANSWER.length; j++) {
        console.log(MAINANSWER[j]);
      }
      Bulletspan(CurrentIndex + 1);
      // add data fun
      addDataOfQuestion(queObject[CurrentIndex], queObjectCount);
      // timer fun
      countdown(queObjectCount * 30);
      // submit and check answer
      submitBtn.addEventListener("click", function () {
        let userAns = document.getElementsByName("que");
        let checkUserAns;
        console.log(userAns);
        for (let f = 0; f < userAns.length; f++) {
          if (userAns[f].checked) {
            checkUserAns = userAns[f].dataset.answer;
            //   console.log(checkUserAns);
          }
        }
        sessionStorage.setItem(`answerOf ${CurrentIndex}`, checkUserAns);
        arrans[CurrentIndex] = sessionStorage.getItem(
          `answerOf ${CurrentIndex}`
        );
        getResult();
        console.log(`the dgree ${dgree}`);
      });

      /// next btn
      nextBtn.addEventListener("click", function () {
        let userAns = document.getElementsByName("que");
        let checkUserAns;
        console.log(userAns);
        for (let f = 0; f < userAns.length; f++) {
          if (userAns[f].checked) {
            checkUserAns = userAns[f].dataset.answer;
            //   console.log(checkUserAns);
          }
        }
        sessionStorage.setItem(`answerOf ${CurrentIndex}`, checkUserAns);
        arrans[CurrentIndex] = sessionStorage.getItem(
          `answerOf ${CurrentIndex}`
        );
        let varchecked = selectedanswer(CurrentIndex + 1);
        CurrentIndex++;
        newIndex = CurrentIndex;
        headExam.innerHTML = "";
        answers.innerHTML = "";
        Bulletspan(CurrentIndex + 1);
        addDataOfQuestion(queObject[CurrentIndex], queObjectCount, varchecked);
        // console.log(newIndex);
      });

      /// previous btn
      preBtn.addEventListener("click", function () {
        if (CurrentIndex > 0) {
          let userAns = document.getElementsByName("que");
          let checkUserAns;
          console.log(userAns);
          for (let f = 0; f < userAns.length; f++) {
            if (userAns[f].checked) {
              checkUserAns = userAns[f].dataset.answer;
              //   console.log(checkUserAns);
            }
          }
          sessionStorage.setItem(`answerOf ${CurrentIndex}`, checkUserAns);
          arrans[CurrentIndex] = sessionStorage.getItem(
            `answerOf ${CurrentIndex}`
          );
          let varchecked = selectedanswer(CurrentIndex - 1);
          CurrentIndex--;
          headExam.innerHTML = "";
          answers.innerHTML = "";
          Bulletspan(CurrentIndex + 1);
          addDataOfQuestion(
            queObject[CurrentIndex],
            queObjectCount,
            varchecked
          );
        }
      });
    }
  };
  requestQuestion.open("GET", "../html/question.json", true);
  requestQuestion.send();
}

//call data
getQuestion();

function selectedanswer(indexOfQuestion) {
  let current_Question = QUESTIONS[indexOfQuestion];
  console.log(current_Question);
  for (let v = 1; v <= 4; v++) {
    let thisAns = current_Question[`answer${v}`];
    for (var j = 0; j < arrans.length; j++) {
      if (thisAns === arrans[j]) {
        console.log(v);
        return v;
      }
    }
  }
  return -1;
}

// Counter of Question number
function Bulletspan(num) {
  countQuestin.innerHTML = num;
}

// add data into the tag
function addDataOfQuestion(elementObj, elementCount, varcheck) {
  // console.log(elementObj);
  // console.log(elementCount);
  let headOfQues = document.createElement("h2");
  let textOfQues = document.createTextNode(elementObj["head"]);
  console.log(elementObj["head"]);
  headOfQues.appendChild(textOfQues);
  headExam.appendChild(headOfQues);
  //answer
  for (let i = 1; i <= 4; i++) {
    //answerss
    let ansOfQues = document.createElement("div");
    ansOfQues.className = "answerss";
    let radioInput = document.createElement("input");
    if (varcheck != -1 && varcheck == i) {
      radioInput.checked = true;
    }
    // radioInput.className = 'ansans';
    radioInput.name = "que";
    radioInput.type = "radio";
    radioInput.id = `answer${i}`;
    radioInput.dataset.answer = elementObj[`answer${i}`];
    let labelInput = document.createElement("label");
    labelInput.className = "ansans";
    labelInput.htmlFor = `answer${i}`;
    let labelText = document.createTextNode(elementObj[`answer${i}`]); /// `ans-${i}`
    labelInput.appendChild(labelText);
    ansOfQues.appendChild(radioInput);
    ansOfQues.appendChild(labelInput);
    answers.appendChild(ansOfQues);
  }
}

function checkAnswer(obj, counterOfQuestion) {
  console.log(obj);
  let loopObj = obj[0];
  console.log(loopObj);
  let trueAnswer = loopObj.tanswer;
  for (let i = 0; i < counterOfQuestion; i++) {
    arrans[counterOfQuestion] = sessionStorage.getItem(
      `answerOf ${counterOfQuestion}`
    );
  }
  for (let j = 0; j < arrans.length; j++) {
    console.log(arrans[j]);
  }
}

// timer ///
function countdown(duration) {
  if (duration > 0) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;
      --duration;
      if (minutes == 0 && seconds == 0) {
        let userAns = document.getElementsByName("que");
        let checkUserAns;
        console.log(userAns);
        for (let f = 0; f < userAns.length; f++) {
          if (userAns[f].checked) {
            checkUserAns = userAns[f].dataset.answer;
            //   console.log(checkUserAns);
          }
        }
        sessionStorage.setItem(`answerOf ${CurrentIndex}`, checkUserAns);
        arrans[CurrentIndex] = sessionStorage.getItem(
          `answerOf ${CurrentIndex}`
        );
        getResult();
      }
    }, 1000);
  }
}
// get score
function getResult() {
  for (var i = 0; i < arrans.length; i++) {
    console.log(arrans[i]);
    for (var j = 0; j < MAINANSWER.length; j++) {
      if (arrans[i] === MAINANSWER[j]) {
        dgree += 1;
      }
    }
  }
  sessionStorage.setItem("dgree", dgree);
  location.replace("result.html");
}

//test script

// way array 4
// if (CurrentIndex < queObjectCount - 1) {
//     let userAns = document.getElementsByName("que");
//     let checkUserAns;

//     console.log(userAns);
//     for (let f = 0; f < userAns.length; f++) {
//         if (userAns[f].checked) {
//             checkUserAns = userAns[f].dataset.answer;
//             arrans.push(checkUserAns);
//         }
//     }

//     CurrentIndex++;
//     newIndex = CurrentIndex;
//     headExam.innerHTML = "";
//     answers.innerHTML = "";
//     Bulletspan(CurrentIndex + 1);
//     addDataOfQuestion(queObject[CurrentIndex], queObjectCount);
//     for (let ar = 0; ar < arrans.length; ar++) {
//         console.log(arrans[ar]);
//     }
// }
/// end way array
// mark //
// function MarkQuestion() {
//     if (queObject[currentIndex] == undefined) {
//         queObject[currentIndex] = currentIndex;
//         var btn = document.createElement("div");
//         var bodyBtn = document.createElement("span");
//         var close = document.createElement("i");
//         close.id = currentIndex;
//         console.log(close.id);
//         bodyBtn.id = currentIndex;
//         close.setAttribute("class", "fas fa-times-circle");
//         close.addEventListener("click", function () {
//             markedQuestions[this.id] = undefined;
//             this.parentElement.remove();
//         });
//         bodyBtn.addEventListener("click", function () {
//             divOfAnswers.children[currentIndex].style.display = "none";
//             if (this.id != 0) {
//                 currentIndex = Number(this.id) - 1;
//                 Next();
//             }
//             else {
//                 if (divOfAnswers.children[1] != undefined) {
//                     currentIndex = 1;
//                     Prev();
//                 }
//                 else {
//                     divOfAnswers.children[currentIndex].style.display = "block";
//                 }
//             }
//         })
//         if (innerWidth > 425) {
//             bodyBtn.textContent = "Marked Question " + Number(currentIndex + 1);
//         }
//         else {
//             bodyBtn.textContent = "Q" + Number(currentIndex + 1);
//         }
//         btn.append(bodyBtn);
//         btn.append(close);
//         markedbtns.append(btn);
//     }
// }

// function checkAnswer1(oobj) {
//     let userAns = document.getElementsByName("que");
//     let checkUserAns;
//     console.log(userAns);
// }
// way array
// function checkAnswer1() {
//     // let userAns = document.getElementById("answers");
//     // let checkUserAns;
//     // console.log(userAns);
//     for (let j = 1; j <= 4; j++) {
//         // let ra = loopObj[`answer${j}`];
//         // console.log(ra);
//         let userAns = document.getElementsByName("que");
//         let checkUserAns;
//         console.log(userAns);
//         for (let f = 0; f < userAns.length; f++) {
//             if (userAns[f].checked) {
//                 checkUserAns = userAns[f].dataset.answer;
//                 arrans.push(checkUserAns);
//             }
//         }
//         // console.log(checkUserAns);
//         // if (checkUserAns === trueAnswer) {
//         //     dgree += 1;
//         // }

//         for (let k = 0; k < allans.length; k++) {
//             for (let l = 0; l < arrans.length; l++) {
//                 if (allans[k] === arrans[l]) {
//                     dgree += 1
//                 }
//             }

//         }

//     } console.log(`the final dgree is ${dgree} `);
// }
// end way array
//

//let allans = [];

//   for (let i = 0; i < counterOfQuestion; i++) {
//     let loopObj = obj[i];
//     console.log(loopObj);
//     let trueAnswer = loopObj.tanswer;
//     // allans.push(trueAnswer);

//     console.log(trueAnswer);
//     // let userAns = document.getElementById("answers");
//     // let checkUserAns;
//     // console.log(userAns);
//     // for (let j = 1; j <= 4; j++) {
//     // let ra = loopObj[`answer${j}`];
//     // console.log(ra);
//     // let userAns = document.getElementsByName("que");
//     // let checkUserAns;
//     // console.log(userAns);
//     // for (let f = 0; f < userAns.length; f++) {
//     //     if (userAns[f].checked) {
//     //         checkUserAns = userAns[f].dataset.answer;
//     //         arrans.push(checkUserAns);
//     //     }
//     // }

//     let userAns = document.getElementsByName("que");
//     let checkUserAns;
//     console.log(userAns);
//     for (let f = 0; f < userAns.length; f++) {
//       if (userAns[f].checked) {
//         checkUserAns = userAns[f].dataset.answer;
//         console.log(checkUserAns);
//       }
//       //}

//       // console.log(checkUserAns);
//       // if (checkUserAns === trueAnswer) {
//       //     dgree += 1;
//       // }
//       // console.log(dgree);
//     }
//     sessionStorage.setItem(`answerOf ${i}`, checkUserAns);
//   }
//   console.log(`the final dgree is ${dgree} `);
//   // window.location.href="../html/login.html";
