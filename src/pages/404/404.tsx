import './404.css';
import {Link} from 'react-router-dom';
export const Page404 = () => (
  <div className="container">
    <div className="copy-container center-xy">
      <p>
            404, page not found.
      </p>
      <br/>
      <Link to={'/'}>
        Go back
      </Link>
    </div>
  </div>
);
