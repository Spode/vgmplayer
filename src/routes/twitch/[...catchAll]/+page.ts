
export interface Stream {
    id?: number;
    name?: string;
    chatVisible?: boolean;
    hidePanel?: boolean;
    denk?: string;
    size: number;
    dom: HTMLDivElement
}

export function load({ params }) {

    const splitted = params.catchAll.split("/")

    const streamNames = splitted.filter(function (el) {
        return el != null && el != '';
    });

    if (streamNames.length == 0) {
        streamNames.push('timbeaudet')
    }

    let streams: Stream[] = []

    streamNames.forEach((element, index) => {

        let obj: Stream = {
            id: index,
            name: element,
            chatVisible: true,
            hidePanel: false,
            denk: "denk",
            size: 1
        }
        streams.push(obj)
    });

    return {
        streams, streamNames
    };
}