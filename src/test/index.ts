export function spy<T extends jasmine.Func>(fn: T): jasmine.Spy<T> {
	return jasmine.createSpy(undefined, fn).and.callThrough();
}
