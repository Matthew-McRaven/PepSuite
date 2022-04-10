
// file entities.ts

import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CPU } from "./interfaces";
import { TYPES } from "./types"

@injectable()
class Pep10 implements CPU {
	public readReg(reg: string): [number, number] {
		return [10, 1]
	}
	public writeReg(reg: string, val: number) { }
	public reset() { }
}

@injectable()
class Pep9 implements CPU {
	public readReg(reg: string): [number, number] {
		return [9, 1]
	}
	public writeReg(reg: string, val: number) { }
	public reset() { }
}


class Pep10Provider {
	public simulator(id: number) { }
	public recycleSimulator(id: number) { }
	public project() { }
	public static assemble() { }
}


export { Pep10, Pep9, Pep10Provider };