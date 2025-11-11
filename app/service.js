export const loginService = async (body) => {
    try {
        const result = await fetch('api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body
        });

        return result.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const registerService = async (body) => {
    try {
        const result = await fetch('api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body
        });

        return result.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}