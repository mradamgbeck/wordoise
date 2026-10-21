'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Home', href: '/' },
    { name: 'Wordoise', href: '/wordoise' },
    { name: 'Searchoise', href: '/searchoise' },
    { name: 'Crossoise', href: '/crossoise' }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link key={link.name} href={link.href}
                        className={clsx(
                            'flex h-[30px] items-center justify-center rounded-xl bg-green-950 text-green-500 text-lg font-bold hover:bg-green-800 hover:text-green-300 p-5',
                            {
                                'bg-green-400 text-green-950': pathname === link.href,
                            },
                        )}
                    >
                        <p>{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
