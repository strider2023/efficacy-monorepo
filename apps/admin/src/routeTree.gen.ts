/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UsersIndexImport } from './routes/users/index'
import { Route as RolesIndexImport } from './routes/roles/index'
import { Route as ItemsIndexImport } from './routes/items/index'
import { Route as CollectionsIndexImport } from './routes/collections/index'
import { Route as AssetsIndexImport } from './routes/assets/index'
import { Route as UsersCreateImport } from './routes/users/create'
import { Route as RolesCreateImport } from './routes/roles/create'
import { Route as EditWorkflowImport } from './routes/edit.workflow'
import { Route as CollectionsCreateImport } from './routes/collections/create'
import { Route as AssetsCreateImport } from './routes/assets/create'
import { Route as UsersUserIdIndexImport } from './routes/users/$userId/index'
import { Route as RolesRoleIdIndexImport } from './routes/roles/$roleId/index'
import { Route as CollectionsCollectionIdIndexImport } from './routes/collections/$collectionId/index'
import { Route as AssetsAssetIdIndexImport } from './routes/assets/$assetId/index'
import { Route as UsersUserIdEditImport } from './routes/users/$userId/edit'
import { Route as RolesRoleIdEditImport } from './routes/roles/$roleId/edit'
import { Route as ItemsCollectionIdCreateImport } from './routes/items/$collectionId/create'
import { Route as EditCollectionViewImport } from './routes/edit.$collection.view'
import { Route as CollectionsCollectionIdEditImport } from './routes/collections/$collectionId/edit'
import { Route as AssetsAssetIdEditImport } from './routes/assets/$assetId/edit'
import { Route as ItemsCollectionIdItemIdIndexImport } from './routes/items/$collectionId/$itemId/index'
import { Route as CollectionsCollectionIdPropertiesIndexImport } from './routes/collections/$collectionId/properties/index'
import { Route as ItemsCollectionIdItemIdEditImport } from './routes/items/$collectionId/$itemId/edit'
import { Route as CollectionsCollectionIdPropertiesCreateImport } from './routes/collections/$collectionId/properties/create'
import { Route as CollectionsCollectionIdPropertiesPropertyIdIndexImport } from './routes/collections/$collectionId/properties/$propertyId/index'
import { Route as CollectionsCollectionIdPropertiesPropertyIdEditImport } from './routes/collections/$collectionId/properties/$propertyId/edit'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UsersIndexRoute = UsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => rootRoute,
} as any)

const RolesIndexRoute = RolesIndexImport.update({
  path: '/roles/',
  getParentRoute: () => rootRoute,
} as any)

const ItemsIndexRoute = ItemsIndexImport.update({
  path: '/items/',
  getParentRoute: () => rootRoute,
} as any)

const CollectionsIndexRoute = CollectionsIndexImport.update({
  path: '/collections/',
  getParentRoute: () => rootRoute,
} as any)

const AssetsIndexRoute = AssetsIndexImport.update({
  path: '/assets/',
  getParentRoute: () => rootRoute,
} as any)

const UsersCreateRoute = UsersCreateImport.update({
  path: '/users/create',
  getParentRoute: () => rootRoute,
} as any)

const RolesCreateRoute = RolesCreateImport.update({
  path: '/roles/create',
  getParentRoute: () => rootRoute,
} as any)

const EditWorkflowRoute = EditWorkflowImport.update({
  path: '/edit/workflow',
  getParentRoute: () => rootRoute,
} as any)

const CollectionsCreateRoute = CollectionsCreateImport.update({
  path: '/collections/create',
  getParentRoute: () => rootRoute,
} as any)

const AssetsCreateRoute = AssetsCreateImport.update({
  path: '/assets/create',
  getParentRoute: () => rootRoute,
} as any)

const UsersUserIdIndexRoute = UsersUserIdIndexImport.update({
  path: '/users/$userId/',
  getParentRoute: () => rootRoute,
} as any)

