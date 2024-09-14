// import React from 'react'

// export const WorkoutFormUpdate = ({ workout, onUpdate, onClose }) => {
//     const [title, setTitle] = useState(workout.title);
//     const [load, setLoad] = useState(workout.load);
//     const [reps, setReps] = useState(workout.reps);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Aquí puedes enviar los datos actualizados al servidor y manejar la lógica de actualización
//         onUpdate({ title, load, reps });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//             <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
//             <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
//             <button type="submit">Update</button>
//             <button type="button" onClick={onClose}>Close</button>
//         </form>
//     );
// };

