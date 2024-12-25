'use client'

import {
  Label,
  Dialog,
  Listbox,
  DialogPanel,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  DialogBackdrop,
} from '@headlessui/react'
import { useState, useEffect } from 'react'
import StoryBanner, { StoryMetadataType } from './story-banner'
import Link from "next/link";

export default function StoryOptions({
  story, onCloseAction
}: Readonly<{
  story: StoryMetadataType|null,
  onCloseAction: () => void
}>) {
  const [open, setOpen] = useState(false);
  const [voice, setVoice] = useState<string>("");
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [imageEnabled, setImageEnabled] = useState<boolean>(false);
  // const [fullTextEnabled, setFullTextEnabled] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<string>("will");

  useEffect(() => {
    if (story) {
      setOpen(true);
    }
  }, [story]);

  useEffect(() => {
    if (!audioEnabled && !imageEnabled) {
      setVoice("");
    } else {
      setVoice(selectedVoice);
    }
  }, [audioEnabled, imageEnabled, selectedVoice]);

  function resetStoryIdentifier(value: boolean) {
    setOpen(value);
    onCloseAction();
  }

  const toggleAudio = () => setAudioEnabled(prev => !prev);
  const toggleImage = () => setImageEnabled(prev => !prev);
  // const toggleFullText = () => setFullTextEnabled(prev => !prev);

  if (!story) {
    return null;
  }

  return (
    <Dialog open={open} onClose={resetStoryIdentifier} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 flex flex-col items-center"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <StoryBanner story={story} isCentered={true} />
                  <div className="flex gap-2 mt-2">
                    <div className="flex-grow">
                      <input
                        type="checkbox"
                        name="audio"
                        id="audio"
                        value=""
                        checked={audioEnabled}
                        onChange={toggleAudio}
                        className="hidden peer"
                      />
                      <label htmlFor="audio" className='inline-flex text-center justify-between w-full p-4 text-gray-500 bg-white border-2 border-gray-200 rounded-md cursor-pointer  peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-blue-600 hover:bg-gray-50'>Ativar áudio</label>
                    </div>
                    <div className="flex-grow">
                      <input
                        type="checkbox"
                        name="image"
                        id="image"
                        value=""
                        checked={imageEnabled}
                        onChange={toggleImage}
                        className="hidden peer"
                      />
                      <label htmlFor="image" className='inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border-2 border-gray-200 rounded-md cursor-pointer  peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-blue-600 hover:bg-gray-50'>Ativar imagem</label>
                    </div>
                    {/* <div className="flex-grow">
                      <input
                        type="checkbox"
                        name="text"
                        id="text"
                        value=""
                        checked={fullTextEnabled}
                        onChange={toggleFullText}
                        className="hidden peer"
                      />
                      <label htmlFor="text" className='inline-flex items-center justify-between w-full p-4 text-gray-500 bg-white border-2 border-gray-200 rounded-md cursor-pointer  peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-blue-600 hover:bg-gray-50'>Texto completo</label>
                    </div> */}
                  </div>
                  
                  {audioEnabled &&
                  <div className="flex justify-between my-6 items-end">
                    <div className="relative max-w-40">
                      <Listbox value={selectedVoice} onChange={setSelectedVoice}>
                        <Label className="block text-sm/6 font-medium text-gray-900">
                          Voz do narrador
                        </Label>
                        <ListboxButton className="w-full cursor-default py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6">
                          {selectedVoice}
                        </ListboxButton>
                        <ListboxOptions
                          transition
                          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                        >
                          <ListboxOption
                            value="will"
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none"
                          >
                            Will
                          </ListboxOption>
                          <ListboxOption
                            value="rener"
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none"
                          >
                            Rener
                          </ListboxOption>  
                          <ListboxOption
                            value="ana"
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white data-[focus]:outline-none"
                          >
                            Ana
                          </ListboxOption>  
                        </ListboxOptions>
                      </Listbox>
                    </div>
                    <audio
                      src={`/static/voices/${selectedVoice}.mp3`}
                      controls
                    ></audio>
                  </div>}
                </div>
              </div>
            </div>
            <div className="flex max-w-80 mb-8 justify-center">
              <button
                className="text-center rounded-md bg-red-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={() => resetStoryIdentifier(false)}
              >
                Voltar
              </button>
              <Link
                href={{
                  pathname: `/${story.identifier}/${voice}`,
                  query: {
                    audio: audioEnabled,
                    image: imageEnabled
                  },
                }}
                className="text-center px-4 py-3 rounded-md bg-blue-600 font-bold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              >
                Abrir história
              </Link>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}