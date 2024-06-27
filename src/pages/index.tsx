import Dashboard from '@/components/dashboard/Dashboard';

export default function App() {
  //   const handleUpload = async (file: File) => {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     try {
  //       const response = await fetch('/api/upload', {
  //         method: 'POST',
  //         body: formData,
  //       });
  //       if (response.ok) {
  //         // fetchData();
  //       } else {
  //         console.error('Upload failed');
  //       }
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //     }
  //   };

  return (
    <>
      <Dashboard />
    </>
  );
}
