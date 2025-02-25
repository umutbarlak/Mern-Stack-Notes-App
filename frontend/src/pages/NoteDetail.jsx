import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import NoteAdd from "../components/NoteAdd";

const NoteDetail = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [note, setNote] = useState();
  console.log(id);

  const fetchNote = async () => {
    const response = await fetch(`http://localhost:3040/api/notes/${id}`);

    const { note } = await response.json();

    setNote(note);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3040/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/");
    }

    if (!response.ok) {
      setError(data.message);
    }

    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const handleUpdate = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className="p-10 relative min-h-[90vh]">
      {error && <Error error={error} />}
      {openModal && (
        <div className="absolute inset-0 z-10 bg-black p-10 bg-opacity-50">
          <div>
            <button
              onClick={() => setOpenModal(false)}
              className="bg-white p-1 px-5 float-end"
            >
              quit
            </button>
            <NoteAdd
              openModal={openModal}
              noteData={note}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      )}
      <div className="absolute top-5 right-5">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-600 hover:bg-gray-400 transition rounded-lg px-2 py-1 text-white "
        >
          back
        </button>
        <button
          onClick={handleUpdate}
          className="ms-5 bg-blue-600 hover:bg-blue-400 transition rounded-lg px-2 py-1 text-white "
        >
          update
        </button>
        <button
          onClick={handleDelete}
          className="ms-5 bg-red-600 hover:bg-red-400 transition rounded-lg px-2 py-1 text-white "
        >
          delete
        </button>
      </div>
      <h2 className="text-2xl">{note?.title}</h2>
      <p className="mx-4 mt-5">{note?.description}</p>
    </div>
  );
};

export default NoteDetail;
