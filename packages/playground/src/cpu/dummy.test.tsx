import { Machine } from "./interfaces";
import { TYPES } from "./types"

import { myContainer, rebind_pep9 } from "./inversify.config";

describe('Sample Code', () => {
	it("works", () => {
		expect(myContainer.get<Machine>(TYPES.Machine).name()).toBe(10)
		rebind_pep9()
		expect(myContainer.get<Machine>(TYPES.Machine).name()).toBe(9)
	});

});





