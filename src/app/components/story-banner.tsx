import Image from 'next/image';

export type StoryMetadataType = {
  identifier: string;
  title: string;
  image: string;
  classification: string;
}

export default function StoryBanner({
  story, isCentered = false
}: Readonly<{
  story: StoryMetadataType,
  isCentered?: boolean
}>) {
  return (
    <div className={`flex flex-col leading-normal mt-2 text-left`
                    + (isCentered ? ` items-center` : '')}>
      <Image
        src={story.image}
        alt="Story image"
        height={300}
        width={300}
        priority
        className='object-cover rounded mb-2 w-full sm:w-72 sm:h-72'
      />
      <h5 className="font-semibold tracking-tight text-gray-900 text-wrap">
        {story.title}
      </h5>
      <span className="text-gray-600 text-sm font-medium">
        {story.classification}
      </span>
    </div> 
  )
}
