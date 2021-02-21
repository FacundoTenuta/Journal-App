import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../redux-actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
// import { fileUpload } from '../../services/fileUpload';

jest.mock('../../services/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return Promise.resolve("https://hola-mundo.com/cosa.jpg");
    })
}));
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: "TESTING"
    },
    notes: {
        active: {
            id: "9G4fngEIOE8co0XYPEbr",
            title: "title",
            body: "body",
            date: 1598576553232
        }
    }
});

describe('Pruebas con las acciones de notes', () => {

    beforeEach( () => {
        store.clearActions();
    });
    
    test('debe crear una nueva nota con startNewNote', async() => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoading,
        });

        expect( actions[1] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            }
        });

        expect( actions[2] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            }
        });

        expect( actions[3] ).toEqual({
            type: types.notesLoading,
        });

        const docId = actions[1].payload.id;
        await db.doc(`${ store.getState().auth.uid }/journal/notes/${ docId }`).delete();

    });

    test('startLoadingNotes debe cargar las notas', async() => {
       
        await store.dispatch( startLoadingNotes( store.getState().auth.uid ) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoading,
        });

        expect( actions[1] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[1].payload[0] ).toMatchObject( expected );

        expect( actions[2] ).toEqual({
            type: types.notesLoading,
        });

    });

    test('startSaveNote debe actualizar la nota', async() => {
       
        const note = {
            id: "9G4fngEIOE8co0XYPEbr",
            title: "titulo",
            body: "body"
        };

        await store.dispatch( startSaveNote( note ) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`${ store.getState().auth.uid }/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );

    });

    test('startUploading debe actualizar el url del entry', async() => {
       
        const file = new File([], "foto.jpg");
        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc(`${ store.getState().auth.uid }/journal/notes/${ store.getState().notes.active.id }`).get();
        expect( docRef.data().url ).toBe( "https://hola-mundo.com/cosa.jpg" );

    });
    
    
    
});
