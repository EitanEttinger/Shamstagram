import { useState } from 'react'

export function LongTxt({ txt, length = 58 }) {
  const [isShowMore, setIsShowMore] = useState(false)

  function handleClick() {
    setIsShowMore((prevState) => !prevState)
  }

  function getTxtToShow() {
    if (txt.length < length) return txt
    else {
      if (isShowMore) return txt
      else return txt.substring(0, length) + '...'
    }
  }

  return (
    <span>
      {getTxtToShow()}
      {txt.length > length && (
        <span className='show-more' onClick={handleClick}>
          {!isShowMore ? 'more' : 'less'}
        </span>
      )}
    </span>
  )
}
