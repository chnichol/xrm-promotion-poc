export default interface HeaderSection {
    getBodyVisible(): boolean;
    getCommandBarVisible(): boolean;
    getTabNavigatorBarVisible(): boolean;
    setBodyVisible(): boolean;
    setCommandBarVisible(): boolean;
    setTabNavigatorVisible(): boolean;
}