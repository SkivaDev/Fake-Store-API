export class Product {

    id: number;
    name: string;
    description: string;
    price: number;
    image: Array<string>;
    category: object;
    
    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);
    }
}
