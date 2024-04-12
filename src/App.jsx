import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [veiculos, setVeiculos] = useState([]);
  const [novoVeiculo, setNovoVeiculo] = useState({
  isbn: '',
  autor: '',
  titulo: '',
  editora: '',
  genero: '',
});
 
  useEffect(() => {
  fetchVeiculos();
  }, []);

  //GET
  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:8090/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  //Atualização do valor dos INPUTS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoVeiculo((prevVeiculo) => ({
      ...prevVeiculo,
      [name]: value,
    }));
  };

  //POST 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/veiculos', novoVeiculo);
      fetchVeiculos();
      setNovoVeiculo({
        isbn: '',
        autor: '',
        titulo: '',
        editora: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };
  
  //DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/veiculos/${id}`);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  //PUT
  const handleUpdate = async (id, veiculoAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/veiculos/${id}`, veiculoAtualizado);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };
  
  //RENDERIZAÇÃO
  return (
    <div>
      {/* Cabeçalho */}
      <h1>Gerenciamento de Livros</h1>
  
      {/* Formulário de adição de livro */}
      <form onSubmit={handleSubmit}>
        {/* Campo para a isbn */}
        <input
          type="text"
          name="isbn"
          placeholder="ISBN "
          value={novoVeiculo.isbn}
          onChange={handleInputChange}
        />
        {/* Campo para a autor */}
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={novoVeiculo.autor}
          onChange={handleInputChange}
        />
        {/* Campo para o titulo */}
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={novoVeiculo.titulo}
          onChange={handleInputChange}
        />
        {/* Campo para o editora */}
        <input
          type="text"
          name="editora"
          placeholder="Editora"
          value={novoVeiculo.editora}
          onChange={handleInputChange}
        />
        {/* Campo para o genero */}
        <input
          type="text"
          name="genero"
          placeholder="Gênero"
          value={novoVeiculo.genero}
          onChange={handleInputChange}
        />
        {/* Botão de envio do formulário */}
        <button type="submit">Adicionar Livro</button>
      </form>
  
      {/* Lista de livros */}
      <ul>
        {/* Mapeamento dos Livro */}
        {veiculos.map((veiculo) => (
          <li key={veiculo.id}>
            {/* Exibição dos detalhes do veículo */}
            {veiculo.isbn} - {veiculo.autor} {veiculo.titulo} {veiculo.editora} {veiculo.genero}
            
            {/* Botão de exclusão */}
            <button onClick={() => handleDelete(veiculo.id)}>Excluir</button>
            
            {/* Botão de atualização */}
            <button

              onClick={() =>
                handleUpdate(veiculo.id, {
                  ...veiculo,
                  isbn: novoVeiculo.isbn !== "" ? novoVeiculo.isbn : veiculo.isbn,
                  autor: novoVeiculo.autor !== "" ? novoVeiculo.autor : veiculo.autor,
                  titulo: novoVeiculo.titulo !== "" ? novoVeiculo.titulo : veiculo.titulo,
                  editora: novoVeiculo.editora !== "" ? novoVeiculo.editora : veiculo.editora,
                  genero: novoVeiculo.genero !== "" ? novoVeiculo.genero : veiculo.genero,
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;