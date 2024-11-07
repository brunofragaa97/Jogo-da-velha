import Board from "./Board";

const Square = ({ value, onClick}) => {
  
  return (
    
    <button className="h-24 w-24 text-4x1 sm:h-44 sm:w-44 mt-1 bg-pink-600 text-8xl"
        onClick={onClick}>
    {value}
    </button>

  )
}

export default Square;
