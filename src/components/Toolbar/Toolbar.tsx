import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid container">
        <NavLink to='/' className='navbar-brand'>Calorie tracker</NavLink>
      </div>
    </nav>
  );
};

export default Toolbar;