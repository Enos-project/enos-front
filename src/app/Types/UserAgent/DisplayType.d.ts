
export interface DisplayType {
    height: DisplayDimensionType,
    width: DisplayDimensionType,
    isLandscapeScreen: boolean,
    isLandscapeWindow: boolean
}

interface DisplayDimensionType {
    outer: number,
    inner: number,
    screen : number,
    available: number
}