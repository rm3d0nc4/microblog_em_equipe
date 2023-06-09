export function validateString(value: string): boolean {
    if(!value) return false;
    if(value.trim() === '') return false

    return true;
}