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
      maxFiles={
        selectedPet?.photosUrl?.length! === 0 ? 3 : 3 - selectedPet?.photosUrl?.length!
      }
      accept='image/*'
      inputContent='Arrastre o click aquí para subir foto'
      inputWithFilesContent={(files) => {
        console.log(files.length);

        return `Puede agregar ${3 - files.length} más`;
      }}
      styles={styles}
    />
  );
};
