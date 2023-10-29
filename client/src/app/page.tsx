import { MyTable } from '@/components/Table';
import '@/styles/app.css';
import { Container } from 'react-bootstrap';

export default function Home() {
  return (
    <Container>
      <MyTable />
    </Container>
  );
}
