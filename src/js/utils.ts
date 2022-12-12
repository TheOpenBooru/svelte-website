export function normaliseTag(tag: string): string {
	return tag
		.replace(" ", "_")
		.toLowerCase()
		.split("")
		.filter(char => /[_()a-z0-9]/.test(char))
		.join("");
}
