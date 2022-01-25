import { imageHubUrl } from '../../../consts';

export const generateImagesForProduct = (
    countImages: number
): {
    id: string;
    uri: string;
}[] =>
    Array.from({ length: countImages }, (_, number) => ({
        id: number.toString(),
        uri: `${imageHubUrl}/id/${number}/400/400`,
    }));
