import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import PrimaryButton from "./PrimaryButton";

const Add_EditNote = ({ type, onClose, noteID, showToast }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const tagRef = useRef(null);

  const addNotes = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/notes/addNote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            content,
            tags,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(error);
        return;
      }
      onClose();
      showToast("Note added successfully","success")
    } catch (error) {
      setError(error);
    }
  };

  const updateNotes = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/notes/editNote/" + noteID,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title,
            content,
            tags,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        setError(error);
        return;
      }
      onClose();
      showToast("Note updated successfully","success")
    } catch (error) {
      setError(error);
    }
  };

  

  useEffect(() => {
    const fetchNote = async (id) => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BASE_URL + "/notes/getNote/" + noteID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.error) {
          setError(data.message);
          return;
        }
        setTitle(data.note.title);
        setContent(data.note.content);
        setTags(data.note.tags);
      } catch (error) {
        setError(error);
      }
    };
    if (type === "edit") {
      fetchNote(noteID);
    }
  }, [type, noteID]);
  const handleTagAdd = (e) => {
    setTags([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };

  const onRemoveTag = (removeIndex) => {
    setTags(tags.filter((_, index) => index !== removeIndex));
  };

  const handleButtonPress = (e) => {
    setError(null);
    e.preventDefault();
    if (!title) {
      setError("Please enter the Title");
    }
    if (!content) {
      setError("Please enter the content");
    }

    if (type === "edit") {
      updateNotes();
    } else {
      addNotes();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleTagAdd();
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-3 mx-auto mt-6">
        <div
          className="close float-right w-8 h-8 rounded-full flex items-center justify-center text-white bg-red-500 cursor-pointer"
          onClick={onClose}
        >
          <IoIosClose className="font-bold text-5xl" />
        </div>
        <h1 className="text-center font-bold text-xl mb-6 text-black">
          {type === "add" ? "Add Note" : "Edit Note"}
        </h1>
        <form className="px-3">
          <label htmlFor="title" className="block text-black font-semibold">
            Title:
          </label>
          <input
            type="text"
            name="title"
            className="bg-gray-200 w-full h-8 rounded-md p-2 mt-2"
            placeholder="Go to the market"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="content"
            className="block text-black font-semibold mt-5"
          >
            Content:
          </label>
          <textarea
            rows={8}
            type="textarea"
            name="content"
            value={content}
            className="bg-gray-200 w-full rounded-md p-2 mt-2 resize-none"
            placeholder="Have to go to the market and buy some goods"
            onChange={(e) => setContent(e.target.value)}
          />
          <label htmlFor="tags" className="block text-black font-semibold">
            Tags:
          </label>
          <div className="w-9/12 flex flex-wrap items-center">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 rounded-md p-1 mr-2 mb-2"
              >
                <span className="text-sm">#{tag}</span>
                <IoIosClose
                  className="ml-1 text-xl font-bold text-red-600 cursor-pointer"
                  onClick={() => onRemoveTag(index)}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 justify-between w-6/12 mt-2 mb-5">
            <input
              type="text"
              name="tags"
              className="bg-gray-200 w-9/12 h-8 rounded-md p-2"
              placeholder="Add a tag"
              ref={tagRef}
              onKeyDown={handleKeyPress}
            />
            <div
              className="w-8 h-8 border border-blue-500 flex items-center justify-center text-2xl rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
              onClick={handleTagAdd}
            >
              <IoMdAdd />
            </div>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <PrimaryButton
            value={type === "add" ? "Add Note" : "Save Note"}
            onClick={handleButtonPress}
          />
        </form>
      </div>
    </div>
  );
};

export default Add_EditNote;
