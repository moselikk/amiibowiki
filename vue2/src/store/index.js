import Vue from 'vue'
import Vuex from 'vuex'
import { listLength } from '../settings'

Vue.use(Vuex)

const state = {
  show: [],
	listLength: listLength
}

const mutations = {
  UPDATESHOW(state,value){
    state.show = value
  },
	LOADEMORE(state){
		state.listLength = state.listLength + listLength 
	}
}

const actions = {
	jiaOdd(context,value){
		console.log('actions中的jiaOdd被调用了')
		if(context.state.sum % 2){
			context.dispatch('JIA',value)
		}
	}
}

export default new Vuex.Store({
	actions,
	mutations,
	state,
})