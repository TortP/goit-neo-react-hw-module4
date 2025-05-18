// components/Loader.jsx
import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <ClipLoader color="#3f51b5" size={40} />
    </div>
  );
};

export default Loader;
