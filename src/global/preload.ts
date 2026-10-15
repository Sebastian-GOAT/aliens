import { AssetLoader } from 'tscratch';
import awesome from '@/assets/fonts/Awesome.ttf';
import alien from '@/assets/costumes/alien.png';

export const fonts = await AssetLoader.loadFonts({ awesome });
export const costumes = await AssetLoader.loadCostumes({ alien });