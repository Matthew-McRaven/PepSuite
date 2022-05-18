
export interface CPU {
	readReg(name: string): [number, number];
	writeReg(name: string, value: number): void
	reset(): void;
}
export interface Machine {
	name(): number;
}