import React, { useEffect, useState } from 'react';
import { findImages } from '../assets/api/pixabay';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { AppStyled } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';

export const App = props => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (query === '') {
        return;
      }

      try {
        setLoader(true);
        setError(false);
        let imagesData = await findImages(query, page);

        if (imagesData.hits.length === 0) {
          return alert('Not found');
        }

        setImages([...images, ...imagesData.hits]);
        setHasMore(page < Math.ceil(imagesData.totalHits / 12));
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleSubmit} />
      {images.length !== 0 && <ImageGallery list={images} />}
      {loader && <Loader />}
      {hasMore && <Button loadMore={handleLoadMore} />}
    </AppStyled>
  );
};
