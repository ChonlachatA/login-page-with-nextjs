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

export const changePasswordService = async (id, body) => {
    try {
        const result = await fetch(`api/change-password/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body
        });

        return result.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteUserService = async (id) => {
    try {
        const result = await fetch(`api/delete/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });

        return result.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}