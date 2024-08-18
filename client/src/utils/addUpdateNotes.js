//  const addNotes = async () => {
//     try {
//       const response = await fetch(
//         import.meta.env.VITE_BASE_URL + "/notes/addNote",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({
//             title,
//             content,
//             tags,
//           }),
//         }
//       );
//       const data = await response.json();
//       if (data.error) {
//         setError(error);
//         return;
//       }
//       onClose();
//     } catch (error) {
//       setError(error);
//     }
//   };

// const updateNotes = async () => {
//     try {
//       const response = await fetch(
//         import.meta.env.VITE_BASE_URL + "/notes/editNote/" + noteID,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({
//             title,
//             content,
//             tags,
//           }),
//         }
//       );
//       const data = await response.json();
//       if (data.error) {
//         setError(error);
//         return;
//       }
//       onClose();
//     } catch (error) {
//       setError(error);
//     }
//   };