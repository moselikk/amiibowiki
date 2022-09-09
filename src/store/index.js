import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  show: [],
}

const mutations = {
  JIA(state,value){
    state.sum += value
  },
  UPDATESHOW(state,value){
    state.show = value
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