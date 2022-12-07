import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';

import Repositories from './views/main/Repositories/Repositories';

export default function App() {
  return (
    <>
      <Navbar />

      <Container>
        <Repositories />
      </Container>
    </>
  );
}
