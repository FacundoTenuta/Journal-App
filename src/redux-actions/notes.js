import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../services/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../services/fileUpload";

// react-journal


export const startNewNote = () => {

    return async( dispatch, getState ) => {

        dispatch( setNotesLoading() );

        const uid = getState().auth.uid;

        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime()
        }

        try {
            const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
    
            dispatch( activeNote( doc.id, newNote ) );
            dispatch( addNewNote( doc.id, newNote ) );
            dispatch( setNotesLoading() );
        } catch (error) {
            console.log(error);
        }

    }

}

export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        dispatch( setNotesLoading() );
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
        dispatch( setNotesLoading() );

    }
}

export const setNotesLoading = () => ({
    type: types.notesLoading
});

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = ( note ) => {
    
    return async( dispatch, getState ) => {

        if ( !Swal.isVisible() ) {
            Swal.fire({
                title: "Uploading...",
                text: "Please wait...",
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });
        }

        const { uid } = getState().auth;

        if ( !note.url ) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );
        if ( Swal.isVisible() ) {
            Swal.close();
        }
        Swal.fire("Saved", note.title, "success");

    }

}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: "Uploading...",
            text: "Please wait...",
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        await fileUpload( file )
            .then( ( fileUrl ) => {
                activeNote.url = fileUrl;
                dispatch( startSaveNote( activeNote ) );
            });

    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {

        dispatch( setNotesLoading() );
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( deleteNote( id ) );
        dispatch( setNotesLoading() );

    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});