const RolesRoleIdIndexRoute = RolesRoleIdIndexImport.update({
  path: '/roles/$roleId/',
  getParentRoute: () => rootRoute,
} as any)

const CollectionsCollectionIdIndexRoute =
  CollectionsCollectionIdIndexImport.update({
    path: '/collections/$collectionId/',
    getParentRoute: () => rootRoute,
  } as any)

const AssetsAssetIdIndexRoute = AssetsAssetIdIndexImport.update({
  path: '/assets/$assetId/',
  getParentRoute: () => rootRoute,
} as any)

const UsersUserIdEditRoute = UsersUserIdEditImport.update({
  path: '/users/$userId/edit',
  getParentRoute: () => rootRoute,
} as any)

const RolesRoleIdEditRoute = RolesRoleIdEditImport.update({
  path: '/roles/$roleId/edit',
  getParentRoute: () => rootRoute,
} as any)

const ItemsCollectionIdCreateRoute = ItemsCollectionIdCreateImport.update({
  path: '/items/$collectionId/create',
  getParentRoute: () => rootRoute,
} as any)

const EditCollectionViewRoute = EditCollectionViewImport.update({
  path: '/edit/$collection/view',
  getParentRoute: () => rootRoute,
} as any)

const CollectionsCollectionIdEditRoute =
  CollectionsCollectionIdEditImport.update({
    path: '/collections/$collectionId/edit',
    getParentRoute: () => rootRoute,
  } as any)

const AssetsAssetIdEditRoute = AssetsAssetIdEditImport.update({
  path: '/assets/$assetId/edit',
  getParentRoute: () => rootRoute,
} as any)

const ItemsCollectionIdItemIdIndexRoute =
  ItemsCollectionIdItemIdIndexImport.update({
    path: '/items/$collectionId/$itemId/',
    getParentRoute: () => rootRoute,
  } as any)

const CollectionsCollectionIdPropertiesIndexRoute =
  CollectionsCollectionIdPropertiesIndexImport.update({
    path: '/collections/$collectionId/properties/',
    getParentRoute: () => rootRoute,
  } as any)

const ItemsCollectionIdItemIdEditRoute =
  ItemsCollectionIdItemIdEditImport.update({
    path: '/items/$collectionId/$itemId/edit',
    getParentRoute: () => rootRoute,
  } as any)

const CollectionsCollectionIdPropertiesCreateRoute =
  CollectionsCollectionIdPropertiesCreateImport.update({
    path: '/collections/$collectionId/properties/create',
    getParentRoute: () => rootRoute,
  } as any)

const CollectionsCollectionIdPropertiesPropertyIdIndexRoute =
  CollectionsCollectionIdPropertiesPropertyIdIndexImport.update({
    path: '/collections/$collectionId/properties/$propertyId/',
    getParentRoute: () => rootRoute,
  } as any)

