import { Container } from 'reactstrap';

import Photos from '../Photos/Photos';

import './PhotosCatalog.scss';
import { useSelector } from 'react-redux';
import { getPhotos } from '../../../redux/photosRedux';

const PhotosCatalog = () => {
  const photos = useSelector(getPhotos);

  return (
    <section className="photos-catalog">
      <Container>
        <h2 className="pt-5">Browse photos</h2>
        <Photos data={photos} />
      </Container>
    </section>
  );
}

export default PhotosCatalog ;