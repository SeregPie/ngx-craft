export function spy<T extends jasmine.Func>(fn: T): jasmine.Spy<T> {
	return jasmine.createSpy(fn.name, fn).and.callThrough();
}
