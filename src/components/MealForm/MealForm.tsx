import React, {useState} from 'react';
import {ApiMeal, MealMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (meal: ApiMeal) => void;
  isLoading: boolean;
}

const MealForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [mealMutation, setMealMutation] = useState<MealMutation>( {
    meal: '',
    description: '',
    calories: '',
  });

  const changeMeal = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMealMutation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit ({
      ...mealMutation,
      calories: parseFloat(mealMutation.calories)
    });
  };

  return (
    <div className="mt-4 border border-black rounded px-5 py-3">
      <h2>Add a meal</h2>
      <form className="mt-4" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="meal">Meal time</label>
          <select id="meal" className="form-control" name="meal" required onChange={changeMeal} value={mealMutation.meal}>
            <option value="">Select a meal time</option>
            <option value="breakfast">Breakfast</option>
            <option value="snack">Snack</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="description">Meal description</label>
          <input
            id="description" type="text" name="description"
            className="form-control" required onChange={changeMeal} value={mealMutation.description}
          />
        </div>
        <div className="form-group mt-3">
          <input id='calories' type="number" name="calories" required placeholder='Calories' onChange={changeMeal} value={mealMutation.calories} />
          <label htmlFor="calories" className='ms-3'>kcal</label>
        </div>
        <div className='text-end'>
          <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
            {isLoading && <ButtonSpinner />}Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealForm;