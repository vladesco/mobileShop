import { Property } from '../../../types';
import { FireworksProps } from './types';

export const getNumberOfParticles = (density: Property<FireworksProps, 'density'>): number =>
    Math.floor(5 + Math.random() * 5 * density);

export const getParticleCoordinateOffset = (coordinateMaxValue: number): number =>
    Math.floor((Math.random() - 0.5) * coordinateMaxValue);

export const getNumberOfFireworks = (density: Property<FireworksProps, 'density'>): number =>
    Math.floor(density + Math.random() * density);

export const getFireworkPosition = (width: number, height: number): { x: number; y: number } => ({
    x: Math.round(Math.random() * width),
    y: Math.round(Math.random() * height),
});

export const getRandomColor = () => `#${(Math.random().toString(16) + '000000').substring(2, 8)}`;
export const getRandomKey = () => Math.random().toString(16);
