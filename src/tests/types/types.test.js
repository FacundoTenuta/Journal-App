import { types } from "../../types/types";


describe('Pruebas en el archivo types', () => {
   
    test('debe funcionar correctamente', () => {
       
        const wrapper = types;

        expect( wrapper ).toEqual(
            {

                login: "[Auth] Login",
                logout: "[Auth] Logout",
            
                uiSetError: "[UI] Set Error",
                uiRemoveError: "[UI] Remove Error",
            
                uiStartLoading: "[UI] Start loading",
                uiFinishLoading: "[UI] Finish loading",
            
                notesAddNew: "[Notes] New notes",
                notesActive: "[Notes] Set active note",
                notesLoad: "[Notes] Load notes",
                notesUpdated: "[Notes] Updated note",
                notesFileUrl: "[Notes] Update image url",
                notesDelete: "[Notes] Delete note",
                notesLogoutCleaning: "[Notes] Logout Cleaning",
                notesLoading: "[Notes] Change loading",
            
            }
        );

    });
    

});