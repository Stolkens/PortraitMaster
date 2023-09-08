import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { getTrendingPhotos } from '../../../redux/photosRedux';
import Photos from '../Photos/Photos';

import './TrendingPhotos.scss';

const TrendingPhotos = () => {
  const photos = useSelector(getTrendingPhotos);

  return (
    <section className="trending-box">
      <Container>
        <h2 className="pt-5">Trending photos</h2>
        <Photos data={photos} />
      </Container>
    </section>
  );
}

export default TrendingPhotos;