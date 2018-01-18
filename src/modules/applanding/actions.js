// @flow

import { 
	SHOW_FAUX_LOADING,
	HIDE_FAUX_LOADING

} from './constants'

export type Action = {
  type: string,
  payload?: {
    data: any,
    selectedLine: string,
  }
}

export type ActionAsync = (dispatch: Function, getState: Function) => void


	export function showFauxLoading(data){
		return {
			type: SHOW_FAUX_LOADING,
			payload: {
				data
			}
		}
	}
	export function hideFauxLoading(){
		return {
			type: HIDE_FAUX_LOADING
		}
	}