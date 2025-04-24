export interface AppEvent {
    ref: { id: string },
    data: AppEventData
}

export interface AppEventData {
    name: string,
    creator: string,
    daytime: Date,
    description: string,
    participants: Array<string>,
    invites: Array<string>
}