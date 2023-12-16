import {Header} from '../header/header.tsx';
import {Footer} from '../footer/footer.tsx';

export const LoadingMessage = () => (
  <div className="user-page">
    <div>
      <Header/>
    </div>
    <div className="user-page__content" style={{textAlign: 'center'}}>
      <p>Loading...</p>
    </div>
    <div>
      <Footer/>
    </div>
  </div>
);
