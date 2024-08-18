import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NoteCard from "../components/NoteCard";
import { IoMdAdd } from "react-icons/io";
import Add_EditNote from "../components/Add_EditNote";
import NotesShimmer from "../components/NotesShimmer";
import { handlePinToggle, fetchNotes } from "../utils/noteApi";
import handleNoteDelete from "../utils/handleNoteDelete";
import useNotes from "../hooks/useNotes";
import ToastMsg from "../components/ToastMsg";

const HomePage = () => {
  const [showAddEdit, setShowAddEdit] = useState({
    show: false,
    type: null,
    noteID: null,
  });

  const [showToast, setShowToast] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [notes, setNotes] = useNotes(showToast);
  const handleAddNote = () => {
    setShowAddEdit({ show: true, type: "add" });
  };

  const handleCloseAddEdit = () => {
    setShowAddEdit({ show: false, type: null });
  };

  const handleShowToastMessage = (message, type) => {
    setShowToast({ show: true, message, type });
    const timer = setTimeout(() => {
      setShowToast(false);
      clearTimeout(timer);
    }, 3000);
  };

  return (
    <div className="relative w-screen min-h-screen bg-gray-100">
      <Header setNotes={setNotes} />
      {showToast.show && (
        <ToastMsg type={showToast.type} message={showToast.message} />
      )}
      {showAddEdit.show ? (
        <Add_EditNote
          onClose={handleCloseAddEdit}
          type={showAddEdit.type}
          noteID={showAddEdit.noteID}
          showToast={handleShowToastMessage}
          setNotes={setNotes}
        />
      ) : !notes ? (
        <NotesShimmer />
      ) : (
        <div className="w-full mt-28 container px-5 flex  items-center gap-4 mx-auto flex-wrap">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                id={note._id}
                key={note._id}
                title={note.title}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                createdOn={note.createdOnDate}
                handleEdit={() =>
                  setShowAddEdit({ show: true, type: "edit", noteID: note._id })
                }
                handlePinToogle={() => {
                  handlePinToggle(note._id, setNotes, handleShowToastMessage);
                }}
                handleDelete={() =>
                  handleNoteDelete(note._id, handleShowToastMessage)
                }
              />
            ))
          ) : (
            <div className="w-full flex justify-center items-center h-full">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-600">
                  No notes available.
                </h3>
                <p className="text-gray-500 mt-2">
                  Click on right to add a new note.
                </p>
              </div>
            </div>
          )}
          <div
            className="w-16 flex items-center justify-center text-center absolute h-16 bg-blue-600 right-8 bottom-5 rounded-2xl drop-shadow-md cursor-pointer"
            onClick={handleAddNote}
          >
            <IoMdAdd className=" text-4xl text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
