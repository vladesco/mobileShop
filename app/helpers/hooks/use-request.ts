import { useEffect, useRef, useState } from 'react';
import { endpointApiUrl } from '../../consts';

type RequestInfo = {
    body: Record<string, any>;
    queryParams: Record<string, number | string | boolean>;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH';
    applyCache: boolean;
};

type RequestStatus<T> = {
    isLoading: boolean;
    response?: T;
    error?: Error;
};

const defaultRequestStatus: RequestStatus<any> = {
    isLoading: false,
};

export const useRequest = <T>(
    path: string,
    info?: Partial<RequestInfo>
): RequestStatus<T> => {
    const [requestStatus, setRequestStatus] =
        useState<RequestStatus<T>>(defaultRequestStatus);

    const abortController = useRef<AbortController>(new AbortController());

    const url = info?.queryParams
        ? `${endpointApiUrl}/${path}?${stringifyQueryParams(info.queryParams)}`
        : `${endpointApiUrl}/${path}`;

    const method = info?.method || 'GET';
    const body = info?.body ? JSON.stringify(info.body) : null;
    const isCachedApplied = info?.applyCache;

    useEffect(
        () => {
            fetch(url, {
                body,
                signal: abortController.current.signal,
            })
                .then((response) => response.json())
                .then((response) =>
                    setRequestStatus({ isLoading: false, response })
                )
                .catch((error) =>
                    setRequestStatus({ isLoading: false, error })
                );

            return () => {
                abortController.current.abort();
                abortController.current = new AbortController();
            };
        },
        isCachedApplied ? [url, method, body] : undefined
    );

    return requestStatus;
};

const stringifyQueryParams = (
    queryParams: Record<string, number | string | boolean>
): string => {
    const stringifiedQueryParams = Object.entries(queryParams).reduce(
        (queryString, [paramName, paramValue]) => {
            if (paramValue) {
                return `${queryString}&${encodeURIComponent(
                    paramName
                )}=${encodeURIComponent(paramValue)}`;
            }
            return queryString;
        },
        ''
    );

    return stringifiedQueryParams;
};
