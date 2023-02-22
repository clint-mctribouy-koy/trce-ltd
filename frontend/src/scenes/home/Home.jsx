import ShoppingList from "./ShoppingList";
import MainCarousel from "./MainCarousel";

function Home({ history }) {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
    </div>
  );
}

export default Home;
