/*
Array.prototype.groupBy = function <T, U>(this: Array<T>, callbackfn: (item: T) => U): Map<U, Array<T>> {
	return this.reduce(
		(rv, x) => {
			const k = callbackfn(x);
			rv.set(k, [...(rv.get(k) || []), x]);
			return rv;
		}, new Map<U, Array<T>>());
}
*/

Array.prototype.groupBy = function <T, U extends number>(this: Array<T>, callbackfn: (item: T) => U): ArrayLike<Array<T>> { 
	return this.reduce(
		(rv, x) => {
			const k = callbackfn(x);
			rv[k] = [...(rv[k] || []), x];
			return rv;
		}, new Array<Array<T>>());
}