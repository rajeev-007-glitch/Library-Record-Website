console.log("The file has been linked");


// Construuctor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// Display Constructor
function Display() {}

// Add methods to display prototype

// Implimenting Add function
Display.prototype.add = function (Book) {
  let tableBody = document.getElementById("tableBody");
  let storage = localStorage.getItem("storage");
  if (storage == null) {
    storageObj = [];
  } else {
    storageObj = JSON.parse(storage);
  }
  let html = "";
  storageObj.forEach(function (element) {
    html += `<tr>
                        <td>${element.name}</td>
                        <td>${element.author}</td>
                        <td>${element.type}</td>
                    </tr>`;
  });
  tableBody.innerHTML = html;
//   if (storageObj != 0) {
//   }
};

// Implimenting Delete function
Display.prototype.delete = function (index) {
  let storage = localStorage.getItem("storage");
  if (storage == 0) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  storageObj.splice(index, 1);
  localStorage.setItem("storage", JSON.stringify(storageObj));
  this.add();
};

// Implimenting Clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// Implimenting Validate Function
Display.prototype.validate = function (Book) {
  if (Book.name.length < 2 || Book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

// Implimenting Show Function
Display.prototype.show = function (type, printMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <h3 class="alert-heading">Message:</h3>
                                <strong></strong>${printMessage}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
  setTimeout(() => {
    message.innerHTML = "";
  }, 2000);
};


// Add event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  e.preventDefault();
  console.log("you have submitted form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  let action = document.getElementById("action");
  let sciFi = document.getElementById("sciFi");
  let romance = document.getElementById("romance");
  let type;

  if (action.checked) {
    type = 'Action';
  } else if (sciFi.checked) {
    type = 'SciFi';
  } else if (romance.checked) {
    type = 'Romance';
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  display.add(book);


  if (display.validate(book)) {
    display.show(
      "success",
      "Woo-Hoo, Book added successfully. Congratulation now you can add another one."
    );

    let storage = localStorage.getItem("storage");
    if (storage == null) {
      storageObj = [];
    } else {
      storageObj = JSON.parse(storage);
    }
    let myBook = {
      name: name,
      author: author,
      type: type,
    };
    storageObj.push(myBook);
    localStorage.setItem("storage", JSON.stringify(storageObj));
    display.add(book);
    // display.clear();
    // console.log(storageObj);
  } else {
    display.show(
      "danger",
      "Sorry you can't add this book. Try with diffrent parameters."
    );
  }
}
