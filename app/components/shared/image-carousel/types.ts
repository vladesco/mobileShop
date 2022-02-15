export type ImageCarouselProps = {
    images: CarouselImage[];
};

export type CarouselImage = {
    id: string;
    uri: string;
};

export type ImageCarouselPaginationProps = {
    selectedSlideNumber: number;
    totalCountOfSlides: number;
};
