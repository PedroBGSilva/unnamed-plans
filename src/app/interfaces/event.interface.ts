export interface AppEvent {
    name: string,
    creator: string,
    daytime: Date,
    description: string,
    participants: Array<string>,
    invites: Array<string>
}