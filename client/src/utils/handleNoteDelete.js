const handleNoteDelete = async (id, handleShowToastMessage) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      import.meta.env.VITE_BASE_URL + "/notes/deleteNote/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data.error) {
    }
    handleShowToastMessage("Note Deleted Successfully","delete" );
  } catch (error) {
    console.error("Failed to delete:", error);
    throw error;
  }
};

export default handleNoteDelete;
