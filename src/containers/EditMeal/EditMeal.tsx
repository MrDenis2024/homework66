import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {ApiMeal} from '../../types';
import axiosApi from '../../axiosApi';
import MealForm from '../../components/MealForm/MealForm';
import {toast} from 'react-toastify';

const EditMeal = () => {
  const {id} = useParams();
  const [meal , setMeal] = useState<ApiMeal | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const fetchOneMeal = useCallback( async () => {
    try {
      const {data: meal} = await axiosApi.get(`/meals/${id}.json`);
      if(meal !== null) {
        setMeal(meal);
      } else {
        navigate('/');
      }
    } catch (e) {
      console.error('Ошибка получения информации о питании');
    }
  }, [id, navigate]);

  useEffect(() => {
    void fetchOneMeal();
  }, [fetchOneMeal]);

  const updateMeal = async (meal: ApiMeal) => {
    try {
      setIsUpdate(true);
      await axiosApi.put(`/meals/${id}.json`, meal);
      toast.success('Прием пищи изменён!');
    } catch (e) {
      console.error('Ошибка отправки изменений приема пищи');
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <div>
      {meal && (
        <MealForm onSubmit={updateMeal} isLoading={isUpdate} existingMeal={meal}/>
      )}
    </div>
  );
};

export default EditMeal;