const form = document.querySelector("#post-form");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const file = document.querySelector("#file");

  console.log(file.files);

  const formData = new FormData();
  console.log("Formdata test")
 alert("title " + title.value);
  alert("description "+ description.value);
  alert("file "+ file.files[0]);


  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("file", file.files[0]);
alert("form data "+formData);
  fetch("/api/post", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      //console.log(response);
      console.warn(response);
      window.location.reload();
     
    })
    .catch((err) => ("Something went wrong", err));
}

