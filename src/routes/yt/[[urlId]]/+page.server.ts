import * as YTAPIFETCH from './ytapi-fetch'
import type { PageServerLoad } from "../$types";

interface ChannelInfo {
    name: string;
    id: string;
}

// interface MyPlaylistItem extends youtube_v3.Schema$PlaylistItem {
//     album: youtube_v3.Schema$Playlist
// }

let channels: ChannelInfo[] = [
    { name: "duslumba", id: "UCk64Zf4866PCEmb6WfljEJg" },
    { name: "rayflene", id: "UCc6PGFFIek0QT2wjOhWGHCQ" },
    { name: "unofficial", id: "UCgoIXKeXauTsuJI8niQljeQ" },
    { name: "vgm", id: "UCmyqtIMmi6SowXP7FLGBEww" }
]

let playlists
let playlistItems
let videos

async function initializePlaylistsAndVideos() {
    playlists = await Promise.all(channels.map(async (element) => {
        let thing = await YTAPIFETCH.playlistsByChannel(element.id)
        if (!thing) {
            return
        }

        return thing
    }))
    playlists = playlists.flat()

    playlistItems = await Promise.all(playlists.map(async (element) => {
        let thing = await YTAPIFETCH.ytFetchPlaylistItems(element.id)



        thing.forEach(element2 => {


            console.log(element2.items?.length, element.snippet.title)

            element2.items.map(element3 => {
                element3.album = element
            });

        });
        if (!thing) {
            return
        }
        return thing
    }))
    playlistItems = playlistItems.flat()

    videos = await Promise.all(playlistItems.map(async (element) => {
        let ids = []
        element.items.forEach(element2 => {
            ids.push(element2.contentDetails.videoId)
        });

        let videos = await YTAPIFETCH.ytFetchVideos(ids.join());

        for (let index = 0; index < videos.length; index++) {
            const element2 = videos[index];
            element2.album = element.items[index].album

        }
        if (!videos) {
            return
        }

        return videos
    }))
    videos = videos.flat()


}

async function fetchPlaylistThenPlaylistItemsThenVideos(playlistId) {

    let playlist = await YTAPIFETCH.ytFetchPlaylistById(playlistId)

    playlists = [...playlist, ...playlists]

    playlistItems = await Promise.all(playlist.map(async (element) => {
        let thing = await YTAPIFETCH.ytFetchPlaylistItems(element.id)


        thing.forEach(element2 => {

            element2.items.map(element3 => {
                element3.album = element
            });

        });
        if (!thing) {
            return
        }
        return thing
    }))
    playlistItems = playlistItems.flat()

    let videos2 = await Promise.all(playlistItems.map(async (element) => {
        let ids = []
        element.items.forEach(element2 => {
            ids.push(element2.contentDetails.videoId)
        });

        let videos = await YTAPIFETCH.ytFetchVideos(ids.join());

        for (let index = 0; index < videos.length; index++) {
            const element2 = videos[index];
            element2.album = element.items[index].album

        }
        if (!videos) {
            return
        }

        return videos
    }))
    videos2 = videos2.flat()

    return videos2
}

await initializePlaylistsAndVideos()



let inputPlaylistId = "PL4iv3Q3xc0skeScJ7XEZoK73INblR0mQA"

let thingies = await fetchPlaylistThenPlaylistItemsThenVideos(inputPlaylistId)

videos = [...thingies, ...videos]

export const load: PageServerLoad = async ({ params }) => {



    return { playlistItems, playlists, videos }
    // return { mergedVideosFlat, inputVideos, inputVideos2Flat, inputPlaylist, params, chosenPlaylists, playlists, videos, videosFlat, playlistItems, playlistsByChannelName, fetchedPlaylists, fetchedSongs }
};


