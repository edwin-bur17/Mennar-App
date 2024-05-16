import React from 'react'

function Loading() {
  return (
      <div className="flex justify-center items-center mt-10">
        <div className="animate-spin rounded-full h-14 w-14 border-8 border-sky-500 border-t-sky-300"></div>
      </div>
  )
}

export default Loading