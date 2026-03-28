import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  destroySampleFlipnoteThumbnails,
  ExpandedSampleManifestEntry,
  getSampleFlipnotes,
} from '@/core/samples';

import { SampleMemoGrid } from '@/components/grid/SampleMemoGrid';
import { useGlobalContext } from '@/context/globalContext';

export const Home = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useGlobalContext();
  
  const [manifest, setManifest] = useState<ExpandedSampleManifestEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSampleFlipnotes();
      setManifest(data);
    };
    fetchData();

    return () => {
      destroySampleFlipnoteThumbnails(manifest);
    };
  }, []);

  const handleSelect = useCallback((arg: ExpandedSampleManifestEntry) => {
    navigate(`/view/${arg.hash}`);
  }, []);

  return (
    <main className="layout flex gap-4 max-w-7xl mx-auto">
      <div className="side-area flex flex-col gap-2 w-[340px]">
        <h2 className="text-lg font-semibold">theme: {theme}</h2>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className='main-area flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>Sample Flipnotes</h2>
        <SampleMemoGrid items={manifest} onSelect={handleSelect} />
      </div>
    </main>
  );
};
