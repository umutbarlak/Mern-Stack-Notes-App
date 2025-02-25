import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import NoteAdd from "../components/NoteAdd";

const Home = () => {
  const [notes, setNotes] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3040/api/notes");

      const { notes } = await response.json();

      if (response.ok) {
        setNotes(notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  console.log(notes);

  return (
    <div className="">
      <NoteAdd fetchNotes={fetchNotes} />
      {notes?.length < 1 && (
        <div className="text-center w-full mt-5 ">Henüz not yok</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
        {notes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Home;
