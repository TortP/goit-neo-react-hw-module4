// App.jsx
import { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PER_PAGE = 12;

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [totalResults, setTotalResults] = useState(null);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query,
          page,
          per_page: PER_PAGE,
        },
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      });
      setImages(prev => [...prev, ...response.data.results]);
      setTotalResults(response.data.total);
      setIsFirstFetch(false);
    } catch {
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (query === '') return;
    fetchImages();
  }, [query, page, fetchImages]);

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setIsFirstFetch(true);
    setTotalResults(null);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setPage(prev => prev + 1);
  };

  const noResults = !loading && !error && images.length === 0 && !isFirstFetch;
  const allImagesLoaded = totalResults !== null && images.length >= totalResults && !noResults;

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} icon={<FiSearch />} />

      {images.length > 0 && <ImageGallery images={images} onImageClick={setSelectedImage} />}

      {loading && <Loader />}

      {noResults && (
        <ErrorMessage message="No images found for your request." />
      )}

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && !loading && !allImagesLoaded && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {allImagesLoaded && !loading && (
        <ErrorMessage message="All images have been loaded." />
      )}

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default App;