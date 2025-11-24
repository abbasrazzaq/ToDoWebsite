'use client'

import Link from 'next/link';

type Props = {
    currentPage: number;
    totalPages: number;
};

export default function Pagination({currentPage, totalPages}: Props) {
    return (
        <nav style={{ marginTop: '2rem', textAlign: 'center' }}>
            {currentPage > 1 && (
                <Link href={`/todos?page=${currentPage - 1}`}>
                    <button>Prev</button>
                </Link>
            )}
            <span>Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
                <Link href={`/todos?page=${currentPage + 1}`}>
                    <button>Next</button>
                </Link>
            )}
        </nav>
    );
}