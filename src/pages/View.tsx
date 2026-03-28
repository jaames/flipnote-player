import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const View = () => {
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      console.log(id);
    }
  }, [id]);
  
  return (
    <div>
      <h1>View</h1>
      <p>ID: {id}</p>
    </div>
  );
};