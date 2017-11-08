/**
 * Todo
 * 1. merge edit
 *
 */

const state = {
  searchNumber: '',
  searchTitle: '',
  searchStatus: undefined,
  searchChannel: undefined,
  searchColumn: undefined,
  navTypes: [],
  tableData: [],
  tableTotals: 0,
  tableCurrent: 1,
  tablePageSize: 10,
  tableLoading: false,
  modalLoading: false,
  modalAddVisible: false,
  modalAddConfirmLoading: false,
  modalEditVisible: false,
  modalEditConfirmLoading: false,
  modalId: '',
  modalChannelId: '',
  modalLinkUrl: '',
  modalName: '',
  modalSort: '',
  modalType: [],
  buttonAddLoading: false,
  buttonSearchLoading: false,
  buttonResetLoading: false,
  formAreas: [],
  formHomes: [],
  formTypes: [],
  formSteps: [],
  formImages: [],
  formId: '',
  formChannel: undefined,
  formColumn: undefined,
  formLabel: undefined,
  formStep: 0,
  formTitle: '',
  formMainImage: [],
  formCommunityName: '',
  formAnnouncer: '',
  formDesignImage: [],
  formSort: '',
  formArea: undefined,
  formHome: undefined,
  formIsHomepage: undefined,
  formIsDone: undefined,
  formType: undefined,
  formVideoIntroduction: '',
  formVideoUrl: '',
  formVideoView: '',
  formAddButtonSubmitLoading: false,
  formEditButtonSubmitLoading: false,
  formEditStep: 0,
  formEditImages: [],
  formEditTitle: '',
  formEditMainImage: [],
  formEditCommunityName: '',
  formEditAnnouncer: '',
  formEditDesignImage: [],
  formEditSort: '',
  formEditArea: undefined,
  formEditHome: undefined,
  formEditIsHomepage: undefined,
  formEditIsDone: undefined,
  formEditType: '',
  formEditVideoIntroduction: '',
  formEditVideoUrl: '',
  formEditVideoView: '',
}

export default state
