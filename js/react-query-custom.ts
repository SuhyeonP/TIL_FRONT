// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/// <reference  types="@tanstack/query-core/src/types.ts" />
/// <reference  types="@tanstack/react-query/src/types.ts" />
/// <reference  types="@tanstack/react-query/src/useMutation.ts" />
// import '../node_modules/@tanstack/query-core/src/types.ts';
// import '../node_modules/@tanstack/react-query/src/types.ts';
// import '../node_modules/@tanstack/react-query/src/useMutation.ts';

import '@tanstack/react-query';
// tsconfig에 해당파일 typeRoot, include, type에 넣어야함..!!

import type { MutationFunction } from '@tanstack/query-core';
import { MutationObserverResult, UseMutateAsyncFunction } from '@tanstack/react-query';
import {
    type UseMutationOptions,
    type UseMutationResult,
    UseBaseMutationResult,
} from '@tanstack/react-query/src/types';

declare module '@tanstack/react-query' {
    type Override<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] };

    export interface MutateRequiredOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
        onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
        onError: (error: TError, variables: TVariables, context: TContext | undefined) => void;
        onSettled?: (
            data: TData | undefined,
            error: TError | null,
            variables: TVariables,
            context: TContext | undefined
        ) => void;
    }
    // 에러 모달 2개 타게할 가능성 없애버리기
    export interface MutateExceptErrorOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
        onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
        // onError: (error: TError, variables: TVariables, context: TContext | undefined) => void;
        onSettled?: (
            data: TData | undefined,
            error: TError | null,
            variables: TVariables,
            context: TContext | undefined
        ) => void;
    }

    export type MutateRequiredFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = (
        variables: TVariables,
        options: MutateRequiredOptions<TData, TError, TVariables, TContext>
    ) => Promise<TData>;

    export type MutateExceptErrorFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = (
        variables: TVariables,
        options: MutateExceptErrorOptions<TData, TError, TVariables, TContext>
    ) => Promise<TData>;

    export type UseMutateRequiredFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = (
        ...args: Parameters<MutateRequiredFunction<TData, TError, TVariables, TContext>>
    ) => void;
    export type UseMutateExceptErrorFunction<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = (
        ...args: Parameters<MutateExceptErrorFunction<TData, TError, TVariables, TContext>>
    ) => void;

    export type UseBaseMutationRequiredResult<
        TData = unknown,
        TError = unknown,
        TVariables = unknown,
        TContext = unknown
    > = Override<
        MutationObserverResult<TData, TError, TVariables, TContext>,
        { mutate: UseMutateRequiredFunction<TData, TError, TVariables, TContext> }
    > & { mutateAsync: UseMutateAsyncFunction<TData, TError, TVariables, TContext> };

    export type UseBaseMutationExceptErrorResult<
        TData = unknown,
        TError = unknown,
        TVariables = unknown,
        TContext = unknown
    > = Override<
        MutationObserverResult<TData, TError, TVariables, TContext>,
        { mutate: UseMutateExceptErrorFunction<TData, TError, TVariables, TContext> }
    > & { mutateAsync: UseMutateAsyncFunction<TData, TError, TVariables, TContext> };

    export type UseMutationErrorResult<
        TData = unknown,
        TError = unknown,
        TVariables = unknown,
        TContext = unknown
    > = UseBaseMutationRequiredResult<TData, TError, TVariables, TContext>;

    export type UseMutationExceptErrorResult<
        TData = unknown,
        TError = unknown,
        TVariables = unknown,
        TContext = unknown
    > = UseBaseMutationExceptErrorResult<TData, TError, TVariables, TContext>;

    /*
    @ explanation isUsedCustomError false 사용하고 onError를 부가적으로 사용하려면 에러남
    @ isUsedCustomError: 에러 모달 2개 타게할 가능성 없애버리기
    @ param isUsedCustomError: false -> useCustomMutation 내부 onError 사용
    @ param isUsedCustomError: true -> useCustomMutation 내부 onError 사용 안함, onError 를 핸들러로 추가 사용해야함
     */
    export type UseCustomMutationResult<
        TData,
        TErrorOption extends boolean,
        TVariables = unknown,
        TError = unknown,
        TContext = unknown
    > = TErrorOption extends true
        ? UseMutationErrorResult<TData, TError, TVariables, TContext>
        : UseMutationExceptErrorResult<TData, TError, TVariables, TContext>;

    // todo variables 인자만 넘기고 있어서 타입 맞게 변환 필요
    export function useMutation<
        TErrorOption extends boolean = false,
        TData = unknown,
        TVariables = void,
        TError = unknown,
        TContext = unknown
    >(
        mutationFn: MutationFunction<TData, TVariables>,
        options: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
        isUsedCustomError: TErrorOption
    ): UseCustomMutationResult<TData, TErrorOption, TVariables, TError, TContext>;
}
import { MutationFunction } from '@tanstack/query-core';
import { useMutation } from '@tanstack/react-query';
import { ICustomModal } from 'client/components/molecules/customModal/ICustomModal';
import useAPIErrorModal, { defaultErrorButton } from 'client/hooks/useAPIErrorModal';
import useModal from 'client/hooks/useModal';
import { CommonAPIResponse } from 'common/interface/common';

export function handleSuccessException<T>(data: CommonAPIResponse<T>, ...rest: any) {
    const { result } = data;

    if (result?.code === 'SUCCESS') {
        rest[0]();
    } else {
        rest[1]();
    }
}

export type FlightMutateData<T> = CommonAPIResponse<T>;

interface CustomMutationProps2<T, V> {
    mutationFn: MutationFunction<FlightMutateData<T>, any>;
    isUsedCustomError: V;
}
export const useCustomMutation2 = <T = unknown, TErrorOption extends boolean = false>({
                                                                                          mutationFn,
                                                                                          isUsedCustomError,
                                                                                      }: CustomMutationProps2<T, TErrorOption>) => {
    const { openErrorModal } = useAPIErrorModal();

    return useMutation<TErrorOption, FlightMutateData<T>, any>(
        mutationFn,
        {
            onSuccess: ({ result }) => {
                // console.log('success here');
                if (result?.code !== 'SUCCESS') {
                    const { title, message, buttons } = result;
                    openErrorModal({ title, message, buttons });
                }
            },
            onError: () => {
                // console.log('first, and then');
                if (!isUsedCustomError) {
                    openErrorModal({
                        title: '서비스에 연결할 수 없습니다',
                        message: '',
                        buttons: defaultErrorButton,
                    });
                }
            },
        },
        isUsedCustomError
    );
};

export const CustomMutation = {
    useCustomMutation: useCustomMutation2,
    successException: handleSuccessException,
};

interface CustomMutationProps<T> {
    mutationFn: MutationFunction<CommonAPIResponse<T>, any>;
    modalOptions?: ICustomModal;
}

const useCustomMutation = <T>({ mutationFn, modalOptions }: CustomMutationProps<T>) => {
    const { openErrorModal } = useAPIErrorModal();
    const { addModal: addCustomErrorModal } = useModal();

    // 공통 처리: API 응답 에러 얼럿 노출
    return useMutation(mutationFn, {
        onSuccess: ({ result }) => {
            // console.log('success here origin');

            if (result?.code !== 'SUCCESS') {
                const { title, message, buttons } = result;
                openErrorModal({ title, message, buttons });
            }
        },
        onError: () => {
            if (modalOptions) {
                addCustomErrorModal(modalOptions);
            } else {
                openErrorModal({
                    title: '서비스에 연결할 수 없습니다',
                    message: '',
                    buttons: defaultErrorButton,
                });
            }
        },
    });
};

export default useCustomMutation;
