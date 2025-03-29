import { notesData } from "../data/sample-notes.js";

class FormInput extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        #noteForm {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 50%;
          margin: auto;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

       input[type="text"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 15px;
      }

      textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
        margin-bottom: 15px;
        height: 150px; 
        resize: vertical;
      }

      button[type="submit"] {
        background-color: #4caf50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        width: 100%;
        box-sizing: border-box;
        transition: background-color 0.3s ease;
      }

      button[type="submit"]:hover {
        background-color: #45a049;
      }

      button[type="submit"]:disabled {
        background-color: #ddd;
        cursor: not-allowed;
      }


        button[type="submit"]:hover {
          background-color: #45a049; 
        }

        .edit-btn {
          background-color: #3c48f0; 
          color: white;
        }

        .edit-btn:hover {
          background-color: #2e3ed4;
        }

        .delete-btn {
          background-color: #f44336;
          color: white;
        }

        .delete-btn:hover {
          background-color: #d32f2f;
        }


        button[type="submit"]:disabled {
          background-color: #ddd;
          cursor: not-allowed;
        }

        .error {
          color: red;
          font-size: 12px;
          display: none;
        }

        @media (max-width: 768px) {
          #noteForm {
            padding: 15px;
            max-width: 100%;
          }

          #notesList {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          label {
            font-size: 12px;
          }

          input[type="text"],
          textarea {
            padding: 8px;
            font-size: 13px;
          }

          button[type="submit"] {
            padding: 12px 20px;
            font-size: 14px;
          }
        }
      </style>

      <button id="addNoteBtn">Add Notes</button>

      <div id="overlay" class="overlay" style="display: none;"></div>

      <form id="noteForm" class="hidden">
        <label for="title">Judul:</label>
        <input type="text" id="title" name="title" required minlength="3" pattern="^[^<>]*$" placeholder="Masukkan judul">
        <span id="titleError" class="error"></span>
        <br><br>

        <label for="content">Isi:</label>
        <textarea id="content" name="content" required minlength="10" placeholder="Masukkan isi catatan"></textarea>
        <span id="contentError" class="error"></span>
        <br><br>

        <button type="submit" id="submitBtn">Kirim</button>
      </form>
      
      <div id="notesList"></div>
    `;

    this.addNoteBtn = this.querySelector("#addNoteBtn");
    this.noteForm = this.querySelector("#noteForm");
    this.overlay = this.querySelector("#overlay");
    this.notesListElement = this.querySelector("#notesList");

    this.addNoteBtn.addEventListener("click", () => {
      this.clearForm();
      this.showForm();
    });

    this.overlay.addEventListener("click", () => {
      this.hideForm();
    });

    this.noteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.isEditing) {
        this.updateNote();
      } else {
        this.addNewNote();
      }
    });

    this.displayNotes();
  }

  // Menambahkan catatan baru ke notesData
  addNewNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title && content) {
      const newNote = {
        id: "notes-" + Date.now(),
        title: title,
        body: content,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      notesData.push(newNote);

      this.displayNotes();

      this.hideForm();
      alert("Catatan berhasil ditambahkan!");
    } else {
      alert("Judul dan isi catatan tidak boleh kosong.");
    }
  }

  // Mengedit catatan yang sudah ada
  updateNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    const noteIndex = notesData.findIndex(
      (note) => note.id === this.currentNoteId
    );
    if (noteIndex !== -1 && title && content) {
      notesData[noteIndex].title = title;
      notesData[noteIndex].body = content;
      notesData[noteIndex].createdAt = new Date().toISOString();

      this.displayNotes();

      this.hideForm();
      alert("Catatan berhasil diperbarui!");
    } else {
      alert("Judul dan isi catatan tidak boleh kosong.");
    }
  }

  // Menampilkan semua catatan
  displayNotes() {
    this.notesListElement.innerHTML = "";

    notesData.forEach((note) => {
      const noteElement = this.createNoteItemElement(note);
      this.notesListElement.appendChild(noteElement);
    });
  }

  createNoteItemElement({ id, title, body, createdAt }) {
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
    editButton.addEventListener("click", () => this.editNote(id));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.setAttribute("data-id", id);
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => this.deleteNote(id));

    buttonContainer.append(editButton, deleteButton);
    container.append(titleElement, bodyElement, dateElement, buttonContainer);

    return container;
  }

  editNote(id) {
    const note = notesData.find((note) => note.id === id);
    if (note) {
      this.showForm();
      this.isEditing = true;
      this.currentNoteId = id;

      document.getElementById("title").value = note.title;
      document.getElementById("content").value = note.body;

      const submitButton = this.querySelector("#submitBtn");
      submitButton.textContent = "Update";
    }
  }

  // Fungsi untuk menghapus catatan
  deleteNote(id) {
    const noteIndex = notesData.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
      notesData.splice(noteIndex, 1);
      this.displayNotes();
      alert("Catatan berhasil dihapus!");
    }
  }

  showForm() {
    this.noteForm.classList.remove("hidden");
    this.overlay.style.display = "block";
  }

  hideForm() {
    this.noteForm.classList.add("hidden");
    this.overlay.style.display = "none";
  }

  clearForm() {
    this.isEditing = false;
    this.currentNoteId = null;
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    const submitButton = this.querySelector("#submitBtn");
    submitButton.textContent = "Kirim";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formInputElement = document.querySelector("form-input");
  formInputElement.displayNotes();
});

customElements.define("form-input", FormInput);
