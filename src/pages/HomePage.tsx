import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import {
  destroySampleFlipnoteThumbnails,
  ExpandedSampleManifestEntry,
  getSampleFlipnotes,
} from '@/core/samples';

import { SampleMemoGrid } from '@/components/grid/SampleMemoGrid';

export function HomePage() {
  const [manifest, setManifest] = useState<ExpandedSampleManifestEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSampleFlipnotes();
      console.log(data);
      setManifest(data);
    };
    fetchData();

    return () => {
      destroySampleFlipnoteThumbnails(manifest);
    };
  }, []);

  return (
    <main className="layout flex gap-4 max-w-7xl mx-auto">
      <div className="side-area flex flex-col gap-2 w-[340px]">
        <h2 className="text-lg font-semibold">Sample Flipnotes</h2>
      </div>
      <div className='main-area flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Sample Flipnotes</h2>
        <SampleMemoGrid items={manifest} onSelect={(arg) => { console.log(arg); }} />
      </div>
    </main>
  );
}
