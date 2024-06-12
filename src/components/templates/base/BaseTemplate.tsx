export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">{sampleTextProp}</div>
  );
};

export default BaseTemplate;
