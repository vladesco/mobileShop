export type ProductInfo = {
    id: string;
    attributes: {
        name: string;
        description: string;
        available_on: string;
        slug: string;
        meta_description: string;
        meta_keywords: string;
        updated_at: string;
        sku: string;
        purchasable: boolean;
        in_stock: boolean;
        backorderable: boolean;
        available: boolean;
        currency: string;
        price: string;
        display_price: string;
        compare_at_price: string;
        display_compare_at_price: string;
    };
};
