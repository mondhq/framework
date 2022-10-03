import MondEvents from "../enum/MondEvents";
import Mond from "../Mond";

export default class MondEvent {
    public name = "";
    public event: MondEvents | undefined = undefined;
    public handler: ((client: Mond, ...args: any[]) => void) | undefined = undefined;

    public setName(name: string): MondEvent {
        this.name = name;
        return this;
    }

    public setEvent(event: MondEvents): MondEvent {
        this.event = event;
        return this;
    }

    public setHandler(handler: (client: Mond, ...args: any[]) => void): MondEvent {
        this.handler = handler;
        return this;
    }

    public isValid() {
        return this.name && this.name.length > 0 && this.event && this.handler;
    }
}
