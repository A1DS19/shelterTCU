import React, { useState } from 'react';
import { IFileWithMeta } from 'react-dropzone-uploader';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Grid, Header, Loader, Image, Confirm } from 'semantic-ui-react';
import { addPetsPictures, deleteImg } from '../../../actions/pets/pets';
import { PetsData } from '../../../actions/pets/petsInterfaces';
import { toTitleCase } from '../../../util/upperCase';
import { PhotosDropzone } from '../../common/photos/PhotosDropzone';

interface Props {
  selectedPet: PetsData | undefined;
}

export const PetPhotos: React.FC<Props> = ({ selectedPet }) => {
  const [files, setFiles] = useState([]);
  const [openConfirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPhotoDelete, setSelectedPhotoDelete] = useState<{
    petId: string;
    photoId: string;
    photoUrl: string;
  } | null>(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const ifPreview = () => {
    if (!files || !files.length) {
      return false;
    } else {
      return true;
    }
  };

  const openDeleteConfirm = (publicId: string, photoUrl: string) => {
    setSelectedPhotoDelete({ photoId: publicId, petId: selectedPet?._id!, photoUrl });
    setConfirm(true);
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
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderPhotos = () => {
    return selectedPet?.photosPublicId?.map((photo) => {
      return (
        <Grid.Column key={photo.photoId}>
          <Image
            fluid
            label={{
              style: { cursor: 'pointer' },
              as: 'a',
              icon: 'trash',
              color: 'red',
              ribbon: true,
              onClick: () => openDeleteConfirm(photo.photoId, photo.photoUrl),
            }}
            rounded
            src={photo.photoUrl}
          />
        </Grid.Column>
      );
    });
  };

  return (
    <React.Fragment>
      <Grid centered>
        <div>
          <Header>Fotos Actuales</Header>
          <Grid columns={3}>{renderPhotos()}</Grid>
        </div>
        <Grid.Row>
          {loading ? (
            <Loader />
          ) : (
            <Grid.Column width={16}>
              <Header
                as='h3'
                textAlign='center'
                content={
                  selectedPet?.photosUrl?.length! <= 2
                    ? selectedPet
                      ? `Agregar mas Fotos a ${toTitleCase(
                          selectedPet.name
                        )} (puede agregar ${3 - selectedPet.photosUrl?.length!})`
                      : 'Agregar Fotos'
                    : `${selectedPet?.name} ya tiene 3 fotos ya no se puede subir mas.`
                }
              />
              {selectedPet?.photosUrl?.length! <= 2 && (
                <PhotosDropzone
                  selectedPet={selectedPet}
                  handleSubmit={handlePhotosSubmit}
                  setFiles={setFiles}
                />
              )}
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
      <Confirm
        content={`Esta seguro que desea eliminar la fotografia?`}
        cancelButton='CANCELAR'
        confirmButton='ELIMINAR'
        size='small'
        open={openConfirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() =>
          dispatch(
            deleteImg(
              selectedPhotoDelete?.petId!,
              selectedPhotoDelete?.photoId!,
              selectedPhotoDelete?.photoUrl!
            )
          )
        }
      />
    </React.Fragment>
  );
};
