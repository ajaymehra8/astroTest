'use client'

import Image from 'next/image'

const images = [
  'https://cdn.astrovachan.com/website/pro-ban-1.jpg',
  'https://cdn.astrovachan.com/website/pro-ban-2.jpg',
  'https://cdn.astrovachan.com/website/pro-ban-3.jpg',
  'https://cdn.astrovachan.com/website/pro-ban-4.jpg',
  'https://cdn.astrovachan.com/website/pro-ban-5.jpg',
  'https://cdn.astrovachan.com/website/pro-ban-6.jpg',
  'https://cdn.astrovachan.com/website/pro-ban-7.jpg',
  'https://cdn.astrovachan.com/website/pro-ban-8.jpg',
]

export default function ImageCarousel() {
  return (
    <div className="lg:hidden w-full max-w-xs mx-auto overflow-hidden relative rounded-lg p-2">
      <div className="flex gap-4 animate-scroll">
        {[...images, ...images].map((src, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={src}
              alt={`banner-${index}`}
              width={300} 
              height={50} 
              className="rounded-lg  transition object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
