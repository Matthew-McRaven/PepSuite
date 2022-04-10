
import { Container } from "inversify";
import { TYPES } from "./types";
import { CPU, Machine as Machine_T } from "./interfaces";
import { Pep9, Pep10, Machine, } from "./entities";

const myContainer = new Container();
myContainer.bind<CPU>(TYPES.CPU).to(Pep10);
myContainer.bind<Machine_T>(TYPES.Machine).to(Machine)

function rebind_pep9() {
	myContainer.rebind<CPU>(TYPES.CPU).to(Pep9)
}

function rebind_pep10() {
	myContainer.rebind<CPU>(TYPES.CPU).to(Pep10)
}

export { myContainer, rebind_pep9, rebind_pep10 };