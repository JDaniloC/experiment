"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation'
import stories from "./stories.json";
import Image from 'next/image';

type StoryPageType = {
  text: string;
  image: string;
  audio: string;
}

type StoriesType = {
  [key: string]: StoryPageType[];
};

const typedStories: StoriesType = stories;

export default function Story({
  params
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const [story, setStory] = useState<StoryPageType[]>([]);
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
      const identifier = (await params).id;
      if (!Object.keys(typedStories).includes(identifier)) return;

      const story = typedStories[identifier];
      setStory(story);
      setStoryText(story[page].text);
      setStoryImage(story[page].image);
      setStoryAudio(story[page].audio);
      
      const audioEnabled = searchParams.get('audio');
      setAudioAllowed(audioEnabled === 'true');
      const imageEnabled = searchParams.get('image');
      setImageAllowed(imageEnabled === 'true');
    }
    verifyIdentifier();
  }, [params]);

  useEffect(() => {
    if (story.length > 0) {
      setStoryText(story[page].text);
      setStoryImage(story[page].image);
      setStoryAudio(story[page].audio);
    }
  }, [page, story]);

  useEffect(() => {
    if (storyAudio && audioAllowed) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audioElement = new Audio(storyAudio);
      audioRef.current = audioElement;
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }, [storyAudio, audioAllowed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
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
    <div>
      {showImage && (
        <Image
          src={storyImage}
          alt="Page image"
          width={500}
          height={500}
          priority
        />
      )}
      <p>
        {storyText}
      </p> 

      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === story.length - 1}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}