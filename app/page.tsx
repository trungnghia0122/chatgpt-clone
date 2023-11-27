import { SunIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from '@heroicons/react/20/solid';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <div>

      <div className='flex flex-col justify-center items-center h-screen text-white px-2'>

        <h1 className='text-5xl text-white font-bold mb-20'>ChatGPT</h1>

        <div className='flex space-x-2 text-center'>

          <div className=''>
            <div className='flex flex-col mb-5 items-center'>
              <SunIcon className='h-8 w-8' />
              <h2>Examples</h2>
            </div>
            <div className='space-y-2 text-sm'>
              <p className='infoText'>&quot;Expain Something to me&quot;</p>
              <p className='infoText'>&quot;What is the difference between a dog and a cat?&quot;</p>
              <p className='infoText'>&quot;What is the color of the sun?&quot;</p>
            </div>
          </div>

          <div className=''>
            <div className='flex flex-col mb-5 items-center'>
              <BoltIcon className='h-8 w-8' />
              <h2>Capabilities</h2>
            </div>
            <div className='space-y-2 text-sm'>
              <p className='infoText'>Change the ChatGPT Model to use</p>
              <p className='infoText'>Messages are stored in Firebase&apos;s Firestore</p>
              <p className='infoText'>Hot toast notifications when ChatGPT is thinking!</p>
            </div>
          </div>

          <div className=''>
            <div className='flex flex-col mb-5 items-center'>
              <ExclamationTriangleIcon className='h-8 w-8' />
              <h2>Limitations</h2>
            </div>
            <div className='space-y-2 text-sm'>
              <p className='infoText'>May occasionally generate incorrect information</p>
              <p className='infoText'>May occasionally produce harmful instructions or biased content</p>
              <p className='infoText'>Limited knowledge of world and events after 2021</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
