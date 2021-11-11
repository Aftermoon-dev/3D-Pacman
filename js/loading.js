/**
 * 3D Pacman - Loading
 * 2021-2 Computer Graphics Term Project
 * Dept. of Software, Gachon Univ.
 */

let loading = undefined;

export function initLoading() {
    loading = new ldBar("#loadingbar");
}

export function setLoadingValue(value) {
    loading.set(value);
}