import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className='mx-auto flex max-w-lg flex-col gap-4 px-6 py-16'>
      <h1 className='text-2xl font-semibold'>Page not found</h1>
      <p className='text-[var(--color-muted)]'>
        This route is handled by the React app. With{' '}
        <code className='rounded bg-black/5 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10'>
          not_found_handling: &quot;single-page-application&quot;
        </code>{' '}
        in Wrangler, deep links still load the SPA on Cloudflare Workers.
      </p>
      <Link
        className='text-[var(--color-accent)] underline-offset-4 hover:underline'
        to='/'
      >
        Back home
      </Link>
    </main>
  );
}
