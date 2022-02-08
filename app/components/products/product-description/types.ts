import { ProductInfo } from '../../../types';

export type ProductDescriptionsProps = {
    product: ProductInfo;
    onColorSelect: (color: string) => void;
};
