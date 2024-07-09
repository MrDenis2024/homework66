import {Link} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {ApiMeals, Meal} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';
import Meals from '../../components/Meals/Meals';
import {toast} from 'react-toastify';

const MealList = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchMeals = useCallback( async () => {
    try {
      setLoading(true);
      const {data: meals} = await axiosApi.get<ApiMeals | null>('/meals.json');

      if(!meals) {
        setMeals([]);
      } else {
        const newMeals = Object.keys(meals).map((id) => ({
          ...meals[id],
          id,
        }));

        setMeals(newMeals);
      }
    } catch (e) {
      console.error('Ошибка получение данных с сервера');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  const deleteMeal = async (id: string) => {
    try {
      if(window.confirm('Are you sure you want to delete this meal?')) {
        setDeleteLoading(true);
        await axiosApi.delete(`/meals/${id}.json`);
        toast.success('Приём пищи удалён');
        void fetchMeals();
      }
    } catch (e) {
      console.error('Ошибка удаления');
    } finally {
      setDeleteLoading(false);
    }
  };

  let meal = (
    <>
      {meals.length > 0 ? (
        <>
          {meals.map((meal) => (
            <Meals key={meal.id} meal={meal} deleteMeal={() => deleteMeal(meal.id)} deleteLoading={deleteLoading} />
          ))}
        </>
      ) : (
        <p className='text-center'><strong>Add what you ate</strong></p>
      )}
    </>
  );

  if(loading) {
    meal = (
      <div className="d-flex justify-content-center align-items-center" style={{height: '300px'}}>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="d-flex justify-content-between my-5">
        <p>Total calories: <strong>{meals.reduce((sum, meal) =>{
          return sum + meal.calories;
        }, 0)} kcal</strong></p>
        <Link to='/meals/new' className='btn btn-primary'>Add new meal</Link>
      </div>
      {meal}
    </div>
  );
};

export default MealList;