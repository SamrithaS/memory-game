import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Iobj, Iarray, memoryProps, itemType } from '../types/types'
import { getBestScore } from '../helpers/getBestScore'
import { getTimerMinutes, getTimerSeconds } from '../helpers/getTimerValues'
import Timer from '../components/timer'
let counter: number = 0
function Memory(props: memoryProps) {
  var arrays: Iarray = props.images.map((i: string, index: number) => {
    return { img: i, id: index }
  })
  const [minute, setMinute] = useState<string>('')
  const [seconds, setSeconds] = useState<string>('')
  const [array, setarray] = useState<Iarray>(arrays)
  const [clickedItem2, setClickedItem2] = useState<Iobj>({
    img: '',
    ind: null,
    class: '',
  })
  const [clickedItem1, setClickedItem1] = useState<Iobj>({
    img: '',
    ind: null,
    class: '',
  })

  useEffect(() => {
    setSeconds('00')
    setMinute('00')
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (clickedItem2.img !== '' && clickedItem1.img !== '') {
        setClickedItem1({
          ...clickedItem1,
          img: '',
          ind: null,
        })
        setClickedItem2({ ...clickedItem2, img: '', ind: null })
      }
    }, 600)
  }, [clickedItem1, clickedItem2])

  useEffect(() => {
    if (
      _.filter(array, (item) => {
        return item.class !== 'vanish'
      }).length !== 0
    ) {
      setTimeout(() => {
        setSeconds(getTimerSeconds(counter))
        setMinute(getTimerMinutes(counter))
        counter = counter + 1
      }, 1000)
    } else {
      let dataval = localStorage.getItem('data')
      let value =
        minute && seconds !== '00'
          ? dataval
            ? dataval + ` ${minute}:${seconds}`
            : `${minute}:${seconds}`
          : ''
      localStorage.setItem('data', value)
    }
  }, [seconds, minute])

  const handleClick = (item: itemType, index: number) => {
    if (clickedItem1.ind === null) {
      setClickedItem1({
        ...clickedItem1,
        img: item.img,
        ind: index,
      })
    }

    if (
      clickedItem1.ind !== null &&
      clickedItem2.ind === null &&
      clickedItem1.img === item.img &&
      clickedItem1.ind !== index
    ) {
      setTimeout(() => {
        setarray(
          _.map(array, (item: itemType) => {
            return clickedItem1.ind === item.id
              ? { id: clickedItem1.ind, img: clickedItem1.img, class: 'vanish' }
              : index === item.id
              ? { id: index, img: array[index].img, class: 'vanish' }
              : item
          }),
        )
      }, 600)
      setClickedItem2({
        img: item.img,
        ind: index,
        class: 'vanish',
      })
      setClickedItem1({
        ...clickedItem1,
        class: 'vanish',
      })
    }
    if (
      clickedItem1.ind !== null &&
      clickedItem2.ind === null &&
      clickedItem1.ind !== index
    ) {
      setClickedItem2({ ...clickedItem2, img: item.img, ind: index })
    }
  }

  return (
    <div className="App">
      <div className="flex-parent">
        <h2>Memory game</h2>
      </div>
      {_.filter(array, (item) => {
        return item.class !== 'vanish'
      }).length === 0 ? (
        <div className="play-again">
          <p>
            Well done! you have completed the game in {`${minute}:${seconds}`}{' '}
            minutes.
          </p>
          <button
            onClick={() => {
              window.location.reload()
            }}
          >
            play again!
          </button>
        </div>
      ) : (
        <div className="UI-parent">
          <div className="flex-between">
            {localStorage.getItem('data') ? (
              <p>
                Your highscore : {getBestScore(localStorage.getItem('data'))}
              </p>
            ) : (
              <></>
            )}

            {minute && seconds ? (
              <Timer minute={minute} seconds={seconds} />
            ) : (
              <></>
            )}
          </div>
          <ul>
            {_.map(array, (item: itemType, index: number) => {
              return (
                <li
                  key={index}
                  className={`${item.class} ${
                    index === clickedItem1.ind || index === clickedItem2.ind
                      ? 'flip'
                      : ''
                  }`}
                  onClick={() => handleClick(item, index)}
                >
                  <img src={item.img} alt=""></img>
                  <div className="layer"></div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Memory
