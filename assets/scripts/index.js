// dados pokémon
const nomePokemon = document.querySelector(".nome_pokemon");
const numeroPokemon = document.querySelector(".numero_pokemon");
const imagemPokemon = document.getElementById("imagem_pokemon");
// dados formulário
const formulario = document.querySelector(".formulario");
const campoBusca = document.querySelector(".campo_busca");
// botões
const botaoAnterior = document.querySelector(".botao_anterior");
const botaoProximo = document.querySelector(".botao_proximo");
// variável global: número do pokémon inicial
let pokemonAtual = 1;
// função que busca o s dados do pokémon na API
async function buscarPokemon(pokemon) {
  // para buscar os dados precisamos encontrar o "arquivo" onde eles estão
  const respostaAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  // se o pokémon for encontrado, os dados dele são armazenados em arquivo JSON (javascript object)
  if (respostaAPI.status === 200) {
    const dados = await respostaAPI.json();
    return dados;
  }
}
// função para renderizar os dados do pokémon na tela
async function exibirPokemon(pokemon) {
  // muda os textos dos dados do pokémon enquanto aguarda a resposta
  nomePokemon.innerHTML = "Carregando...";
  numeroPokemon.innerHTML = "";
  // busca os dados
  const dados = await buscarPokemon(pokemon);
  if (dados) {
    imagemPokemon.style.display = "block";
    nomePokemon.innerHTML = dados.name;
    numeroPokemon.innerHTML = dados.id;
    imagemPokemon.src =
      dados.sprites.version["generation-v"][
        "black-white"
      ].animated.front_default;
    campoBusca.value = "";
    pokemonAtual = dados.id;
  } else {
    imagemPokemon.style.display = "none";
    nomePokemon.innerHTML = "Não encontrado";
    numeroPokemon.innerHTML = "";
  }
}
// evento de envio do formulário
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // previne a página recarregar
  exibirPokemon(campoBusca.value.toLowerCase());
});
// evento para mostrar o anterior
botaoAnterior.addEventListener("click", function () {
  if (pokemonAtual > 1) {
    pokemonAtual -= 1;
    exibirPokemon(pokemonAtual);
  }
});
// evento para mostrar o próximo
botaoProximo.addEventListener("click", function () {
  pokemonAtual += 1;
  exibirPokemon(pokemonAtual);
});
exibirPokemon(pokemonAtual);