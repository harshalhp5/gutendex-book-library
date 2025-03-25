import Navbar from "./components/Navbar";

function App({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

export default App;
