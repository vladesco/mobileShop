import { ProductInfo } from '../../../types';

export type ProductPreviewListProps = {
    products: ProductInfo[];
    refresh: () => void;
};
