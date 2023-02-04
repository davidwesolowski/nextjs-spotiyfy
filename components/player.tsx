import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react'
import ReactHowler from 'react-howler'
import { useState, useRef, useEffect } from 'react'

import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'
import { useStoreActions } from 'easy-peasy'
import { formatTime } from '../lib/formatter'

const Player = ({ songs, activeSong }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isSeeking, setIsSeeking] = useState(false)
  const [indexOfTheSong, setIndexOfTheSong] = useState(0)
  const [sliderValue, setSliderValue] = useState(0.0)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const songPlayerRef = useRef(null)
  const repeatRef = useRef(null)

  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

  const handleIsPlayingChange = (value) => {
    setIsPlaying(value)
  }

  const handlePrevSong = () => {
    setIndexOfTheSong((idx) => (idx > 0 ? idx - 1 : songs.length - 1))
  }

  const handleNextSong = () => {
    const getNextIndex = (prevIndex: number) => {
      if (isShuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === prevIndex) {
          return getNextIndex(prevIndex)
        }
        return next
      }
      return prevIndex === songs.length ? 0 : prevIndex + 1
    }

    const nextIndex = getNextIndex(indexOfTheSong)

    setIndexOfTheSong(() => nextIndex)
  }

  const handleOnEnd = () => {
    if (songPlayerRef.current == null) {
      return
    }

    if (repeatRef.current) {
      setSliderValue(0)
      songPlayerRef.current.seek(0)
    } else {
      handleNextSong()
    }
  }

  const handleOnLoad = () => {
    if (songPlayerRef.current == null) {
      return
    }

    const songDuration = songPlayerRef.current.duration()
    setDuration(songDuration)
  }

  const handleChangeSlider = (event) => {
    if (songPlayerRef.current == null) {
      return
    }

    const newValue = event[0]
    setSliderValue(newValue)
    songPlayerRef.current.seek(newValue)
  }

  useEffect(() => {
    if (songPlayerRef.current == null) return

    let timerId = null

    if (isPlaying && !isSeeking) {
      const refreshSeek = () => {
        setSliderValue(songPlayerRef.current.seek())
        timerId = requestAnimationFrame(refreshSeek)
      }

      timerId = requestAnimationFrame(refreshSeek)

      return () => {
        if (timerId) cancelAnimationFrame(timerId)
      }
    }

    if (timerId) cancelAnimationFrame(timerId)
  }, [isSeeking, isPlaying])

  useEffect(() => {
    if (songs[indexOfTheSong]) {
      setActiveSong(songs[indexOfTheSong])
    }
  }, [indexOfTheSong, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = isRepeat
  }, [isRepeat])

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={songPlayerRef}
          playing={isPlaying}
          src={activeSong.url}
          onEnd={handleOnEnd}
          onLoad={handleOnLoad}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize={'24px'}
            color={isShuffle ? 'white' : 'gray.600'}
            icon={<MdShuffle />}
            onClick={() => setIsShuffle((prev) => !prev)}
          />
          <IconButton
            outline={'none'}
            variant="link"
            aria-label="previous"
            fontSize={'24px'}
            icon={<MdSkipPrevious />}
            onClick={handlePrevSong}
          />
          {isPlaying ? (
            <IconButton
              outline={'none'}
              variant="link"
              aria-label="pause"
              fontSize={'40px'}
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => handleIsPlayingChange(false)}
            />
          ) : (
            <IconButton
              outline={'none'}
              variant="link"
              aria-label="play"
              fontSize={'40px'}
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => handleIsPlayingChange(true)}
            />
          )}
          <IconButton
            outline={'none'}
            variant="link"
            aria-label="next"
            fontSize={'24px'}
            icon={<MdSkipNext />}
            onClick={handleNextSong}
          />
          <IconButton
            outline={'none'}
            variant="link"
            aria-label="repeat"
            fontSize={'24px'}
            icon={<MdOutlineRepeat />}
            color={isRepeat ? 'white' : 'gray.600'}
            onClick={() => setIsRepeat((prev) => !prev)}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify={'center'} align="center">
          <Box width={'10%'}>
            <Text fontSize={'xs'}>{formatTime(sliderValue)}</Text>
          </Box>
          <Box flex={1}>
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? Number(duration.toFixed(2)) : 0}
              onChange={handleChangeSlider}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              value={[sliderValue]}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width={'10%'} textAlign="right">
            <Text fontSize={'xs'}>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
