import { supabase } from '../../utils/supabaseClient';

export const getTotalReactions = async () => {
  try {
    const { data } = await supabase.rpc('totalReactions');
    return data;
  } catch (e) {
    console.log(e);
  }
};
