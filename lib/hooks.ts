import useSWR from 'swr'
import { fetcher } from './fetcher'
import { PlayList } from './interfaces'

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data,
    isError: error,
    isLoading: !data && !error,
  }
}

export const usePlaylists = () => {
  const { data, error } = useSWR('/playlists', fetcher)

  return {
    playlists: (data ?? []) as unknown as PlayList[],
    isError: error,
    isLoading: !data && !error,
  }
}
