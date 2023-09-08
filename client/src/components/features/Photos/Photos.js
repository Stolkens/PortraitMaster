import { PropTypes } from 'prop-types';
import { Row, Col, Spinner } from 'reactstrap';
import { getRequest, votePhotoRequest, LOAD_PHOTOS  } from '../../../redux/photosRedux';
import { useSelector, useDispatch } from 'react-redux';

import Photo from '../Photo/Photo';

const Photos = ({ data }) => {
  const dispatch = useDispatch();
  const request = useSelector(state => getRequest(state, LOAD_PHOTOS));

  const votePhoto = id => dispatch(votePhotoRequest(id));
  
  if(!request || !request.success) return <Spinner color="primary" className="standard-box d-block me-auto ms-auto" /> 
  else return (
    <section className="">
      <Row>
        {data.map(photo => <Col key={photo._id} xs="12" md="6" lg="3"><Photo {...photo} votePhoto={votePhoto} /></Col> )}
      </Row>
    </section>
  );

};

Photos.propTypes = {
  data: PropTypes.array,
}

export default Photos;