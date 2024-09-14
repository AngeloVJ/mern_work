import React, { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import Modal from 'react-modal';

// import date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

Modal.setAppElement('#root');

export const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')

    useEffect(() => {
        if (workout) {
            setTitle(workout.title || '');
            setLoad(workout.load || '');
            setReps(workout.reps || '');
        }
    }, [workout]);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // button update
    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!user) {
            return
        }

        const workoutData = {};

        if (title.trim() !== '') {
            workoutData.title = title;
        }
        if (load.toString().trim() !== '') {
            workoutData.load = load;
        }
        if (reps.toString().trim() !== '') {
            workoutData.reps = reps;
        }

        // If there no data to update, finish the funtion
        if (Object.keys(workoutData).length === 0) {
            setModalIsOpen(false);
            return;
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PATCH',
            body: JSON.stringify(workoutData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'UPDATE_WORKOUT', payload: json });
            setModalIsOpen(false);
        }
    }

    // button delete
    const handleClickDelete = async () => {

        if (!user) {
            return
        }

        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <div className='workout-details'>
            <h4>{workout.title} </h4>
            <p><strong>Load (kg)</strong>{workout.load} </p>
            <p><strong>Reps: </strong>{workout.reps} </p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })} </p>
            <span className='material-symbols-outlined' onClick={handleClickDelete}>Delete</span>
            <span className='material-symbols-outlined' onClick={openModal}>Edit</span>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        width: '40%',
                        height: '60%',
                        margin: 'auto'
                    }
                }}
            >
                <form className='create' onSubmit={handleUpdate}>
                    <h3>Edit Workout</h3>
                    <label>Excersize Title:</label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                    <label>Load (in kg):</label>
                    <input
                        type='number'
                        onChange={(e) => setLoad(e.target.value)}
                        value={load}
                    />

                    <label>Reps:</label>
                    <input
                        type='number'
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                    />
                    <button>Update Workout</button>
                    <button type="button" onClick={closeModal}>Cancel</button>
                </form>
            </Modal>
        </div>
    )
}

export default WorkoutDetails
