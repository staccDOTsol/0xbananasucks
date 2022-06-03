import { FieldValues, ResolverOptions, ResolverResult, UnpackNestedValue } from 'react-hook-form';
import type { AsyncValidationOptions, Schema } from 'joi';
export declare type Resolver = <T extends Schema>(schema: T, schemaOptions?: AsyncValidationOptions, factoryOptions?: {
    mode?: 'async' | 'sync';
}) => <TFieldValues extends FieldValues, TContext>(values: UnpackNestedValue<TFieldValues>, context: TContext | undefined, options: ResolverOptions<TFieldValues>) => Promise<ResolverResult<TFieldValues>>;
