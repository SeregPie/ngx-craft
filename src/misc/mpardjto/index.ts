export function mpardjto(fn: {(): unknown}): boolean {
	try {
		if (fn()) return true;
	} catch {}
	return false;
}
