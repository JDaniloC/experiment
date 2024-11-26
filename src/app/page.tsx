"use client";

import { useEffect, useState } from 'react';
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
  const [selectedVoice, setSelectedVoice] = useState<string>("will");
  const [voice, setVoice] = useState<string>("");

  function toggleAudio() {
    setAudioEnabled(prev => !prev);
  }

  function toggleImage() {
    setImageEnabled(prev => !prev);
  }

  useEffect(() => {
    if (!audioEnabled && !imageEnabled) {
      setVoice("");
    } else {
      setVoice(selectedVoice);
    }
  }, [audioEnabled, imageEnabled, selectedVoice]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className='flex justify-items-center justify-between m-3 w-full'>
        <h1 className="text-4xl font-semibold">Simple Read</h1>
        <div className="flex gap-4">
          <div className="flex gap-4">
            <input
              type="checkbox"
              name="audio"
              id="audio"
              value=""
              checked={audioEnabled}
              onChange={toggleAudio}
              className="hidden peer"
            />
            <label htmlFor="audio" className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'>Ativar áudio</label>
          </div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              name="image"
              id="image"
              value=""
              checked={imageEnabled}
              onChange={toggleImage}
              className="hidden peer"
            />
            <label htmlFor="image" className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700'>Ativar imagem</label>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="voice">Voz do narrador</label>
            <select
              name="voice"
              id="voice"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="text-black"
            >
              <option value="will">Will</option>
              <option value="rener">Rener</option>
              <option value="ana">Ana</option>
            </select>
          </div>
          <audio
            src={`/static/voices/${selectedVoice}.mp3`}
            controls
          ></audio>
        </div>
      </header>
      <main className="flex flex-wrap gap-8 row-start-2 items-center sm:items-start justify-center">
        {typedStories.map((story) => (
          <Link
            key={story.identifier}
            href={{
              pathname: `/${story.identifier}/${voice}`,
              query: {
                audio: audioEnabled,
                image: imageEnabled
              },
            }}
            className="relative text-primary flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 flex-grow"
          >
            <Image
              src={story.image}
              alt="Story image"
              width={200}
              height={200}
              priority
              className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg'
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="hover:underline mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {story.title}
              </h5>
              <div className='absolute bottom-3 right-1'>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                  {story.classification}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
      </footer> */}
    </div>
  );
}
