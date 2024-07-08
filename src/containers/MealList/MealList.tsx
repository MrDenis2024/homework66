import {Link} from 'react-router-dom';

const MealList = () => {
  return (
    <div>
      <div className='d-flex justify-content-between mt-5'>
        <p>Total calories</p>
        <Link to='/add-meal' className='btn btn-primary'>Add new meal</Link>
      </div>
    </div>
  );
};

export default MealList;