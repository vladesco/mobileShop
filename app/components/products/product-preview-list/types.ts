import { ProductInfo } from '../../../types';

export type ProductPreviewListProps = {
    products: ProductInfo[];
    isLoading: boolean;
    refresh: () => void;
};
