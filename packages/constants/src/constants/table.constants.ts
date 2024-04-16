export const EFFICACY_SCHEMA = 'efficacy'

export const TABLE_ACTIVITY = 'efficacy_activity';
export const TABLE_ROLES = 'efficacy_roles';
export const TABLE_USERS = 'efficacy_users';
export const TABLE_ASSETS = 'efficacy_assets';
export const TABLE_COLLECTIONS = 'efficacy_collections';
export const TABLE_COLLECTION_PROPERTIES = 'efficacy_collection_properties';
export const TABLE_TABLE_UI_SCHEMA = 'efficacy_table_ui_schema';
export const TABLE_TABLE_UI_SCHEMA_PROPERTIES = 'efficacy_table_ui_schema_properties';

export const SYSTEM_TABLES = [
    'efficacy_activity',
    'efficacy_roles',
    'efficacy_users',
    'efficacy_assets',
    'efficacy_collections',
    'efficacy_collection_properties',
    'efficacy_table_ui_schema',
    'efficacy_table_ui_schema_properties'
]

export const SYSTEM_TABLE_STATUS = [
    'draft', 'active', 'deleted', 'archived'
]

export const SYSTEM_COLLECTION_TABLE_TYPES = [
    'string',
    'text',
    'boolean',
    'integer',
    'big-integer',
    'float',
    'decimal',
    'timestamp',
    'date-time',
    'date',
    'time',
    'json',
    'object',
    'array',
    'asset',
    'string-enum',
    'hash'
]

export const SYSTEM_COLLECTION_VIEW_TYPES = [
    'table',
    'list',
    'grid',
    'view',
    'edit',
    'create'
]