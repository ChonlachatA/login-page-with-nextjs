import { getSupabase } from '../../db';

export const getUserByUsername = async () => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
            .from('user')
            .select('*');

        if (error) throw error;
        return data;
    } catch (e) {
        throw e;        
    }
}

export const createUsername = async (body) => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
            .from('user')
            .insert(body);

        if (error) throw error;
        return data;
    } catch (e) {
        throw e;        
    }
}
