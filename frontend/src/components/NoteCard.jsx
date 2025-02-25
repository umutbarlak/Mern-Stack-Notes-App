import React from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note-detail/${note._id}`}
      className="rounded-md relative overflow-hidden"
    >
      <h2 className="text-2xl bg-orange-200 px-4 py-2">{note.title}</h2>
      <div className="px-4 py-3 text-xl bg-gray-200">
        <p className="mb-2">{note.description}</p>
        <p className="text-xs">{note.createdAt.slice(0, 10)}</p>
      </div>
    </Link>
  );
};

export default NoteCard;
