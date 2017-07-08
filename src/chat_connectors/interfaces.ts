export interface IChatInterface {
    messageReceived: (message: IMessage) => void;
    send(message: IMessage): void;
}

export interface IMessage {
    source: IChatInterface;
    sender: ISender;
    message: string;
    time: Date;
}

export interface ISender {
    display_name: string;
    unique_name: string;
    is_bot: boolean;
}
