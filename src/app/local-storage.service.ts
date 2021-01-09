import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	private static readonly PREFIX = 'heating:';

	constructor() { }

	get<T>(key: string): T | undefined {
		const item = localStorage.getItem(`${LocalStorageService.PREFIX}${key}`);
		return item !== null ? JSON.parse(item) : undefined;
	}

	list(filter: (key: string) => boolean): string[] {
		const len = localStorage.length;
		const ret: string[] = [];
		for (let i = 0; i < len; ++i) {
			const key = localStorage.key(i);
			if (key !== null && key.startsWith(LocalStorageService.PREFIX)) {
				const item = key.substring(LocalStorageService.PREFIX.length);
				if (filter(item)) {
					ret.push(item);
				}
			}
		}
		return ret;
	}

	remove(key: string): void {
		localStorage.removeItem(`${LocalStorageService.PREFIX}${key}`);
	}

	set<T>(key: string, value: T): void {
		localStorage.setItem(`${LocalStorageService.PREFIX}${key}`, JSON.stringify(value));
	}
}
