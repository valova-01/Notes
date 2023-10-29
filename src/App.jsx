import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  // Загрузка заметок из локального хранилища при первом запуске
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // При первом запуске добавляем одну заметку
      addNote("Пример заметки");
    }
  }, []);

  // Сохранение заметок в локальное хранилище при изменениях
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Добавление новой заметки
  const addNote = (title, text) => {
    const newNotes = [...notes, { title, text }];
    setNotes(newNotes);
    setCurrentTitle(""); // Очистим поле названия
    setCurrentNote(""); // Очистим поле текста
  };

  // Редактирование заметки
  const editNote = (index) => {
    setCurrentTitle(notes[index].title);
    setCurrentNote(notes[index].text);
    setEditingIndex(index);
  };

  // Сохранение отредактированной заметки
  const saveNote = () => {
    if (editingIndex === -1) return;

    const updatedNotes = [...notes];
    updatedNotes[editingIndex] = { title: currentTitle, text: currentNote };
    setNotes(updatedNotes);
    setCurrentNote("");
    setCurrentTitle("");
    setEditingIndex(-1);
  };

  // Удаление заметки
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <h1>Заметки</h1>
      <div className="container">
        <div className="input-section">
          <input
            type="text"
            placeholder="Заголовок (макс. 20 символов)"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            maxLength="20"
          />
          <textarea
            placeholder="Текст"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          {editingIndex === -1 ? (
            <button
              className="add-button"
              onClick={() => addNote(currentTitle, currentNote)}
            >
              Добавить
            </button>
          ) : (
            <button className="save-button" onClick={saveNote}>
              Сохранить
            </button>
          )}
        </div>
        <ul className="note-list">
          {notes.map((note, index) => (
            <li key={index} className="note-item">
              <h3 className="note-title">{note.title}</h3>
              <div className="note-content">{note.text}</div>
              <div className="note-actions">
                <button className="edit-button" onClick={() => editNote(index)}>
                  Редактировать
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteNote(index)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
