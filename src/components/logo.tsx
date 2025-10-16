// React Imports
import type { SVGAttributes } from 'react'

export function Logo(props: SVGAttributes<SVGElement>) {
  return (
    <svg width='1em' height='1em' viewBox='0 0 328 329' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect y='0.5' width='328' height='328' rx='164' fill='black' className='dark:fill-white' />
      <path
        d='M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288'
        stroke='white'
        strokeWidth='20'
        className='dark:stroke-black'
      />
      <path
        d='M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771'
        stroke='white'
        strokeWidth='20'
        className='dark:stroke-black'
      />
      <line
        x1='238.136'
        y1='98.8184'
        x2='196.76'
        y2='139.707'
        stroke='white'
        strokeWidth='20'
        className='dark:stroke-black'
      />
      <line
        x1='135.688'
        y1='200.957'
        x2='94.3128'
        y2='241.845'
        stroke='white'
        strokeWidth='20'
        className='dark:stroke-black'
      />
      <line
        x1='133.689'
        y1='137.524'
        x2='92.5566'
        y2='96.3914'
        stroke='white'
        strokeWidth='20'
        className='dark:stroke-black'
      />
      <line
        x1='237.679'
        y1='241.803'
        x2='196.547'
        y2='200.671'
        stroke='white'
        strokeWidth='20'
        className='dark:stroke-black'
      />
    </svg>
  )
}

export default Logo
