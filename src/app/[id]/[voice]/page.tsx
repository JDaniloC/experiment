"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'
import stories from "./stories.json";
import Image from 'next/image';
import Link from 'next/link';

type StoriesType = {
  [key: string]: string[];
};

const typedStories: StoriesType = stories;

export default function Story({
  params
}: Readonly<{
  params: Promise<{ id: string, voice: string }>
}>) {
  const [story, setStory] = useState<string[]>([]);
  const [voice, setVoice] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState<string | null>(null);

  const [storyText, setStoryText] = useState<string | null>(null);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [storyAudio, setStoryAudio] = useState<string | null>(null);
  
  const [audioAllowed, setAudioAllowed] = useState<boolean>(false);
  const [imageAllowed, setImageAllowed] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [page, setPage] = useState<number>(0);
  const searchParams = useSearchParams()

  useEffect(() => {
    async function verifyIdentifier() {
      const { id: identifier, voice } = await params;
      if (!Object.keys(typedStories).includes(identifier)) return;

      setVoice(voice);
      setIdentifier(identifier);
      setStory(typedStories[identifier]);
      setStoryText(typedStories[identifier][page]);
      setStoryImage(`/static/stories/${identifier}/${page}.png`);
      setStoryAudio(`/static/stories/${identifier}/${voice}/${page}.mp3`);
      
      const audioEnabled = searchParams.get('audio');
      setAudioAllowed(audioEnabled === 'true');
      const imageEnabled = searchParams.get('image');
      setImageAllowed(imageEnabled === 'true');
    }
    verifyIdentifier();
  }, [params]);

  useEffect(() => {
    if (story.length > 0) {
      setStoryText(story[page]);
      setStoryImage(`/static/stories/${identifier}/${page}.png`);
      setStoryAudio(`/static/stories/${identifier}/${voice}/${page}.mp3`);
    }
  }, [page, story]);

  useEffect(() => {
    if (storyAudio && audioAllowed) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audioElement = new Audio(storyAudio);
      audioElement.addEventListener("ended", function(){
        setPage(prevPage => Math.min(prevPage + 1, story.length - 1));
      });
      audioRef.current = audioElement;
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }, [storyAudio, audioAllowed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && false) {
        setPage(prevPage => Math.min(prevPage + 1, story.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setPage(prevPage => Math.max(prevPage - 1, 0));
      } else if (event.key === ' ' && audioAllowed) {
        event.preventDefault();
        if (audioRef.current) {
          if (audioRef.current.paused) {
            audioRef.current.play();
          } else {
            audioRef.current.pause();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [story.length]);

  const showImage = imageAllowed && storyImage !== null && storyImage !== "";

  return (
    <div className='min-h-screen p-8 pb-20 gap-16 sm:p-16 font-[family-name:var(--font-geist-sans)]'>
      <header className='flex justify-items-center justify-between w-full'>
        <Link
          href={{ pathname: `/` }}
          className="text-4xl font-semibold">Simple Read
        </Link>
      </header>
      <div className='flex flex-col gap-8 mt-5 max-w-screen-lg m-auto items-center relative'>
        {showImage && (
          <Image
            src={storyImage}
            alt="Page image"
            width={500}
            height={500}
            priority
            className='h-auto max-w-full rounded-lg'
          />
        )}
        <p className="text-justify mb-3 text-lg text-gray-500 md:text-4xl dark:text-gray-400">
          {storyText}
        </p> 
        <div className='flex place-self-end'>
          <button
            className='flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-70'
            onClick={() => setPage(page - 1)}
            disabled={page === 0 || true}
          >
            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
            Anterior
          </button>
          <button
            className='flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            onClick={() => setPage(page + 1)}
            disabled={page === story.length - 1}
          >
            Próximo
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
          </button>
        </div>
      </div>
    </div>
  )
}