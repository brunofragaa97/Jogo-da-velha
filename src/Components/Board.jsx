import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [quadrado, setQuadrado] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [proximoJogador, setProximoJogador] = useState(true);

  const handleClick = (index) => {
    const novoQuadrado = [...quadrado];
    if (novoQuadrado[index] || calcularVencedor(novoQuadrado)) return;
    novoQuadrado[index] = proximoJogador ? "X" : "O";
    setQuadrado(novoQuadrado);
    setProximoJogador(!proximoJogador);
  };

  const calcularVencedor = (quadrado) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        quadrado[a] &&
        quadrado[a] === quadrado[b] &&
        quadrado[a] === quadrado[c]
      ) {
        return quadrado[a];
      }
    }
    return null;
  };

  function recomecarPartida(vencedor) {}

  const vencedor = calcularVencedor(quadrado);

  const renderizarQuadrado = (i) => {
    return <Square value={quadrado[i]} onClick={() => handleClick(i)} />;
  };

  function zerarPartida() {
    return setQuadrado([null, null, null, null, null, null, null, null, null]);
  }

  const iniciarNovaPartida = () => {
    if (vencedor === "X" || vencedor === "O") {
      return (
        <div className="sm:mt-80 ml-5 text-3xl">
          <button
            className="bg-red-600 rounded-md p-4 text-yellow-400"
            onClick={zerarPartida}
          >
            Jogar Novamente
          </button>
        </div>
      );
    }
  };

  return (
    <div className="sm:flex h-screen bg-black">
      {/* Barra lateral (aside) */}
      <aside className="hidden sm:flex bg-slate-800 h-full w-80 sm:static">
        <div className="text-4xl fixed mt-10 text-white">
          <span>Próximo jogador: {proximoJogador ? "X" : "O"}</span>
        </div>
        <div className="mt-40 fixed text-4xl text-white">
          <span>Vencedor: {vencedor}</span>
        </div>
        <div>{iniciarNovaPartida()}</div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:">
        <div className="grid grid-cols-3 gap-3 text-9xl">
          {[...Array(9)].map((_, index) => (
            <div key={index}>{renderizarQuadrado(index)}</div>
          ))}
        </div>
        <div className="sm:hidden">
          <div className="text-white mt-8">
            Proximo Jogador: {proximoJogador ? "X" : "O"}
          </div>
          <div className="text-white mt-8">Vencedor: {vencedor}</div>
          <div className="mt-8">{iniciarNovaPartida()}</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
