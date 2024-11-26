"use client";

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

import stories from "./stories.json";

type StoryMetadataType = {
  identifier: string;
  title: string;
  image: string;
  classification: string;
}

const typedStories: StoryMetadataType[] = stories;

export default function Home() {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [imageEnabled, setImageEnabled] = useState<boolean>(false);

  function toggleAudio() {
    console.log('toggleAudio', audioEnabled);
    setAudioEnabled(prev => !prev);
  }

  function toggleImage() {
    setImageEnabled(prev => !prev);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {typedStories.map((story) => (
          <Link
            key={story.identifier}
            href={{
              pathname: `/${story.identifier}`,
              query: { audio: audioEnabled, image: imageEnabled },
            }}
            className="text-primary hover:underline"
          >
            <Image
              src={story.image}
              alt="Story image"
              width={200}
              height={200}
              priority
            />
            {story.title}
            <span>
              {story.classification}
            </span>
          </Link>
        ))}

        <div className="flex gap-4">
          <label htmlFor="audio">Ativar áudio</label>
          <input
            type="checkbox"
            name="audio"
            id="audio"
            value={audioEnabled}
            onChange={toggleAudio}
            className="hidden"
          />
          {audioEnabled}
        </div>
        <div className="flex gap-4">
          <label htmlFor="image">Ativar imagem</label>
          <input
            type="checkbox"
            name="image"
            id="image"
            value={imageEnabled}
            onChange={toggleImage}
            className="hidden"
          />
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Termos
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Saiba mais
        </a>
      </footer>
    </div>
  );
}
