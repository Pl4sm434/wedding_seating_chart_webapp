const STORAGE_KEY = "weddingSeatingGuests";

let guests = loadGuests();

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultDiv = document.getElementById("result");

const adminToggleButton = document.getElementById("adminToggleButton");
const adminSection = document.getElementById("adminSection");
const addGuestForm = document.getElementById("addGuestForm");
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const tableInput = document.getElementById("tableInput");
const guestList = document.getElementById("guestList");
const clearAllButton = document.getElementById("clearAllButton");

function loadGuests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveGuests() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
}

function renderGuestList() {
  guestList.innerHTML = "";
  guests.forEach((guest, index) => {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = `${guest.firstName} ${guest.lastName} — ${guest.table}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.type = "button";
    removeBtn.className = "remove-guest-button";
    removeBtn.addEventListener("click", () => {
      guests.splice(index, 1);
      saveGuests();
      renderGuestList();
    });

    li.appendChild(label);
    li.appendChild(removeBtn);
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

  if (guests.length === 0) {
    showResult("No guests have been added yet.", "error");
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

function addGuest(event) {
  event.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const table = tableInput.value.trim();

  if (!firstName || !lastName || !table) {
    return;
  }

  guests.push({ firstName, lastName, table });
  saveGuests();
  renderGuestList();

  addGuestForm.reset();
  firstNameInput.focus();
}

function clearAllGuests() {
  const confirmed = confirm("Remove all guests from the list? This cannot be undone.");
  if (!confirmed) return;

  guests = [];
  saveGuests();
  renderGuestList();
}

searchButton.addEventListener("click", findGuest);

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    findGuest();
  }
});

adminToggleButton.addEventListener("click", () => {
  adminSection.classList.toggle("hidden");
});

addGuestForm.addEventListener("submit", addGuest);
clearAllButton.addEventListener("click", clearAllGuests);

renderGuestList();
