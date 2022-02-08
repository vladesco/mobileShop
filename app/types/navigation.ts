import { DrawerScreenProps } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { ProductInfo } from './product';

export enum NavigationPages {
    MAIN = 'Main',
    PRODUCT_GALLERY = 'Product gallery',
    PRODUCT_DETAILS = 'Product details',
    LOGIN = 'Login',
    SIGN_UP = 'Sign up',
    FORGOT_PASSWORD = 'Forgot password',
    SELECT_COLOR_MODAL = 'Select color modal',
    LOGIN_TO_CONTINUE_MODAL = 'Login to continue modal',
    PRODUCT_ADDED_MODAL = 'Product added modal',
}

export type NavigationPagesParams = {
    [NavigationPages.MAIN]: undefined;
    [NavigationPages.PRODUCT_GALLERY]: undefined;
    [NavigationPages.SELECT_COLOR_MODAL]: undefined;
    [NavigationPages.LOGIN_TO_CONTINUE_MODAL]: undefined;
    [NavigationPages.LOGIN]: undefined;
    [NavigationPages.SIGN_UP]: undefined;
    [NavigationPages.FORGOT_PASSWORD]: undefined;
    [NavigationPages.PRODUCT_ADDED_MODAL]: undefined;
    [NavigationPages.PRODUCT_DETAILS]: {
        selectedProduct: ProductInfo;
    };
};

export type WithStackNavigation<T extends FC, RouteName extends keyof NavigationPagesParams> = T extends FC<infer Props>
    ? FC<Props & NativeStackScreenProps<NavigationPagesParams, RouteName>>
    : FC<NativeStackScreenProps<NavigationPagesParams, RouteName>>;

export type WithDrawerNavigation<T extends FC, RouteName extends keyof NavigationPagesParams> = T extends FC<
    infer Props
>
    ? FC<Props & DrawerScreenProps<NavigationPagesParams, RouteName>>
    : FC<DrawerScreenProps<NavigationPagesParams, RouteName>>;

export type WithCombinedNavigation<T extends FC, RouteName extends keyof NavigationPagesParams> = T extends FC<
    infer Props
>
    ? FC<
          Props &
              NativeStackScreenProps<NavigationPagesParams, RouteName> &
              DrawerScreenProps<NavigationPagesParams, RouteName>
      >
    : FC<
          NativeStackScreenProps<NavigationPagesParams, RouteName> & DrawerScreenProps<NavigationPagesParams, RouteName>
      >;
