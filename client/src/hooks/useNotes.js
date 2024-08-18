import React, { useEffect, useState } from 'react'
import { fetchNotes } from '../utils/noteApi';

const useNotes = (showToast) => {
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        const loadNotes = async () => {
            const data = await fetchNotes();
            if (!data.error) {
              const sortedNotes = data.notes.sort((a, b) => {
                return b.isPinned - a.isPinned;
              });
              setNotes(sortedNotes);
            }
          };
          loadNotes();
      }, [showToast.show]);
  return [
    notes, setNotes
    ]
}

export default useNotes