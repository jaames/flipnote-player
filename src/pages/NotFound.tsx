import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <main className="mx-auto flex max-w-lg flex-col gap-4 px-6 py-16">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link
        className="text-accent underline-offset-4 hover:underline"
        to="/"
      >
        Back to main page
      </Link>
    </main>
  );
};
