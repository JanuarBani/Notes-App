import { notesData } from "../data/sample-notes.js";

const notesListElement = document.querySelector("#notesList");

// Fungsi untuk membuat elemen note
function createNoteItemElement({ id, title, body, createdAt }) {
  const container = document.createElement("div");
  container.classList.add("note-item");
  container.setAttribute("data-noteid", id);

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  const bodyElement = document.createElement("p");
  bodyElement.innerText = body;

  const dateElement = document.createElement("small");
  dateElement.textContent = `Created At: ${new Date(
    createdAt
  ).toLocaleString()}`;

  const buttonContainer = document.createElement("div");

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.setAttribute("data-id", id);
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.setAttribute("data-id", id);
  deleteButton.textContent = "Delete";

  buttonContainer.append(editButton, deleteButton);
  container.append(titleElement, bodyElement, dateElement, buttonContainer);

  return container;
}

class SearchForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form#searchBook {
          display: flex;
          justify-content: flex-start;
          align-items: center;
					margin-top: 5px;
        }

        label {
          display: inline-block;
          color: #333;
          margin-right: 10px;
          font-weight: bold;
          padding-right: 10px;
        }

        #searchBook input {
          padding: 8px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-right: 10px;
          width: 250px;
        }

        #searchBook button {
          padding: 8px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        #searchBook button:hover {
          background-color: #45a049;
        }

        @media (max-width: 600px) {
				  #notesList {
						grid-template-columns: 1fr;
						padding: 15px;
					}
          form#searchBook {
            flex-direction: column;
            align-items: flex-start;
          }

          #searchBook input {
            width: 100%;
            margin-bottom: 10px;
          }

          #searchBook button {
            width: 100%;
          }
        }
      </style>

      <form id="searchBook">
        <label for="searchBookTitle">Judul:</label>
        <input
          id="searchBookTitle"
          type="text"
          placeholder="Cari catatan..."
        />
        <button
          id="searchSubmit"
          type="submit"
        >
          Cari
        </button>
      </form>
    `;
  }

  addEventListeners() {
    const searchForm = this.shadowRoot.querySelector("#searchBook");
    searchForm.addEventListener("submit", this.handleSearch.bind(this));
    const inputField = this.shadowRoot.querySelector("#searchBookTitle");
    inputField.addEventListener("input", this.handleSearchInput.bind(this));
  }

  handleSearch(event) {
    event.preventDefault();
    const searchQuery = this.shadowRoot
      .querySelector("#searchBookTitle")
      .value.trim()
      .toLowerCase();
    this.dispatchEvent(new CustomEvent("search", { detail: searchQuery }));
  }

  handleSearchInput(event) {
    const searchQuery = event.target.value.trim().toLowerCase();
    this.dispatchEvent(new CustomEvent("search", { detail: searchQuery }));
  }
}

function displayNotes(notes) {
  notesListElement.innerHTML = "";
  notes.forEach((note) => {
    const element = createNoteItemElement(note);
    notesListElement.append(element);
  });
}

const searchFormElement = document.querySelector("search-form");

searchFormElement.addEventListener("search", (event) => {
  const query = event.detail;
  if (query === "") {
    displayNotes(notesData);
  } else {
    const filteredNotes = notesData.filter((note) =>
      note.title.toLowerCase().includes(query)
    );
    displayNotes(filteredNotes);
  }
});

displayNotes(notesData);

customElements.define("search-form", SearchForm);
