import React, { useEffect, useState } from "react";
import Error from "./Error";

const NoteAdd = ({ fetchNotes, updateNote, setUpdate }) => {
  const [error, setError] = useState(null);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateNote) {
      const response = await fetch(
        `http://localhost:3040/api/notes/${updateNote._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(note),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }

      if (response.ok) {
        setNote({
          title: "",
          description: "",
        });
        fetchNotes();
        setUpdate(false);
      }
    } else {
      const response = await fetch("http://localhost:3040/api/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }

      if (response.ok) {
        setNote({
          title: "",
          description: "",
        });
        fetchNotes();
      }
    }
  };

  useEffect(() => {
    if (updateNote) {
      setNote({
        title: updateNote.title,
        description: updateNote.description,
      });
    }
  }, []);

  return (
    <div className="p-5 py-10 bg-indigo-100">
      <h3 className="text-xl font-bold mb-2">Add Note</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5 max-sm:flex-col">
          <div className="flex flex-col flex-1">
            <label className="label" htmlFor="">
              Title:
            </label>
            <input
              className="input-style "
              value={note.title}
              name="title"
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="label" htmlFor="">
              Description:
            </label>
            <input
              className="input-style "
              value={note.description}
              name="description"
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>
        <button className="w-full mt-4 bg-blue-500 text-white p-2 hover:bg-blue-600">
          EKLE
        </button>
        {error && <Error error={error} />}
      </form>
    </div>
  );
};

export default NoteAdd;
