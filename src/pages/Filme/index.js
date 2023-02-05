import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme(){
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("FILME NAO ENCONTRADO")
        navigate("/",{replace:true})
        return
      })
    }

    loadFilme();


    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [navigate,id])

  function salvarFilme(){
    const minhaLista= localStorage.getItem("@primeflix");
    let listaSalva= JSON.parse(minhaLista) || [];

    const hasfilme= listaSalva.some(filmeSalvo=>filmeSalvo.id === filme.id);

    if(hasfilme){
      //alert("Filme já existe na sua lista de favoritos.")
      toast.warning("Filme já existe na sua lista de favoritos!!!");
      return
    }

    listaSalva.push(filme);
    localStorage.setItem("@primeflix",JSON.stringify(listaSalva) );
    //alert("Filme salvo com sucesso!!")
    toast.success("Filme salvo com sucesso!!!");


  }

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  
  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avalição: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>

    </div>
  )
}

export default Filme;