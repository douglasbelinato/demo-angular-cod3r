import { Product } from './product.model';

export interface ProductReadTO {
    products: Product[]
    total: number
}