import { Routes, Route } from 'react-router-dom';
import Private from './Private';
import Login from '../pages/Login';

import Home from '../pages/Home';
import Biblioteca from '../pages/Biblioteca';
// import Disciplinas from '../pages/Disciplinas';
import Perfil from '../pages/Perfil';

import LivrosSalvos from '../pages/LivrosSalvos';
// import DisciplinaInfo from '../pages/DisciplinaInfo';
import Livro from '../pages/Livro';
import AddLivro from '../pages/AddLivro';
import Postados from '../pages/Postados';
import Editar from "../pages/Editar";
import Lixeira from "../pages/Lixeira";

import Erro from '../pages/Erro';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route 
        path="/home" 
        element={ 
          <Private> 
            <Home /> 
          </Private> 
        } 
      />

      <Route 
        path="/biblioteca" 
        element={ 
          <Private> 
            <Biblioteca /> 
          </Private> 
        } 
      />

      <Route 
        path="/livro/:id" 
        element={ 
          <Private> 
            <Livro /> 
          </Private> 
        } 
      />

      <Route 
        path="/addlivro" 
        element={
          <Private>
            <AddLivro />
          </Private>
        }
      />

      <Route
        path="/postados"
        element={
          <Private>
            <Postados />
          </Private>
        }
      />

      <Route 
        path="/editar/:id" 
        element={ 
          <Private> 
            <Editar /> 
          </Private> 
        } 
      />

        <Route
        path="/lixeira"
        element={
          <Private>
            <Lixeira />
          </Private>
        }
      />

      {/* <Route path="/disciplinas" element={ <Private> <Disciplinas /> </Private> } /> */}
      <Route 
        path="/perfil" 
        element={ 
          <Private> 
            <Perfil /> 
          </Private> 
        }
      />

      <Route 
        path="/salvos" 
        element={ 
          <Private> 
            <LivrosSalvos /> 
          </Private> 
        } 
      />

      {/* <Route path="/disciplinaInfo/:subjectId" element={ <Private> <DisciplinaInfo /> </Private> } /> */}
      {/* <Route path="/procurar/:searchId" element={ <Private> <Procurar /> </Private> } /> */}


      <Route 
        path="*" 
        element={
          <Private>
            <Erro />
          </Private>
        } 
      />

    </Routes>
  );
}