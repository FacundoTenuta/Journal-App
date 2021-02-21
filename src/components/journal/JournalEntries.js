import React from 'react'
import { JournalEntry } from './JournalEntry';
import { useSelector } from 'react-redux';

export const JournalEntries = () => {

    const { notes, loading } = useSelector(state => state.notes);

    return (

        <div className="journal__entries">
            
            <div>
                
                {
                    notes.map( note => (
                        <JournalEntry 
                            key={ note.id } 
                            { ...note }
                        />
                    ))
                }

            </div>
            {
                ( loading ) &&
                <div className="journal__entries-loading">
                    <p>Cargando...</p>
                </div>
            }
        </div>
    )
}
