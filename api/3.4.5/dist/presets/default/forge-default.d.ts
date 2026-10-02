import ForgEng, { type ForgeCreateOptions, type ForgeGame } from 'forgeng';
type CoreProviderSelections = NonNullable<ForgeCreateOptions['providers']>;
export type DefaultUiProviderSelection = 'default' | Exclude<CoreProviderSelections['ui'], undefined>;
export type DefaultPresetProviderSelections = Omit<CoreProviderSelections, 'ui'> & {
    readonly ui?: DefaultUiProviderSelection;
};
export type DefaultPresetCreateOptions = Omit<ForgeCreateOptions, 'providers'> & {
    readonly providers?: DefaultPresetProviderSelections;
};
export declare const create: (options?: DefaultPresetCreateOptions) => Promise<ForgeGame>;
export declare const ForgEngDefault: Readonly<Omit<typeof ForgEng, 'create'> & {
    create: typeof create;
}>;
export default ForgEngDefault;
