import { supabase } from '../../utils/supabaseClient';

export const getLikes = async (id) => {
  try {
    const { data } = await supabase
      .from('elements')
      .select('likes, fires, rockets, hearts, unicorns')
      .eq('element_id', id);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateLikes = async (id, likes, type) => {
  console.log('api', { id, likes, type });
  try {
    await supabase
      .from('elements')
      .update({ [type]: likes + 1 })
      .match({ element_id: id });
  } catch (e) {
    console.log(e);
  }
};

export const insertLikes = async (id, likes, type) => {
  try {
    await supabase.from('elements').insert([{ element_id: id, [type]: likes + 1 }]);
  } catch (e) {
    console.log(e);
  }
};
