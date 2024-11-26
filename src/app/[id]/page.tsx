import stories from "./stories.json";
import Link from 'next/link';

type StoriesType = {
  [key: string]: string;
};

const typedStories: StoriesType = stories;

export default async function Story({
  params
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const identifier = (await params).id;
  const storyText = typedStories[identifier];
  const storyLines = storyText.split('\n');

  return (
    <div className='min-h-screen p-8 pb-20 gap-16 sm:p-16 font-[family-name:var(--font-geist-sans)]'>
      <header className='flex justify-items-center justify-between w-full'>
        <Link
          href={{ pathname: `/` }}
          className="text-4xl font-semibold">Simple Read
        </Link>
      </header>
      <div className='flex flex-col gap-8 mt-5 max-w-screen-lg m-auto items-center relative'>
        {storyLines.map((line, index) => (
          <p key={index} className="text-justify mb-3 text-lg text-gray-500 md:text-4xl dark:text-gray-400 indent-8">
            {line}
          </p> 
        ))}
      </div>
    </div>
  )
}