class CustomStore {
  isOK: boolean = true;
  randomNumber: number = 111;
}

const state = new CustomStore();
const mutations = {
  changeStatusMutations(state: CustomStore, payload: boolean) {
    state.isOK = payload;
    state.randomNumber = 333;
  }
};
const actions = {
  async changeStatusAction({ commit }: any, payload: boolean) {
    commit("changeStatusMutations", payload);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
