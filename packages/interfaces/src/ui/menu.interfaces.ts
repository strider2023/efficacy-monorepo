export interface MenuItem {
    name: string
    icon: string
    navigationURL?: string
    hasChildren?: boolean
    children?: MenuItem[]
}