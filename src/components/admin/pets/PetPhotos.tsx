import React, { useState } from 'react';
import { IFileWithMeta } from 'react-dropzone-uploader';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Grid, Header, Loader } from 'semantic-ui-react';
import { addPetsPictures } from '../../../actions/pets/pets';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { toTitleCase } from '../../../util/upperCase';
import { PhotosDropzone } from '../../common/photos/PhotosDropzone';

interface Props {
  selectedPet: PetsData | undefined;
}

export const PetPhotos: React.FC<Props> = ({ selectedPet }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const ifPreview = () => {
    if (!files || !files.length) {
      return false;
    } else {
      return true;
    }
  };

  const handlePhotosSubmit = (files: IFileWithMeta[], allFiles: IFileWithMeta[]) => {
    try {
      setLoading(true);
      const images = files.map((f: any) => f.file);

      dispatch(
        addPetsPictures(selectedPet?.id?.toString()!, images, () => {
          allFiles.forEach((f: any) => f.remove());
          history.push(`/admin/pets`);
        })
      );
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid centered>
      <Grid.Row>
        {loading ? (
          <Loader />
        ) : (
          <Grid.Column width={16}>
            <Header
              as='h3'
              textAlign='center'
              content={
                selectedPet?.photosUrl?.length! < 2
                  ? selectedPet
                    ? `Agregar mas Fotos a ${toTitleCase(selectedPet.name)}`
                    : 'Agregar Fotos'
                  : `${selectedPet?.name} ya tiene 3 fotos ya no se puede subir mas.`
              }
            />
            {selectedPet?.photosUrl?.length! < 2 && (
              <PhotosDropzone handleSubmit={handlePhotosSubmit} setFiles={setFiles} />
            )}
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};
