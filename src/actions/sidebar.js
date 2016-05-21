export const SIDEBAR_CHANGE_TAB = 'SIDEBAR_CHANGE_TAB';

export function changeTab(tabIndex) {
    return {
        type: SIDEBAR_CHANGE_TAB,
        tabIndex
    }
}