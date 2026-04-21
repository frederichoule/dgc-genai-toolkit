declare module '@tgwf/co2' {
	export class co2 {
		constructor(options?: {
			model?: '1byte' | 'swd';
			version?: 3 | 4;
			rating?: boolean;
			results?: 'segment';
		});
		perByte(bytes: number, green?: boolean): number;
		perVisit(bytes: number, green?: boolean): number;
	}
}
