declare interface Array<T> {
	// groupBy<U>(callbackfn: (item: T) => U): Map<U, Array<T>>;

	groupBy<U extends number>(callbackfn: (item: T) => U): ArrayLike<Array<T>>;
}