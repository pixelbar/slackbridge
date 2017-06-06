import { ICustomReply } from "./interfaces";
import { IMessage, IChatInterface } from "../chat_connectors/interfaces";
import Manager from "../manager";
import * as fs from "fs";

export default class FoodOrder implements ICustomReply {
    private orders: IFoodOrder[];
    constructor() {
        try {
            this.orders = JSON.parse(fs.readFileSync("data/foodorder.json", { encoding: "utf8" })) || [];
        } catch(e) {
            this.orders = [];
        }
    }

    public accept(message: IMessage, manager: Manager): boolean {
        if (!message.message.startsWith("#foodorder")) {
            return false;
        }

        const split: string[] = message.message.split(" ", 2);
        if (split.length === 1 || split[1] === "list") {
            manager.send(this.getFoodOrders());
        } else if (split.length > 1 && split[1] === "clear") {
            manager.send(this.clearFoodOrders());
        } else {
            manager.send(this.addFoodOrder(message, split[1]));
        }
        return true;
    }

    private getFoodOrders(): IMessage {
        let text: string;
        if(this.orders.length > 0) {
            text =  this.orders.map((o: IFoodOrder) => o.user + " wants " + o.food).join(", ");
        } else {
            text = "No orders placed";
        }
        return {
            message: text,
            time: new Date(),
            sender: {
                display_name: "Foodorder",
                unique_name: "Foodorder",
                is_bot: true
            },
            source: null
        };
    }

    private clearFoodOrders(): IMessage {
        this.orders = [];
        this.save();
        return {
            message: "Orders cleared",
            time: new Date(),
            sender: {
                display_name: "Foodorder",
                unique_name: "Foodorder",
                is_bot: true
            },
            source: null
        };
    }

    private addFoodOrder(message: IMessage, food: string): IMessage {
        this.orders = this.orders.filter((o: IFoodOrder) => o.user !== message.sender.display_name);
        this.orders.push({
            food: food,
            user: message.sender.display_name
        });
        this.save();
        return {
            message: message.sender.display_name + " wants " + food,
            time: new Date(),
            sender: {
                display_name: "Foodorder",
                unique_name: "Foodorder",
                is_bot: true
            },
            source: null
        };
    }

    private save(): void {
        fs.writeFile("data/foodorder.json", JSON.stringify(this.orders), () => {/*ignored*/});
    }
}

interface IFoodOrder {
    user: string;
    food: string;
}
