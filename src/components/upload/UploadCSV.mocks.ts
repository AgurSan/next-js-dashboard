import { IUploadCSV } from './UploadCSV';

const base: IUploadCSV = {
  onUpload: (file) => console.log('File uploaded:', file.name),
};

export const mockUploadCSVProps = {
  base,
};
