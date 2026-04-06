import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'

export interface Member {
  name: string
  sig: string | null
  post: string | null
  image: string | StaticImport
  linkedin: string
}


const MemberCard = ({ name, sig, post, image, linkedin }: Member) => {
  return (
    <div className='p-2 rounded-xl h-[400px] w-[320px] border border-gray-800 flex flex-col items-center backdrop-blur-xs relative'>

      {/* Fixed size image container */}
      <div className="w-[280px] h-[280px] relative shrink-0">
        <div className="w-full h-full overflow-hidden rounded-full">
          <Image
            src={image || "/trasparento.jpg"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* LinkedIn icon - positioned at bottom right of profile image, outside the rounded container */}
        <a
          href={linkedin || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-0 right-0 z-10 bg-gray-900/90 backdrop-blur-sm rounded-full p-2.5 text-blue-400 hover:text-blue-500 hover:bg-gray-800/90 transition-all shadow-lg cursor-pointer border border-gray-700 translate-x-1/4 translate-y-1/4"
          onClick={(e) => {
            if (!linkedin || linkedin.trim() === '') {
              e.preventDefault();
            }
          }}
        >
          <FaLinkedin size={30} />
        </a>
      </div>

      {/* Content section */}
      <div className='rounded-b-md w-[240px] flex-1 px-2 py-1 flex flex-col justify-between mt-3'>
        <p className='text-base text-center font-bold'>
          {name || 'Exo Planet'}
        </p>

        <div className='flex justify-center mt-1 '>
          <p className='text-xs text-gray-400 font-semibold'>
            {post || 'Team'}
          </p>
        </div>
      </div>

    </div>
  )
}


export default MemberCard
