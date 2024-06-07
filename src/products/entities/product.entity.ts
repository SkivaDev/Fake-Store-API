export class Product {

    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    
    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);
    }
}
