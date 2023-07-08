const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const data = document.getElementById('data');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const dataValue = data.value;

  if (usernameValue.trim() === "") {
    setErrorFor(username, "Você precisa inserir seu nome.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue.trim() === "") {
    setErrorFor(email, "Você esqueceu de inserir seu email.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Insira um email válido!");
  } else {
    setSuccessFor(email);
  }

  if (dataValue.trim() === "") {
    setErrorFor(data, "Você precisa selecionar uma data.");
  } else if (!checkValidDate(dataValue)) {
    setErrorFor(data, "Selecione uma data posterior à data atual.");
  } else {
    setSuccessFor(data);
  }

  const formGroups = form.querySelectorAll('.form-group');
  const formIsValid = [...formGroups].every((formGroup) => {
    return formGroup.classList.contains("success");
  });

  if (formIsValid) {
    const content = `Nome: ${usernameValue}\nEmail: ${emailValue}\nData da Consulta: ${dataValue}`;
    downloadFile(content, 'comprovante_consulta.txt');
  }
}

function setErrorFor(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");

  small.innerText = message;
  formGroup.classList.remove("success");
  formGroup.classList.add("error");
}

function setSuccessFor(input) {
  const formGroup = input.parentElement;

  formGroup.classList.remove("error");
  formGroup.classList.add("success");
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function checkValidDate(date) {
  const selectedDate = new Date(date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Define a hora atual como 00:00:00

  return selectedDate >= currentDate;
}

function downloadFile(content, filename) {
  const element = document.createElement('a');
  const file = new Blob([content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  element.click();
}
