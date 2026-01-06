import { initialPosition } from "game/position";
import { ChessBoard } from "../components/chess-board";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ChessBoard position={initialPosition} />
    </div>
  );
};

export default Home;
