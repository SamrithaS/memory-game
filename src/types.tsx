export type Iobj = {
    img: string;
    ind: number | null;
    class?: string;
};
export interface Iarray {
    [index: number]: { img: string; class?: string, id: number };
}
export interface handleClickFn{
    item: { img: string, class?: string }, index: number, e: any
}
export interface memoryProps{
    images: string[]
}