import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';


function Favoritos(){
  const [filmes, setFilmes] = useState([])

  useEffect(()=>{

    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || [])

  }, [])

  function excluirFilme(e){
    let filmesSalvos=filmes
    filmesSalvos=filmesSalvos.filter(filme=> filme.id!==parseInt(e.target.value) );
    localStorage.setItem("@primeflix",JSON.stringify(filmesSalvos))
    setFilmes(filmesSalvos)
    toast.success("Filme removido com sucesso!!")
  }

  return(
    <div className="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes.length===0 && <span>Você não possui nenhum filme na lista!!!</span>}

      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title}</span>

              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button value={item.id} onClick={excluirFilme}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;