export const fetchNotes = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      import.meta.env.VITE_BASE_URL + "/notes/getNotes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

export const handlePinToggle = async (id, setNotes, handleShowToastMessage) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      import.meta.env.VITE_BASE_URL + "/notes/updatePin/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    
    if (data.error) {
      handleShowToastMessage("Failed to toggle pin status", "error");
      return;
    }
    
    // Refetch the notes after pinning
    const updatedNotes = await fetchNotes();
    
    // Sort the notes to have pinned ones first
    const sortedNotes = updatedNotes.notes.sort((a, b) => b.isPinned - a.isPinned);
    
    // Update the notes state
    setNotes(sortedNotes);
    
    handleShowToastMessage("Pin status updated successfully", "success");
  } catch (error) {
    console.error("Failed to toggle pin:", error);
    handleShowToastMessage("Failed to toggle pin status", "error");
  }
};
