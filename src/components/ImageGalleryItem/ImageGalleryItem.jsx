import { Item, Img } from './ImageGalleryItem.styled';
import { useState } from 'react';
import { ModalComponent } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = e => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Item onClick={openModal}>
        <Img src={item.webformatURL} alt={item.tags} />
      </Item>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        item={item}
      />
    </>
  );
};
