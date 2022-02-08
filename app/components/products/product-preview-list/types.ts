import { ProductInfo } from '../../../types';

export type ProductPreviewListProps = {
    products: ProductInfo[];
    onRefresh: () => void;
    onPress: (selectedProduct: ProductInfo) => void;
};
