import { redirect } from 'react-router';

export async function loader() {
  return redirect('/products');
}

export default function Home() {
  return null;
}
