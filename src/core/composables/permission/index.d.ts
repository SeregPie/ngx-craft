import {Signal} from '@angular/core';

export function usePermission(name: PermissionName): Signal<undefined | PermissionState>;
