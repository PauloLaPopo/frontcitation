import React from "react";
import {Link} from "react-router-dom";

const AdminPage: React.FC = () => {

    return (
      <div>
          <h1>Admin Page</h1>
          <Link to="/ajouter-citation">
              <button className="nav-button">Ajouter Citation</button>
          </Link>
          <Link to="/list-citations">
              <button className="nav-button">Modifier Citations</button>
          </Link>
      </div>
    );
}

export default AdminPage;