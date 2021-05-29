import DrawerRoot from "../features/drawer/DrawerRoot";
import ModalRoot from "../features/modal/ModalRoot";
import Routes from "./routes";

function App() {
  return (
    <>
      <Routes />
      <DrawerRoot />
      <ModalRoot />
    </>
  );
}

export default App;
