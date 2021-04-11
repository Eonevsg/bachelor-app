import { Topping } from '../models/topping.model';

export interface Pizza {
    id?: string;
    name?: string;
    toppings?: Topping[];
}