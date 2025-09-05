import {Signal} from "@angular/core";

export function useActiveElement<
  ElementT extends Element,
>(): Signal<undefined | ElementT>;

export function useActiveElement() {
  throw "not implemented yet";
  return null as any;
}
