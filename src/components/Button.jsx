import React from 'react'

const Button = ({id, title, leftIcon ,containerClass , rightIcon}) => {
  return (
    <button className=' flex justify-center bg-yellow-300 hover:bg-white transition-all ease-linear duration-200 items-center gap-1  rounded-full px-3 py-1'>
      {leftIcon}
      <span className='text-xs font-[Gilroy]'>
        <div>
          {title}
        </div>
        {rightIcon}
      </span>
    </button>
  )
}

export default Button