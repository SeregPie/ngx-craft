import {signal, WritableSignal} from "@angular/core";

export function useFocused(
  target: Element,
  options?: useFocused.Options,
): WritableSignal<boolean>;

export function useFocused(target, {
  focused = signal(false),
} = {}) {
  throw "not implemented yet";
  return null as any;
}

export namespace useFocused {
  export type Options = Partial<{
    focused: WritableSignal<boolean>;
  }>;
}
