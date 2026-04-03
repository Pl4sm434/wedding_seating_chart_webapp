const guests = [
  { firstName: "Johan", lastName: "George", table: "Head Table" },
  { firstName: "Anjali", lastName: "Varghese", table: "Head Table" },
  { firstName: "Pradeep", lastName: "John", table: "Table 1" },
  { firstName: "Antony", lastName: "Joseph", table: "Table 2" },
  { firstName: "Linda", lastName: "Varghese", table: "Table 3" },
  { firstName: "Alan", lastName: "Aby", table: "Table 4" },
  { firstName: "Arun", lastName: "Varughese", table: "Table 5" }
];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultDiv = document.getElementById("result");
const guestList = document.getElementById("guestList");

function renderGuestList() {
  guests.forEach((guest) => {
    const li = document.createElement("li");
    li.textContent = `${guest.firstName} ${guest.lastName} — ${guest.table}`;
    guestList.appendChild(li);
  });
}

function showResult(message, type) {
  resultDiv.textContent = message;
  resultDiv.classList.remove("hidden", "success", "error");
  resultDiv.classList.add(type);
}

function findGuest() {
  const input = searchInput.value.trim().toLowerCase();

  if (!input) {
    showResult("Please enter a guest name.", "error");
    return;
  }

  const matches = guests.filter((guest) => {
    const first = guest.firstName.toLowerCase();
    const last = guest.lastName.toLowerCase();
    const full = `${first} ${last}`;
    return first.includes(input) || last.includes(input) || full.includes(input);
  });

  if (matches.length === 1) {
    const guest = matches[0];
    showResult(
      `${guest.firstName} ${guest.lastName}, your table is ${guest.table}.`,
      "success"
    );
  } else if (matches.length > 1) {
    const names = matches.map(
      (guest) => `${guest.firstName} ${guest.lastName} (${guest.table})`
    );
    showResult(`Multiple matches found: ${names.join(", ")}`, "success");
  } else {
    showResult("Guest not found. Please try another name.", "error");
  }
}

searchButton.addEventListener("click", findGuest);

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    findGuest();
  }
});

renderGuestList();