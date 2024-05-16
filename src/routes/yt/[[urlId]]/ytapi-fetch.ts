import { HYPEDUCK } from '$env/static/private';
import type { youtube_v3 } from '@googleapis/youtube';

export async function ytFetchPlaylistById(id: string) {

    console.log('FETCHING QUOTA COST');

    let nextPageToken: string | null | undefined = '';
    let resultsArr: youtube_v3.Schema$PlaylistListResponse[] = [];

    while (nextPageToken !== undefined) {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/playlists?
			part=snippet%2CcontentDetails&id=${id}
			&maxResults=50&key=${HYPEDUCK}&pageToken=${nextPageToken}`
        );
        const playlists: youtube_v3.Schema$PlaylistListResponse = await response.json();
        nextPageToken = playlists.nextPageToken
        resultsArr = [...resultsArr, ...playlists.items]
    }

    return resultsArr
}

export async function playlistsByChannel(channelId: string) {
    let nextPageToken: string | null | undefined = '';

    let playlists = []

    while (nextPageToken !== undefined) {
        let response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=50&key=${HYPEDUCK}&pageToken=${nextPageToken}`
        );

        if (!response.ok) {
            return null
        }

        let responseJson = await response.json()

        nextPageToken = responseJson.nextPageToken
        playlists = [...playlists, ...responseJson.items]
    }
    return playlists

}

export async function ytFetchPlaylistItems(playlistId: string) {

    let nextPageToken = "";
    let playlistItemsArr = []

    while (nextPageToken !== undefined) {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/playlistItems
			?part=snippet%2CcontentDetails&maxResults=50
			&playlistId=${playlistId}&key=${HYPEDUCK}&pageToken=${nextPageToken}`
        );

        if (!response.ok) {
            return null
        }

        const playlistItems = await response.json();
        playlistItemsArr.push(playlistItems)

        nextPageToken = playlistItems.nextPageToken;
    }
    return playlistItemsArr
}

export async function ytFetchVideos(videoIds: string) {

    const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${HYPEDUCK}`
    );

    if (!response.ok) {
        return null
    }

    const videos = await response.json();

    return videos.items;
}
