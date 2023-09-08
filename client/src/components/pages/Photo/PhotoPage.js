import { Container } from 'reactstrap';
import { useParams  } from 'react-router-dom';

import PhotoPreview from '../../features/PhotoPreview/PhotoPreview';

const SubmitPage = () => {
  const { id } = useParams();

  return (
    <Container>
      <PhotoPreview id={id} />
    </Container>
  );
}

export default SubmitPage;
