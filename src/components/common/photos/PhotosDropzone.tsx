import React from 'react';
import Dropzone, {
  IFileWithMeta,
  IStyleCustomization,
  StatusValue,
} from 'react-dropzone-uploader';
import { PetsData } from '../../../actions/pets/petsInterfaces';

interface Props {
  handleSubmit: (files: IFileWithMeta[], allFiles: IFileWithMeta[]) => void;
  setFiles: React.Dispatch<React.SetStateAction<never[]>>;
  selectedPet: PetsData | undefined;
}

export const PhotosDropzone: React.FC<Props> = ({
  handleSubmit,
  setFiles,
  selectedPet,
}) => {
  const handleChangeStatus = ({ meta, remove }: any, status: StatusValue) => {
    setFiles(meta);
  };

  const styles: IStyleCustomization<React.CSSProperties> = {
    submitButton: { backgroundColor: 'orange' },
    inputLabel: { color: 'black' },
    inputLabelWithFiles: { color: 'black' },
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={3 - selectedPet?.photosUrl?.length!}
      accept='image/*'
      inputContent='Arrastre o click aqui para subir foto'
      inputWithFilesContent={(files) => {
        return `Puede agregar ${
          files.length + selectedPet?.photosUrl?.length! - selectedPet?.photosUrl?.length!
        } mas`;
      }}
      styles={styles}
    />
  );
};
