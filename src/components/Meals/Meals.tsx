import React from 'react';
import {Meal} from '../../types';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  meal: Meal;
  deleteMeal: React.MouseEventHandler;
  deleteLoading: boolean;
}

const Meals: React.FC<Props> = ({meal, deleteMeal, deleteLoading}) => {
  return (
    <div className='border rounded p-3 mb-3 d-flex justify-content-between align-items-center'>
      <div className='col-7'>
        <p>{meal.meal}</p>
        <p><strong>{meal.description}</strong></p>
      </div>
      <div className='col-2 text-end'>
        <span><strong>{meal.calories} kcal</strong></span>
      </div>
      <div className='col-2 text-center d-flex flex-column'>
        <Link to={`/meals/${meal.id}/edit`} className='btn btn-success mb-3'>Change meal</Link>
        <button type='button' className='btn btn-danger' onClick={deleteMeal} disabled={deleteLoading} >{deleteLoading && <ButtonSpinner />}Delete</button>
      </div>
    </div>
  );
};

export default Meals;