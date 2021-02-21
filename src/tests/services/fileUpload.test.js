import cloudinary from "cloudinary";

import { fileUpload } from "../../services/fileUpload";

cloudinary.config({ 
    cloud_name: 'dp30raodr', 
    api_key: '285747111333274', 
    api_secret: '-YNfhjf0yYxst4e-9tNysGOHW1w' 
});

describe('Pruebas en fileUpload', () => {
    
    test('debe cargar un archivo y retornar el URL', async( done ) => {
       
        const resp = await fetch("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png");
        const blob = await resp.blob();


        const file = new File([blob], "foto.png");
        const url = await fileUpload( file );

        expect( typeof url ).toBe("string");

        const segments = url.split("/");
        const imageId = segments[ segments.length - 1 ].replace(".png", "");

        cloudinary.v2.api.delete_resources( imageId, {}, () => {
            done();
        } );

    });

    test('debe retornar un error', async() => {

        const file = new File([], "foto.png");
        const url = await fileUpload( file );

        expect( url ).toBe( null );

    });
    

});
