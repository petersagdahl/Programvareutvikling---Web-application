
export let currentHike = undefined;

export const setCurrentHike = (hike) => {
    currentHike = hike;
}

export const getCurrentHike = () => {
    return currentHike;
}