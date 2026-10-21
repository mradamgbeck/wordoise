import Link from 'next/link';
import NavLinks from './navlinks';

export default function SideNav() {
  return (
      <div className="text-center justify-center px-5 py-6 bg-black">
        <h1 className="text-green-500 text-4xl font-bold">🍄Wordoise🐢</h1>
        <NavLinks/>
      </div>
  );
}
