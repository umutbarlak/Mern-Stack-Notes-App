import React, { useEffect, useState } from "react";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const NoteAdd = ({ fetchNotes, noteData, setOpenModal }) => {
  const navigate = useNavigate();
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

  console.log(error);

  const updateNote = async () => {
    const response = await fetch(
      `http://localhost:3040/api/notes/${noteData._id}`,
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
      setOpenModal(false);
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (noteData) {
      updateNote();
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
    if (noteData) {
      setNote({
        title: noteData.title,
        description: noteData.description,
      });
    }
  }, []);

  return (
    <div className="p-5 py-10 bg-indigo-100">
      <h3 className="text-xl font-bold mb-2">
        {noteData ? "Update" : "Add Note"}
      </h3>
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
          {noteData ? "UPDATE" : "ADD"}
        </button>
        {error && <Error error={error} />}
      </form>
    </div>
  );
};

export default NoteAdd;
