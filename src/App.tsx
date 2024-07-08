import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import MealList from './containers/MealList/MealList';
import NewMeal from './containers/NewMeal/NewMeal';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<MealList />} />
        <Route path='/meals/new' element={<NewMeal />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>}/>
      </Routes>
    </Layout>
  );
};

export default App;