const CollectionsCollectionIdPropertiesPropertyIdEditRoute =
  CollectionsCollectionIdPropertiesPropertyIdEditImport.update({
    path: '/collections/$collectionId/properties/$propertyId/edit',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/assets/create': {
      preLoaderRoute: typeof AssetsCreateImport
      parentRoute: typeof rootRoute
    }
    '/collections/create': {
      preLoaderRoute: typeof CollectionsCreateImport
      parentRoute: typeof rootRoute
    }
    '/edit/workflow': {
      preLoaderRoute: typeof EditWorkflowImport
      parentRoute: typeof rootRoute
    }
    '/roles/create': {
      preLoaderRoute: typeof RolesCreateImport
      parentRoute: typeof rootRoute
    }
    '/users/create': {
      preLoaderRoute: typeof UsersCreateImport
      parentRoute: typeof rootRoute
    }
    '/assets/': {
      preLoaderRoute: typeof AssetsIndexImport
      parentRoute: typeof rootRoute
    }
    '/collections/': {
      preLoaderRoute: typeof CollectionsIndexImport
      parentRoute: typeof rootRoute
    }
    '/items/': {
      preLoaderRoute: typeof ItemsIndexImport
      parentRoute: typeof rootRoute
    }
    '/roles/': {
      preLoaderRoute: typeof RolesIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/': {
      preLoaderRoute: typeof UsersIndexImport
      parentRoute: typeof rootRoute
    }
    '/assets/$assetId/edit': {
      preLoaderRoute: typeof AssetsAssetIdEditImport
      parentRoute: typeof rootRoute
    }
    '/collections/$collectionId/edit': {
      preLoaderRoute: typeof CollectionsCollectionIdEditImport
      parentRoute: typeof rootRoute
    }
    '/edit/$collection/view': {
      preLoaderRoute: typeof EditCollectionViewImport
      parentRoute: typeof rootRoute
    }
    '/items/$collectionId/create': {
      preLoaderRoute: typeof ItemsCollectionIdCreateImport
      parentRoute: typeof rootRoute
    }
    '/roles/$roleId/edit': {
      preLoaderRoute: typeof RolesRoleIdEditImport
      parentRoute: typeof rootRoute
    }
    '/users/$userId/edit': {
      preLoaderRoute: typeof UsersUserIdEditImport
      parentRoute: typeof rootRoute
    }
    '/assets/$assetId/': {
      preLoaderRoute: typeof AssetsAssetIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/collections/$collectionId/': {
      preLoaderRoute: typeof CollectionsCollectionIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/roles/$roleId/': {
      preLoaderRoute: typeof RolesRoleIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/users/$userId/': {
      preLoaderRoute: typeof UsersUserIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/collections/$collectionId/properties/create': {
      preLoaderRoute: typeof CollectionsCollectionIdPropertiesCreateImport
      parentRoute: typeof rootRoute
    }
    '/items/$collectionId/$itemId/edit': {
      preLoaderRoute: typeof ItemsCollectionIdItemIdEditImport
      parentRoute: typeof rootRoute
    }
    '/collections/$collectionId/properties/': {
      preLoaderRoute: typeof CollectionsCollectionIdPropertiesIndexImport
      parentRoute: typeof rootRoute
    }
    '/items/$collectionId/$itemId/': {
      preLoaderRoute: typeof ItemsCollectionIdItemIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/collections/$collectionId/properties/$propertyId/edit': {
      preLoaderRoute: typeof CollectionsCollectionIdPropertiesPropertyIdEditImport
      parentRoute: typeof rootRoute
    }
    '/collections/$collectionId/properties/$propertyId/': {
      preLoaderRoute: typeof CollectionsCollectionIdPropertiesPropertyIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AssetsCreateRoute,
  CollectionsCreateRoute,
  EditWorkflowRoute,
  RolesCreateRoute,
  UsersCreateRoute,
  AssetsIndexRoute,
  CollectionsIndexRoute,
  ItemsIndexRoute,
  RolesIndexRoute,
  UsersIndexRoute,
  AssetsAssetIdEditRoute,
  CollectionsCollectionIdEditRoute,
  EditCollectionViewRoute,
  ItemsCollectionIdCreateRoute,
  RolesRoleIdEditRoute,
  UsersUserIdEditRoute,
  AssetsAssetIdIndexRoute,
  CollectionsCollectionIdIndexRoute,
  RolesRoleIdIndexRoute,
  UsersUserIdIndexRoute,
  CollectionsCollectionIdPropertiesCreateRoute,
  ItemsCollectionIdItemIdEditRoute,
  CollectionsCollectionIdPropertiesIndexRoute,
  ItemsCollectionIdItemIdIndexRoute,
  CollectionsCollectionIdPropertiesPropertyIdEditRoute,
  CollectionsCollectionIdPropertiesPropertyIdIndexRoute,
])

/* prettier-ignore-end */
