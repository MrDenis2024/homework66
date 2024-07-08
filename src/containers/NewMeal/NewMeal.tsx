import MealForm from '../../components/MealForm/MealForm';
import {ApiMeal} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

const NewMeal = () => {
  const navigate = useNavigate();
  const [creating , setCreating] = useState(false);

  const createMeal = async (meal : ApiMeal) => {
    try {
      setCreating(true);
      await axiosApi.post('/meals.json', meal);
      navigate('/');
    } catch (error) {
      console.log('Ошибка отправки данных о приёме пищи');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <MealForm onSubmit={createMeal} isLoading={creating} />
    </div>
  );
};

export default NewMeal;