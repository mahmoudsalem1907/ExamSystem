const formm = document.getElementById("formm");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("exampleInputEmail1");
const pass = document.getElementById("exampleInputPassword");
const pass2 = document.getElementById("exampleInputPassword1");
var check = false;
var c2 = false;
var c3 = false;
var c4 = false;
var c5 = false;

formm.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
  if (check == true) {
    fun();
  }
});

function isEmailValid(email) {
  const emailRegexp = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  );

  return emailRegexp.test(email);
}
function checkInputs() {
  const fnameValue = fname.value;
  const lnameValue = lname.value;
  const emailValue = email.value;
  const passValue = pass.value;
  const pass2Value = pass2.value;
  let span = document.getElementById("result");
  let span2 = document.getElementById("result2");
  let span3 = document.getElementById("result3");
  let span4 = document.getElementById("result4");
  if (fnameValue === "" || lnameValue === "") {
    var output = "Must Fill Name.....";
    // span.textContent = "Required Field";
    span.style.visibility = "visible";
    // fname.classList.add("is-invalid");
    lname.classList.add("is-invalid");

    span.innerHTML = output;
  } else if (isFinite(fnameValue) || isFinite(lnameValue)) {
    console.log("erro2");
    var output = "Only character....";
    span.style.visibility = "visible";
    span.innerHTML = output;
  } else {
    c2 = true;
    // fname.classList.remove("is-invalid");
    lname.classList.remove("is-invalid");
    span.style.visibility = "hidden";
  }
  if (emailValue === "") {
    var output = "Must Fill Email.....";
    // span.textContent = "Required Field";
    span2.style.visibility = "visible";
    email.classList.add("is-invalid");

    span2.innerHTML = output;
  } else if (!isEmailValid(emailValue)) {
    var output = "Must write true syntax.....";
    // span.textContent = "Required Field";
    span2.style.visibility = "visible";

    span2.innerHTML = output;
    email.classList.add("is-invalid");
  } else {
    c3 = true;
    span2.style.visibility = "hidden";
    email.classList.remove("is-invalid");
  }
  if (passValue === "") {
    var output = "Must Fill Password.....";
    // span.textContent = "Required Field";
    span3.style.visibility = "visible";
    span3.innerHTML = output;
    pass.classList.add("is-invalid");
  } else {
    c4 = true;
    span3.style.visibility = "hidden";
    pass.classList.remove("is-invalid");
  }
  if (pass2Value === "") {
    var output = "Must Fill Password.....";
    // span.textContent = "Required Field";
    span4.style.visibility = "visible";
    span4.innerHTML = output;
    pass2.classList.add("is-invalid");
  } else if (passValue !== pass2Value) {
    var output = "Must Match First Password.....";
    // span.textContent = "Required Field";
    span4.style.visibility = "visible";
    span4.innerHTML = output;
    pass2.classList.add("is-invalid");
  } else {
    c5 = true;
    pass2.classList.remove("is-invalid");

    span4.style.visibility = "hidden";
  }

  if (c2 == true && c3 == true && c4 == true && c5 == true) {
    check = true;
  }
}

function fun() {
  localStorage.setItem("fname", fname.value);
  localStorage.setItem("lname", lname.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", pass.value);
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("exampleInputEmail1").value = "";
  document.getElementById("exampleInputPassword").value = "";
  document.getElementById("exampleInputPassword1").value = "";
  window.location.href = "login.html";
}

function skip() {
  window.location.href = "login.html";
}
