import React from "react";
import { TiPinOutline } from "react-icons/ti";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const NoteCard = ({
  id,
  title,
  content,
  tags,
  createdOn,
  isPinned,
  handleEdit,
  handleDelete,
  handlePinToogle
}) => {
  return (
    <div className="w-[30%] bg-white rounded-lg p-3 drop-shadow-md cursor-pointer py-4">
      <TiPinOutline
        onClick={handlePinToogle}
        className={`${
          isPinned ? "text-blue-700" : "text-gray-600"
        } font-bold text-2xl float-right hover:text-blue-700`}
      />
      <div className="flex items-center justify-between">
        <h4 className=" text-black opacity-90 font-semibold text-lg">
          {title}
        </h4>
      </div>
      <p className="mb-2 text-sm opacity-40 font-semibold">
        {new Date(createdOn).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="w-full flex items-center flex-wrap text-md text-gray-800">
        {content.length > 90 ? `${content.slice(0, 90)} ....` : content}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-700 font-medium">
          {tags.map((tag) => `#${tag} `)}
        </span>
        <div className="icons flex items-center justify-center gap-4  text-md text-blue-400">
          <FaPen onClick={handleEdit} className="hover:text-blue-600" />
          <MdDelete
            className="text-[1.4rem] hover:text-blue-600"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
