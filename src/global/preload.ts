import { AssetLoader } from 'tscratch';
import awesome from '@/assets/fonts/Awesome.ttf';

export const fonts = await AssetLoader.loadFonts({ awesome });