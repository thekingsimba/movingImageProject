import { BEST_QUALITY } from "../constants";
import { FormatObject } from "../models/interfaces";

export const addBestFormat = (formats: { [key: string]: FormatObject }) => {
    const allFormat = Object.values(formats)

    const sortedFormat = formatSorting(allFormat);

    const bestFormat = sortedFormat[sortedFormat.length - 1];

    return BEST_QUALITY + bestFormat.res
}


export const formatSorting = (allFormat: FormatObject[]) => {
    // ASC sorting of movies format
    const n = allFormat.length;
    let swapped;

    const findResValue = (res: string) => {
        return Number(res.replace('p', ''))
    }

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (allFormat[i].size > allFormat[i + 1].size) {
                const temp = allFormat[i];
                allFormat[i] = allFormat[i + 1];
                allFormat[i + 1] = temp;
                swapped = true;
            }

            else if (allFormat[i].size === allFormat[i + 1].size) {

                //check res when size is equal
                if (findResValue(allFormat[i].res) > findResValue(allFormat[i + 1].res)) {
                    const temp = allFormat[i];
                    allFormat[i] = allFormat[i + 1];
                    allFormat[i + 1] = temp;
                    swapped = true;
                }
            }
        }
    } while (swapped);

    // ASC sorting
    return allFormat;
}
