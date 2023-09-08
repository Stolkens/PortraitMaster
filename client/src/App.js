import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import routes
import Home from './components/pages/Home/HomePage';
import NotFound from './components/pages/NotFound/NotFoundPage';
import Submit from './components/pages/Submit/SubmitPage';
import Photo from './components/pages/Photo/PhotoPage';
import TermsOfUse from './components/pages/TermsOfUse/TermsOfUsePage';
import PrivacyPolicy from './components/pages/PrivacyPolicy/PrivacyPolicyPage';
import { loadPhotosRequest } from './redux/photosRedux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPhotosRequest())
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo/:id" element={<Photo />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/submit" element={<Submit />} />
        <Route element={<NotFound />} />
      </Routes>
    </MainLayout>
  );

}

export default App;
