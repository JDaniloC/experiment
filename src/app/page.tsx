"use client";

import StoryOptions from './components/story-options';
import { useState } from 'react';

import stories from "./stories.json";
import StoryBanner, { StoryMetadataType } from './components/story-banner';

const typedStories: StoryMetadataType[] = stories
typedStories.sort((a, b) => a.classification > b.classification ? 1 : -1);

export default function Home() {
  const [selectedStory, setSelectedStory] = useState<StoryMetadataType|null>(null);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className='flex justify-items-center m-3 w-full'>
        <h1 className="text-4xl font-semibold">
          <span className="text-[#0994cc]">S</span>imple <span className="text-[#0994cc]">R</span>ead
        </h1>
      </header>

      <main className="flex flex-wrap justify-between gap-1 md:gap-8">
        {typedStories.map((story) => (
          <button
            key={story.identifier}
            onClick={() => setSelectedStory(story)}
            className="relative flex flex-col items-center p-4 hover:bg-gray-100 flex-grow sm:max-w-80"
          >
            <StoryBanner story={story} />
          </button>
        ))}
      </main>

      <StoryOptions
        story={selectedStory}
        onCloseAction={() => setSelectedStory(null)}
      />
    </div>
  );
}
