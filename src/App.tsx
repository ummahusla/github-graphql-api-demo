import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';

import Repos from './views/main/Repos';

export default function App() {
  return (
    <>
      <Navbar />

      <Container>
        <Repos />
      </Container>
    </>
  );
}
