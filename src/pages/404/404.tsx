import './404.css';
import {Link} from 'react-router-dom';
export const Page404 = () => (
  <div className="container404">
    <div className="copy-container404 center-xy">
      <p className="text404">
            404, page not found.
      </p>
      <br/>
      <Link className="link404" to={'/'}>
        Go back
      </Link>
    </div>
  </div>
);
