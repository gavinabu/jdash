// I seperated this file because I might turn this into a NPM package to make it easier to use types with Spotify

export type SimplifiedArtistObject = MediaObject & {
  available_markets: undefined,
  images: undefined,
  release_date: undefined,
  restrictions: undefined,
  type: "artist",
  copyrights: undefined,
  description: undefined,
  html_description: undefined,
  explicit: undefined,
  is_externally_hosted: undefined,
  languages: undefined,
}

export type SimplifiedUserObject = MediaObject & {
  available_markets: undefined,
  images: undefined,
  release_date: undefined,
  restrictions: undefined,
  type: "user",
  display_name: string,
  copyrights: undefined,
  description: undefined,
  html_description: undefined,
  explicit: undefined,
  is_externally_hosted: undefined,
  languages: undefined,
}

export type ImageObject = {
  url: string,
  height: number,
  width: number,
}

export type MediaObject = {
  available_markets: string[],
  external_urls: {
    spotify?: string
  },
  href: string,
  id: string,
  images: ImageObject[],
  name: string,
  restrictions?: {
    reason?: "market" | "product" | "explicit"
  },
  type: string
  copyrights: {text: string, type: "C" | "P"}[],
  description: string,
  html_description: string,
  explicit: boolean,
  is_externally_hosted: boolean,
  languages: string[],
  uri: string
}

export type TrackObject = MediaObject & {
  album?: AlbumObject,
  artists?: SimplifiedArtistObject[],
  disc_number?: number,
  duration_ms?: number,
  external_ids?: {
    isrc?: string,
    ean?: string,
    upc?: string
  },
  is_playable?: boolean,
  linked_form?: {},
  popularity?: number, // 0 - 100
  preview_url?: string | null,
  track_number: string,
  type: "track",
  is_local: boolean,
}

export type AlbumObject = MediaObject & {
  type: "album",
  artists: string[],
  total_tracks: number,
  album_type: "album" | "single" | "compilation",
  release_date: string,
  release_date_precision: string,
}

export type EpisodeObject = MediaObject & {
  duration_ms: number,
  explicit: boolean,
  is_playable: boolean,
  language: string,
  name: string,
  resume_point?: {
    fully_played?: boolean,
    resume_position_ms?: number
  },
  release_date: string,
  release_date_precision: string,
  images: undefined;
  type: "episode",
  show: MediaObject & {
    copyrights: {text: string, type: "C" | "P"}[],
    type: undefined
    media_type: "show",
    total_episodes: number
  }
}

export type PlaybackState = {
  "device": {
    "id"?: string,
    "is_active": boolean,
    "is_private_session": boolean,
    "is_restricted": boolean,
    "name": string,
    "type": "computer" | "smartphone" | "speaker",
    "volume_percent"?: number,
    "supports_volume": boolean
  },
  "repeat_state": "off" | "track" | "context",
  "shuffle_state": boolean,
  "context"?: {
    "type": "artist" | "playlist" | "album" | "show",
    "href": string,
    "external_urls": {
      "spotify"?: string
    },
    "uri": string
  },
  "timestamp": number,
  "progress_ms"?: number,
  "is_playing": boolean,
  "item": AlbumObject | EpisodeObject,
  "currently_playing_type": "track" | "episode" | "ad" | "unknown",
  "actions": Partial<{
    "interrupting_playback": boolean,
    "pausing": boolean,
    "resuming": boolean,
    "seeking": boolean,
    "skipping_next": boolean,
    "skipping_prev": boolean,
    "toggling_repeat_context": boolean,
    "toggling_shuffle": boolean,
    "toggling_repeat_track": boolean,
    "transferring_playback": boolean
  }>
}

export type Playlist = {
  "collaborative": boolean,
  "description": string,
  "external_urls": {
    "spotify": string,
  },
  "href": string,
  "id": string,
  "images": ImageObject[],
  "name": string,
  "owner": SimplifiedUserObject
  "primary_color": null,
  "public": boolean,
  "snapshot_id": string,
  "tracks": {
    "href": string,
    "total": number
  },
  "type": "playlist",
  "uri": string
}