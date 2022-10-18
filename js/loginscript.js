var storedValueemail = localStorage.getItem("email");
console.log(storedValueemail);
var storedValuepassword = localStorage.getItem("password");
console.log(storedValuepassword);

const emaill = document.getElementById("exampleInputEmail1");
const passl = document.getElementById("exampleInputPassword");
const formml = document.getElementById("formm");
let spanl2 = document.getElementById("resultl2");
let spanl3 = document.getElementById("resultl3");
var ch = false;
var che = false;
var chp = false;

formml.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
  if (ch !== false) {
    funs();
  }
  console.log(ch);
});

function checkInputs() {
  let emailValuel = emaill.value;
  let passValuel = passl.value;
  if (emailValuel === "") {
    var output = "Must Fill Email.....";
    // span.textContent = "Required Field";
    spanl2.style.visibility = "visible";
    emaill.classList.add("is-invalid");

    spanl2.innerHTML = output;
  } else if (emailValuel !== storedValueemail) {
    var output = "Invalid Email.....";
    // span.textContent = "Required Field";
    spanl2.style.visibility = "visible";
    emaill.classList.add("is-invalid");

    spanl2.innerHTML = output;
  } else {
    che = true;
    emaill.classList.remove("is-invalid");

    spanl2.style.visibility = "hidden";
  }

  if (passValuel === "") {
    var output = "Must Fill Password.....";
    // span.textContent = "Required Field";
    spanl3.style.visibility = "visible";
    passl.classList.add("is-invalid");

    spanl3.innerHTML = output;
  } else if (passValuel !== storedValuepassword) {
    var output = "Invalid Password.....";
    // span.textContent = "Required Field";
    spanl3.style.visibility = "visible";
    passl.classList.add("is-invalid");

    spanl3.innerHTML = output;
  } else {
    chp = true;
    passl.classList.remove("is-invalid");

    spanl3.style.visibility = "hidden";
  }
  console.log(chp);
  console.log(che);
  if (che == true && chp == true) {
    ch = true;
  }
}

function funs() {
  location.replace("exampage.html");
}

// function back() {
//   location.href = "register.html";
// }
